import { getDiffTier } from '../lib/constants.js';

export default function StatsTab({ state }) {
  const at = state.allTime;
  const accuracy = at.answered ? Math.round(at.correct / at.answered * 100) + '%' : '—';

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-val" style={{ color: 'var(--accent2)' }}>{at.answered.toLocaleString()}</div>
          <div className="stat-card-label">Total Answered (All Time)</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-val" style={{ color: 'var(--green)' }}>{at.correct.toLocaleString()}</div>
          <div className="stat-card-label">Total Correct (All Time)</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-val" style={{ color: 'var(--accent)' }}>{accuracy}</div>
          <div className="stat-card-label">All-Time Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-val" style={{ color: 'var(--orange)' }}>{at.points.toLocaleString()}</div>
          <div className="stat-card-label">All-Time Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-val" style={{ color: 'var(--accent2)' }}>{at.bestStreak}</div>
          <div className="stat-card-label">Best Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-val" style={{ color: 'var(--green)' }}>{state.totalAnswered}</div>
          <div className="stat-card-label">Session Questions</div>
        </div>
      </div>

      <div className="section-title">Question History</div>
      <div className="history-list">
        {state.sessionHistory.length === 0 ? (
          <div className="lb-empty">No questions answered yet this session.</div>
        ) : (
          [...state.sessionHistory].reverse().map((h, i) => {
            const tier = getDiffTier(h.diff);
            return (
              <div key={i} className={`history-item ${h.correct ? 'correct' : 'wrong'}`}>
                <div className="hi-icon">{h.correct ? '✅' : '❌'}</div>
                <div className="hi-body">
                  <div className="hi-question">{h.question}</div>
                  <div className="hi-meta">
                    <span style={{ color: tier.color }}>Lv.{h.diff} {tier.label}</span>
                    <span>{h.type}</span>
                    {h.correct && <span className="hi-pts">+{h.pts}pts</span>}
                    {!h.correct && <span style={{ color: 'var(--muted)' }}>Correct: {h.correctAnswer}</span>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
