export default function SessionBar({ state }) {
  const accuracy = state.totalAnswered
    ? Math.round(state.totalCorrect / state.totalAnswered * 100) + '%'
    : '—';

  return (
    <div className="session-bar">
      <div className="sbar-item">
        <div className="sbar-val" style={{ color: 'var(--accent2)' }}>{state.totalAnswered}</div>
        <div className="sbar-label">Questions</div>
      </div>
      <div className="sbar-item">
        <div className="sbar-val" style={{ color: 'var(--green)' }}>{accuracy}</div>
        <div className="sbar-label">Accuracy</div>
      </div>
      <div className="sbar-item">
        <div className="sbar-val" style={{ color: 'var(--accent)' }}>{state.points.toLocaleString()}</div>
        <div className="sbar-label">Points</div>
      </div>
      <div className="sbar-item">
        <div className="sbar-val" style={{ color: 'var(--orange)' }}>{state.streak}</div>
        <div className="sbar-label">Streak</div>
      </div>
    </div>
  );
}
