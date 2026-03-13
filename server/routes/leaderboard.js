import { Router } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

const VALID_MODES = ['math', 'english', 'both'];

// GET /api/leaderboard — top 10 by best streak
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.username, l.best_streak, l.mode,
              TO_CHAR(l.achieved_at, 'MM/DD/YYYY') as date
       FROM leaderboard l
       JOIN users u ON u.id = l.user_id
       WHERE u.is_admin = false
       ORDER BY l.best_streak DESC
       LIMIT 10`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[leaderboard] Get error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/leaderboard/submit — submit/update streak
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { streak, mode } = req.body;
    const safeStreak = Math.max(0, Math.min(10000, Math.round(Number(streak) || 0)));
    if (safeStreak < 2) return res.json({ ok: true });
    if (req.user.is_admin) return res.json({ ok: true });

    const userId = req.user.id;
    const username = req.user.username;
    const safeMode = VALID_MODES.includes(mode) ? mode : 'both';

    await pool.query(
      `INSERT INTO leaderboard (user_id, username, best_streak, mode, achieved_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         best_streak = GREATEST(leaderboard.best_streak, $3),
         mode = CASE WHEN $3 > leaderboard.best_streak THEN $4 ELSE leaderboard.mode END,
         achieved_at = CASE WHEN $3 > leaderboard.best_streak THEN NOW() ELSE leaderboard.achieved_at END`,
      [userId, username, safeStreak, safeMode]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error('[leaderboard] Submit error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
