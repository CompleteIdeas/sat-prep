import { Router } from 'express';
import pool from '../db/pool.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware, adminMiddleware);

// GET /api/admin/users — list all non-admin users
router.get('/users', async (_req, res) => {
  const result = await pool.query(
    `SELECT id, username, best_streak, total_answered, total_correct, total_points
     FROM users WHERE is_admin = false ORDER BY username`
  );
  res.json(result.rows);
});

// POST /api/admin/reset-user — reset a user's stats
router.post('/reset-user', async (req, res) => {
  const { userId } = req.body;
  await pool.query(
    `UPDATE users SET best_streak = 0, total_answered = 0, total_correct = 0, total_points = 0, updated_at = NOW()
     WHERE id = $1 AND is_admin = false`,
    [userId]
  );
  await pool.query('DELETE FROM leaderboard WHERE user_id = $1', [userId]);
  res.json({ ok: true });
});

// POST /api/admin/delete-user — delete a user account
router.post('/delete-user', async (req, res) => {
  const { userId } = req.body;
  await pool.query('DELETE FROM users WHERE id = $1 AND is_admin = false', [userId]);
  res.json({ ok: true });
});

// POST /api/admin/reset-all — nuclear option
router.post('/reset-all', async (_req, res) => {
  await pool.query('DELETE FROM leaderboard');
  await pool.query('DELETE FROM users WHERE is_admin = false');
  res.json({ ok: true });
});

export default router;
