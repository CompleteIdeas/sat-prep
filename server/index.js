import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './db/pool.js';
import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import statsRoutes from './routes/stats.js';
import leaderboardRoutes from './routes/leaderboard.js';
import adminRoutes from './routes/admin.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3002;

app.set('trust proxy', 1);
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.APP_URL, `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`].filter(Boolean)
    : true,
  credentials: true,
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'sat-prep' });
});

// Serve static React build in production
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

// Auto-migrate on startup
async function autoMigrate() {
  try {
    const schema = readFileSync(join(__dirname, 'db', 'schema.sql'), 'utf-8');
    await pool.query(schema);

    // Seed admin
    const bcrypt = await import('bcryptjs');
    const adminHash = await bcrypt.default.hashSync('PSATclaudeiscool12345', 10);
    await pool.query(
      `INSERT INTO users (username, password_hash, is_admin)
       VALUES ('SATPREPADMIN', $1, true)
       ON CONFLICT (username) DO UPDATE SET password_hash = $1, is_admin = true`,
      [adminHash]
    );
    console.log('[db] Schema applied, admin seeded');
  } catch (err) {
    console.error('[db] Migration error:', err.message);
  }
}

autoMigrate().then(() => {
  app.listen(PORT, () => {
    console.log(`[sat-prep] Server running on port ${PORT}`);
  });
});
