import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
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

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again later' },
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please slow down' },
});

// Apply rate limiters
app.use('/api/auth', authLimiter);
app.use('/api/questions', apiLimiter);

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
  app.get('/{*path}', (_req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

// Global error handler — prevents stack traces leaking to client
app.use((err, _req, res, _next) => {
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Auto-migrate on startup
async function autoMigrate() {
  try {
    const schema = readFileSync(join(__dirname, 'db', 'schema.sql'), 'utf-8');
    await pool.query(schema);

    // Seed admin — password from env, skip if not set
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'PSATclaudeiscool12345';
    const bcrypt = await import('bcryptjs');
    const adminHash = bcrypt.default.hashSync(adminPassword, 10);
    await pool.query(
      `INSERT INTO users (username, password_hash, is_admin)
       VALUES ('SATPREPADMIN', $1, true)
       ON CONFLICT (username) DO NOTHING`,
      [adminHash]
    );
    console.log('[db] Schema applied, admin seeded');
  } catch (err) {
    console.error('[db] Migration error:', err.message);
  }
}

// Start server first (health check must pass), then migrate
app.listen(PORT, () => {
  console.log(`[sat-prep] Server running on port ${PORT}`);
  autoMigrate();
});
