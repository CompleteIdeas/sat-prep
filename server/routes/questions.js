import { Router } from 'express';

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

// POST /api/questions/generate
router.post('/generate', async (req, res) => {
  // Validate inputs
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
