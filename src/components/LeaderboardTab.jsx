import { useState, useEffect } from 'react';
import { api } from '../lib/api.js';

export default function LeaderboardTab({ user }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard()
      .then(data => setEntries(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="lb-empty">Loading leaderboard…</div>;

  if (!entries.length) {
    return (
      <div className="leaderboard">
        <div className="lb-empty">Sign in and set a streak to appear here!</div>
      </div>
    );
  }

  const medals = ['gold', 'silver', 'bronze'];
  const medalEmoji = ['🥇', '🥈', '🥉'];

  return (
    <div className="leaderboard">
      {entries.map((e, i) => {
        const isYou = user && e.username === user.username;
        return (
          <div key={i} className={`lb-row ${isYou ? 'you' : ''}`}>
            <div className={`lb-rank ${medals[i] || ''}`}>
              {i < 3 ? medalEmoji[i] : `#${i + 1}`}
            </div>
            <div className="lb-score">{e.best_streak}</div>
            <div className="lb-meta">
              <div className="lb-tag">
                <span style={{ fontWeight: 600 }}>
                  {e.username}
                  {isYou && <span className="lb-you-tag">YOU</span>}
                </span>
                {' · '}{e.best_streak} streak · {e.mode || 'both'}
              </div>
              <div className="lb-date">{e.date}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
