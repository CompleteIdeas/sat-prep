import { getMultiplier, multClass } from '../lib/constants.js';

export default function StreakBar({ state }) {
  const mult = getMultiplier(state.difficulty);
  const mCls = multClass(mult);
  const onFire = state.streak >= 3;

  const msgs = [
    'Answer correctly to build your streak!',
    'Keep it up!',
    "You're on a roll!",
    '🔥 On fire!',
    '🔥🔥 Unstoppable!',
    '🔥🔥🔥 LEGENDARY!',
  ];

  return (
    <div className={`streak-bar ${onFire ? 'on-fire' : ''}`}>
      <div className="streak-info">
        <div>
          <div className="streak-num">{state.streak}</div>
          <div className="streak-label">🔥 Current Streak</div>
        </div>
        <div>
          <div className="streak-desc">{msgs[Math.min(state.streak, msgs.length - 1)]}</div>
          <div style={{ marginTop: 8 }}>
            <span className={`multiplier-badge ${mCls}`}>×{mult} multiplier</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <div className="best-streak">
          <span className="best-val">{state.bestStreak}</span>
          Best Streak
        </div>
      </div>
    </div>
  );
}
