import { useEffect, useRef } from 'react';

export default function PointsPopup({ config, onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!config) return;
    const el = ref.current;
    const label = config.mult > 1 ? `+${config.pts} ×${config.mult}!` : `+${config.pts}`;
    el.textContent = label;
    el.style.color = config.color;
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
    const timer = setTimeout(onDone, 1000);
    return () => clearTimeout(timer);
  }, [config, onDone]);

  return <div className="points-popup" ref={ref} />;
}
