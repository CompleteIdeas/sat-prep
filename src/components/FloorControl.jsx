import { getDiffTier } from '../lib/constants.js';

export default function FloorControl({ state, onAdjust }) {
  const f = state.diffFloor;
  const tier = getDiffTier(f);

  let hint = "Won't drop below this level";
  if (f > 1) {
    hint = f === state.difficulty ? 'At floor — difficulty locked here' : `Won't drop below Lv.${f}`;
  }

  return (
    <div className="floor-row">
      <span className="floor-label">🔒 Floor</span>
      <div className="floor-controls">
        <button className="floor-btn" disabled={f <= 1} onClick={() => onAdjust(-1)} title="Lower floor">−</button>
        <span className="floor-val">Lv.{f}</span>
        <button className="floor-btn" disabled={f >= 10} onClick={() => onAdjust(1)} title="Raise floor">+</button>
      </div>
      <span
        className="floor-badge"
        style={{
          color: tier.color,
          borderColor: tier.color + '60',
          background: tier.color + '14',
        }}
      >
        {tier.label}
      </span>
      <span className="floor-hint" style={{ color: f > 1 ? tier.color + 'cc' : undefined }}>
        {hint}
      </span>
    </div>
  );
}
