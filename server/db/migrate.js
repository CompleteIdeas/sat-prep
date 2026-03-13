import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('.railway.internal')
      ? false
      : process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  });

  try {
    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    await pool.query(schema);
    console.log('[migrate] Schema applied successfully');

    // Seed admin account
    const bcrypt = await import('bcrypt');
    const adminHash = await bcrypt.default.hash('PSATclaudeiscool12345', 10);
    await pool.query(
      `INSERT INTO users (username, password_hash, is_admin)
       VALUES ('SATPREPADMIN', $1, true)
       ON CONFLICT (username) DO UPDATE SET password_hash = $1, is_admin = true`,
      [adminHash]
    );
    console.log('[migrate] Admin account seeded');
  } catch (err) {
    console.error('[migrate] Error:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
