export default function ModeSelector({ mode, onSetMode }) {
  const modes = [
    { key: 'both', label: '📚 Both' },
    { key: 'math', label: '🔢 Math' },
    { key: 'english', label: '📖 English' },
  ];

  return (
    <div className="mode-row">
      {modes.map(m => (
        <button
          key={m.key}
          className={`mode-btn ${mode === m.key ? 'active' : ''}`}
          onClick={() => onSetMode(m.key)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
