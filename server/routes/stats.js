import { Router } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// POST /api/stats/update — update user stats after answering
router.post('/update', authMiddleware, async (req, res) => {
  const { correct, points, best_streak } = req.body;
  const userId = req.user.id;

  await pool.query(
    `UPDATE users SET
       total_answered = total_answered + 1,
       total_correct = total_correct + CASE WHEN $1 THEN 1 ELSE 0 END,
       total_points = total_points + $2,
       best_streak = GREATEST(best_streak, $3),
       updated_at = NOW()
     WHERE id = $4`,
    [correct, points || 0, best_streak || 0, userId]
  );

  res.json({ ok: true });
});

// GET /api/stats/me — get current user stats
router.get('/me', authMiddleware, async (req, res) => {
  const result = await pool.query(
    'SELECT best_streak, total_answered, total_correct, total_points FROM users WHERE id = $1',
    [req.user.id]
  );
  res.json(result.rows[0] || {});
});

export default router;
