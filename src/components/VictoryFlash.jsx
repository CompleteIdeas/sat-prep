import { useEffect, useRef } from 'react';

export default function VictoryFlash({ config, onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!config) return;
    const el = ref.current;
    const alpha = Math.min(0.12 + (config.mult - 1) * 0.06, 0.40);
    const hex = config.color;
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    el.style.background = `radial-gradient(ellipse at center, ${hex}${alphaHex} 0%, transparent 70%)`;
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
    const timer = setTimeout(onDone, 550);
    return () => clearTimeout(timer);
  }, [config, onDone]);

  return <div className="victory-flash" ref={ref} />;
}
