import { useEffect, useRef } from 'react';

export default function ComboFlash({ text, onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!text) return;
    const el = ref.current;
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
    const timer = setTimeout(onDone, 800);
    return () => clearTimeout(timer);
  }, [text, onDone]);

  return (
    <div className="combo-flash" ref={ref}>
      {text || '🔥'}
    </div>
  );
}
