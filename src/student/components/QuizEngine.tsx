import { useCallback, useEffect, useState } from 'react';
import { Button } from '../../design-system';
import type { QuizQuestion } from '../types';

interface QuizEngineProps {
  questions: QuizQuestion[];
  title?: string;
  timed?: boolean;
  durationMinutes?: number;
  onComplete?: (score: number, total: number) => void;
}

export function QuizEngine({
  questions,
  title = 'Quiz',
  timed = false,
  durationMinutes = 30,
  onComplete,
}: QuizEngineProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);

  const q = questions[index];
  const total = questions.length;

  const finish = useCallback(() => {
    setFinished(true);
    onComplete?.(score, total);
  }, [score, total, onComplete]);

  useEffect(() => {
    if (!timed || finished) return;
    if (secondsLeft <= 0) {
      finish();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timed, finished, secondsLeft, finish]);

  const handleValidate = () => {
    if (selected === null || revealed) return;
    const correct = selected === q.correctIndex;
    if (correct) setScore((s) => s + 1);
    setRevealed(true);
  };

  const handleNext = () => {
    if (index + 1 >= total) {
      finish();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
    setSecondsLeft(durationMinutes * 60);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 75;
    return (
      <div className="student-quiz">
        <h2 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--moz-font-heading)' }}>{title} : Résultat</h2>
        <p style={{ fontSize: '2rem', fontWeight: 700, color: passed ? '#16a34a' : 'var(--moz-primary)', margin: '1rem 0' }}>
          {score}/{total} ({pct}%)
        </p>
        <p style={{ color: 'var(--moz-neutral-600)', marginBottom: '1.5rem' }}>
          {passed ? 'Bravo ! Vous maîtrisez bien cette série.' : 'Continuez à vous entraîner pour progresser.'}
        </p>
        <Button onClick={handleRestart}>Recommencer</Button>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="student-quiz">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span className="student-quiz__progress">Question {index + 1}/{total}</span>
        {timed && (
          <span className={`student-timer${secondsLeft < 60 ? ' student-timer--warning' : ''}`}>
            {formatTime(secondsLeft)}
          </span>
        )}
      </div>
      <p className="student-quiz__question">{q.question}</p>
      <div className="student-quiz__options" role="radiogroup" aria-label={`Question ${index + 1}`}>
        {q.options.map((opt, i) => {
          let cls = 'student-quiz__option';
          if (selected === i) cls += ' student-quiz__option--selected';
          if (revealed && i === q.correctIndex) cls += ' student-quiz__option--correct';
          if (revealed && selected === i && i !== q.correctIndex) cls += ' student-quiz__option--wrong';
          return (
            <button
              key={i}
              type="button"
              className={cls}
              disabled={revealed}
              onClick={() => setSelected(i)}
              role="radio"
              aria-checked={selected === i}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="student-quiz__explanation">
          <strong>Explication :</strong> {q.explanation}
        </div>
      )}
      <div className="student-quiz__actions">
        {!revealed ? (
          <Button onClick={handleValidate} disabled={selected === null}>Valider</Button>
        ) : (
          <Button onClick={handleNext}>{index + 1 >= total ? 'Voir le résultat' : 'Question suivante'}</Button>
        )}
      </div>
    </div>
  );
}
