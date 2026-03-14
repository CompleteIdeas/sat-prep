import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = join(__dirname, '..', '..', 'docs');

// --- Simple CSV parser that handles quoted fields with commas/newlines ---
function parseCSV(text) {
  const rows = [];
  let i = 0;
  const len = text.length;

  function parseField() {
    if (i >= len) return '';
    if (text[i] === '"') {
      i++; // skip opening quote
      let field = '';
      while (i < len) {
        if (text[i] === '"') {
          if (i + 1 < len && text[i + 1] === '"') {
            field += '"';
            i += 2;
          } else {
            i++; // skip closing quote
            break;
          }
        } else {
          field += text[i];
          i++;
        }
      }
      return field;
    } else {
      let field = '';
      while (i < len && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') {
        field += text[i];
        i++;
      }
      return field;
    }
  }

  function parseRow() {
    const fields = [];
    while (i < len) {
      fields.push(parseField());
      if (i >= len || text[i] === '\n' || text[i] === '\r') {
        // consume newline
        if (i < len && text[i] === '\r') i++;
        if (i < len && text[i] === '\n') i++;
        return fields;
      }
      if (text[i] === ',') i++; // skip comma
    }
    return fields;
  }

  const headers = parseRow();
  while (i < len) {
    // skip blank lines
    if (text[i] === '\n' || text[i] === '\r') {
      if (text[i] === '\r') i++;
      if (i < len && text[i] === '\n') i++;
      continue;
    }
    const fields = parseRow();
    if (fields.length >= headers.length) {
      const row = {};
      headers.forEach((h, idx) => { row[h.trim()] = (fields[idx] || '').trim(); });
      rows.push(row);
    }
  }
  return rows;
}

// --- Normalize rows from different CSV formats ---

function normalize1450plus(row) {
  const section = row.section || '';
  return {
    question_id: row.question_id,
    type: section.toLowerCase().includes('math') ? 'math' : 'english',
    section,
    domain: row.domain || null,
    skill: row.skill || null,
    difficulty: parseInt(row.difficulty_1_10) || 5,
    passage: row.passage_or_prompt || '',
    question: row.question || '',
    choice_a: row.choice_a || '',
    choice_b: row.choice_b || '',
    choice_c: row.choice_c || '',
    choice_d: row.choice_d || '',
    correct_answer: (row.correct_answer || 'A').toUpperCase(),
    explanation: row.explanation || '',
    source: 'sat_1450plus_targeted',
  };
}

function normalizeVolume2(row) {
  const section = row.section || '';
  return {
    question_id: row.question_id,
    type: section.toLowerCase().includes('math') ? 'math' : 'english',
    section,
    domain: row.domain || null,
    skill: null,
    difficulty: parseInt(row.difficulty_1_10) || 5,
    passage: '',
    question: row.question_text || '',
    choice_a: row.choice_A || '',
    choice_b: row.choice_B || '',
    choice_c: row.choice_C || '',
    choice_d: row.choice_D || '',
    correct_answer: (row.correct_answer || 'A').toUpperCase(),
    explanation: row.explanation || '',
    source: 'sat_harder_volume2',
  };
}

function normalizeQuestionBank(row) {
  const section = row.section || '';
  return {
    question_id: row.question_id,
    type: section.toLowerCase().includes('math') ? 'math' : 'english',
    section,
    domain: row.domain || null,
    skill: row.skill || null,
    difficulty: parseInt(row.difficulty_1_to_10) || 5,
    passage: row.passage_or_stimulus || '',
    question: row.question_text || '',
    choice_a: row.choice_a || '',
    choice_b: row.choice_b || '',
    choice_c: row.choice_c || '',
    choice_d: row.choice_d || '',
    correct_answer: (row.correct_answer || 'A').toUpperCase(),
    explanation: row.explanation || '',
    source: 'sat_question_bank',
  };
}

async function importQuestions() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('.railway.internal')
      ? false
      : process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  });

  try {
    // Ensure questions table exists
    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    await pool.query(schema);
    console.log('[import] Schema applied');

    // Load and normalize all CSVs
    const allQuestions = [];

    const files = [
      { file: 'sat_1450plus_targeted_master.csv', normalize: normalize1450plus },
      { file: 'sat_harder_volume2_master.csv', normalize: normalizeVolume2 },
      { file: 'sat_question_bank_master.csv', normalize: normalizeQuestionBank },
    ];

    for (const { file, normalize } of files) {
      const path = join(docsDir, file);
      console.log(`[import] Reading ${file}...`);
      const text = readFileSync(path, 'utf-8');
      const rows = parseCSV(text);
      console.log(`[import]   Parsed ${rows.length} rows`);

      for (const row of rows) {
        const q = normalize(row);
        // Skip rows with missing essential data
        if (!q.question_id || !q.question || !q.choice_a) continue;
        // Validate correct_answer
        if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) continue;
        // Clamp difficulty
        q.difficulty = Math.max(1, Math.min(10, q.difficulty));
        allQuestions.push(q);
      }
    }

    console.log(`[import] Total valid questions: ${allQuestions.length}`);

    // Insert with upsert (skip duplicates by question_id)
    let inserted = 0;
    let skipped = 0;

    for (const q of allQuestions) {
      try {
        const result = await pool.query(
          `INSERT INTO questions (question_id, type, section, domain, skill, difficulty, passage, question, choice_a, choice_b, choice_c, choice_d, correct_answer, explanation, source)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
           ON CONFLICT (question_id) DO NOTHING`,
          [q.question_id, q.type, q.section, q.domain, q.skill, q.difficulty, q.passage, q.question, q.choice_a, q.choice_b, q.choice_c, q.choice_d, q.correct_answer, q.explanation, q.source]
        );
        if (result.rowCount > 0) inserted++;
        else skipped++;
      } catch (err) {
        console.error(`[import] Error inserting ${q.question_id}: ${err.message}`);
      }
    }

    console.log(`[import] Done: ${inserted} inserted, ${skipped} already existed`);

    // Summary by source
    const summary = await pool.query('SELECT source, type, COUNT(*) as count FROM questions GROUP BY source, type ORDER BY source, type');
    console.log('[import] Summary:');
    for (const row of summary.rows) {
      console.log(`  ${row.source} | ${row.type} | ${row.count} questions`);
    }

  } catch (err) {
    console.error('[import] Error:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

importQuestions();
