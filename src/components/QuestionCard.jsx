import { useState, useEffect } from 'react';

export default function QuestionCard({ state, onAnswer }) {
  const { currentQ: q, loading, answered, questionNum } = state;
  const [selected, setSelected] = useState(null);

  // Reset selected when question changes
  useEffect(() => {
    setSelected(null);
  }, [questionNum]);

  if (loading || !q) {
    return (
      <div className="question-card">
        <div className="loading-state">
          <div className="spinner" aria-hidden="true" />
          <div>Generating your question…</div>
        </div>
      </div>
    );
  }

  const letters = ['A', 'B', 'C', 'D'];
  const isRight = answered ? selected === q.correct : null;

  function handleChoice(letter) {
    if (answered) return;
    setSelected(letter);
    onAnswer(letter);
  }

  function choiceClass(letter) {
    if (!answered) return 'choice-btn';
    if (letter === selected && isRight) return 'choice-btn selected-correct';
    if (letter === selected && !isRight) return 'choice-btn selected-wrong';
    if (letter === q.correct && !isRight) return 'choice-btn reveal-correct';
    return 'choice-btn';
  }

  return (
    <div className={`question-card ${answered ? (isRight ? 'correct' : 'wrong') : ''}`}>
      <div className="q-meta">
        <span className={`q-type ${q.type}`}>
          <span aria-hidden="true">{q.type === 'math' ? '🔢' : '📖'}</span>
          {q.type === 'math' ? ' Math' : ' English'}
        </span>
        <span className="q-num">#{questionNum}</span>
      </div>

      {q.passage && q.passage.trim() && (
        <div className="question-passage">{q.passage}</div>
      )}

      <div className="question-text">{q.question}</div>

      <div className="choices">
        {q.choices.map((c, i) => (
          <button
            key={i}
            className={choiceClass(letters[i])}
            onClick={() => handleChoice(letters[i])}
            disabled={answered}
          >
            <span className="choice-letter">{letters[i]}</span>
            <span>{c.replace(/^[A-D]\)\s*/, '')}</span>
          </button>
        ))}
      </div>

      {answered && (
        <div className={`feedback-box show ${isRight ? 'correct-fb' : 'wrong-fb'}`} role="alert">
          {isRight
            ? `Correct! ${q.explanation}`
            : `The answer is ${q.correct}. ${q.explanation}`}
        </div>
      )}
    </div>
  );
}
