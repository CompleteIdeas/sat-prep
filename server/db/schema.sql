-- SAT Prep Database Schema

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  best_streak INT DEFAULT 0,
  total_answered INT DEFAULT 0,
  total_correct INT DEFAULT 0,
  total_points INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(20) NOT NULL,
  best_streak INT NOT NULL DEFAULT 0,
  mode VARCHAR(10) DEFAULT 'both',
  achieved_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_streak ON leaderboard(best_streak DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_leaderboard_user ON leaderboard(user_id);
