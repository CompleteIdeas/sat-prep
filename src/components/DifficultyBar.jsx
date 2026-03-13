import { getDiffTier, CORRECT_PER_LEVEL } from '../lib/constants.js';

export default function DifficultyBar({ state }) {
  const tier = getDiffTier(state.difficulty);
  const pct = (state.diffProgress / CORRECT_PER_LEVEL) * 100;

  return (
    <div className="difficulty-row">
      <span className="diff-label">Difficulty</span>
      <div className="diff-track">
        <div
          className="diff-fill"
          style={{
            width: `${pct}%`,
            background: tier.color,
            boxShadow: `0 0 10px ${tier.color}99`,
          }}
        />
      </div>
      <span className={`diff-badge ${tier.cls}`}>
        Lv.{state.difficulty} · {tier.label}
      </span>
    </div>
  );
}
