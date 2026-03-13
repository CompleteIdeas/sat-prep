import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db/pool.js';
import { signToken } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: 'Username not found' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Incorrect password' });

  const token = signToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
      best_streak: user.best_streak,
      total_answered: user.total_answered,
      total_correct: user.total_correct,
      total_points: user.total_points,
    },
  });
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || username.length < 2 || username.length > 20) {
    return res.status(400).json({ error: 'Username must be 2-20 characters' });
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({ error: 'Only letters, numbers, and underscores' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  if (username.toUpperCase() === 'SATPREPADMIN') {
    return res.status(400).json({ error: 'That username is reserved' });
  }

  const existing = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
  if (existing.rows.length > 0) {
    return res.status(409).json({ error: 'Username already taken' });
  }

  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *`,
    [username, hash]
  );
  const user = result.rows[0];
  const token = signToken(user);

  res.status(201).json({
    token,
    user: {
      id: user.id,
      username: user.username,
      is_admin: false,
      best_streak: 0,
      total_answered: 0,
      total_correct: 0,
      total_points: 0,
    },
  });
});

// GET /api/auth/me — validate token and return current user
router.get('/me', async (req, res) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Not authenticated' });

  let decoded;
  try {
    const jwt = await import('jsonwebtoken');
    decoded = jwt.default.verify(header.slice(7), process.env.JWT_SECRET || 'dev-secret-change-me');
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const result = await pool.query(
    'SELECT id, username, is_admin, best_streak, total_answered, total_correct, total_points FROM users WHERE id = $1',
    [decoded.id]
  );
  if (!result.rows[0]) return res.status(401).json({ error: 'User not found' });
  res.json({ user: result.rows[0] });
});

export default router;
