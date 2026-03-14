import { Router } from 'express';
import pool from '../db/pool.js';

const router = Router();

const VALID_MODES = ['math', 'english', 'both'];

async function claudeCall(prompt, maxTokens = 1000) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) {
    throw new Error(`Anthropic API returned ${res.status}`);
  }
  const data = await res.json();
  if (data.error) throw new Error('API error: ' + (data.error.message || JSON.stringify(data.error)));
  if (!data.content?.length) throw new Error('Empty response from API');
  return data.content.map(c => c.text || '').join('');
}

function extractJSON(str) {
  const start = str.indexOf('{');
  const end = str.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object found in response');
  return JSON.parse(str.slice(start, end + 1));
}

// Format a DB row into the shape the frontend expects
function formatDbQuestion(row) {
  return {
    type: row.type,
    passage: row.passage || '',
    question: row.question,
    choices: [
      `A) ${row.choice_a}`,
      `B) ${row.choice_b}`,
      `C) ${row.choice_c}`,
      `D) ${row.choice_d}`,
    ],
    correct: row.correct_answer,
    explanation: row.explanation,
  };
}

// GET /api/questions/random — serve a random question from the DB
router.get('/random', async (req, res) => {
  const mode = VALID_MODES.includes(req.query.mode) ? req.query.mode : 'both';
  const difficulty = Math.min(10, Math.max(1, Math.round(Number(req.query.difficulty) || 5)));
  const excludeIds = req.query.exclude ? req.query.exclude.split(',') : [];

  try {
    // Match difficulty within +/- 1 range for more results
    let query, params;
    if (mode === 'both') {
      query = `SELECT * FROM questions WHERE difficulty BETWEEN $1 AND $2`;
      params = [Math.max(1, difficulty - 1), Math.min(10, difficulty + 1)];
    } else {
      query = `SELECT * FROM questions WHERE type = $1 AND difficulty BETWEEN $2 AND $3`;
      params = [mode, Math.max(1, difficulty - 1), Math.min(10, difficulty + 1)];
    }

    if (excludeIds.length > 0) {
      const placeholders = excludeIds.map((_, i) => `$${params.length + i + 1}`).join(',');
      query += ` AND question_id NOT IN (${placeholders})`;
      params.push(...excludeIds);
    }

    query += ' ORDER BY RANDOM() LIMIT 1';
    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No questions found for that criteria' });
    }

    res.json(formatDbQuestion(result.rows[0]));
  } catch (err) {
    console.error('[questions] DB error:', err.message);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// GET /api/questions/stats — question bank stats
router.get('/stats', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT type, difficulty, COUNT(*) as count FROM questions GROUP BY type, difficulty ORDER BY type, difficulty`
    );
    const total = await pool.query('SELECT COUNT(*) as count FROM questions');
    res.json({ total: parseInt(total.rows[0].count), breakdown: result.rows });
  } catch (err) {
    console.error('[questions] Stats error:', err.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// POST /api/questions/generate — AI-generated question (existing behavior)
router.post('/generate', async (req, res) => {
  const mode = VALID_MODES.includes(req.body.mode) ? req.body.mode : 'both';
  const difficulty = Math.min(10, Math.max(1, Math.round(Number(req.body.difficulty) || 1)));

  const modeInstruction = mode === 'math'
    ? 'Generate a SAT Math question.'
    : mode === 'english'
      ? 'Generate a SAT Reading/Writing/English question. It may include a short passage (2–4 sentences max).'
      : (Math.random() < 0.5
        ? 'Generate a SAT Math question.'
        : 'Generate a SAT Reading/Writing/English question. It may include a short passage (2–4 sentences max).');

  const diffGuide = `
DIFFICULTY GUIDE — match level ${difficulty} exactly:
1-2 Beginner: Simple arithmetic (add/subtract/multiply single digits), basic vocab definitions, 1-sentence reading questions. A 6th grader can solve it.
3-4 Easy: Pre-algebra (solve for x), common grammar rules (subject-verb), direct reading inference.
5-6 Medium: Algebra I/II (quadratics, systems), evidence-based reading, moderate grammar. Typical SAT question.
7-8 Hard: Advanced algebra (functions, exponentials), complex passage analysis, multi-step reasoning, tricky answer traps.
9-10 Expert: Hardest possible — trig, non-linear systems, dense philosophical passages, abstract logical reasoning.`;

  const genPrompt = `You are an expert SAT tutor. ${modeInstruction}

Difficulty: ${difficulty}/10. ${diffGuide}

IMPORTANT: Every number, calculation, and fact MUST be 100% correct. Double-check all arithmetic before writing the question.

Return ONLY valid JSON with this exact structure:
{
  "type": "math" or "english",
  "passage": "short context passage if english (or empty string if not needed)",
  "question": "the question text",
  "choices": ["A) text", "B) text", "C) text", "D) text"],
  "correct": "A" or "B" or "C" or "D",
  "explanation": "step-by-step explanation showing the correct calculation or reasoning"
}

Make it a fresh, original question. No markdown, no extra text — only the JSON object.`;

  try {
    const raw = await claudeCall(genPrompt);
    let q = extractJSON(raw);

    // Verify pass
    const verifyPrompt = `You are a strict SAT answer checker. Silently work through this question step by step to verify correctness, then output ONLY a valid JSON object as your final response — no prose before or after the JSON.

QUESTION TO CHECK:
${JSON.stringify(q, null, 2)}

VERIFICATION STEPS (do these mentally, do NOT write them out):
- Solve the problem from scratch independently
- Check the marked correct answer (${q.correct}) is actually right
- Confirm all other choices are wrong
- Verify all arithmetic and facts

OUTPUT: Return only the JSON object (corrected if needed, or unchanged if correct).
The JSON must have exactly these keys: type, passage, question, choices, correct, explanation.
Start your response with { and end with }`;

    const verifyRaw = await claudeCall(verifyPrompt, 1200);
    const verified = extractJSON(verifyRaw);

    res.json(verified);
  } catch (err) {
    console.error('[questions] Generation error:', err.message);
    res.status(500).json({ error: 'Failed to generate question. Please try again.' });
  }
});

export default router;
