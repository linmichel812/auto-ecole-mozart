import { useState } from 'react';
import { Badge, Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { QuizEngine } from '../components/QuizEngine';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';

export function QuizPage() {
  const { data, loading } = useAsyncData(() => studentService.getQuizQuestions(), []);
  const [started, setStarted] = useState(false);
  const [lastScore, setLastScore] = useState<{ score: number; total: number } | null>(null);

  const categories = [...new Set(data?.map((q) => q.category) ?? [])];

  return (
    <>
      <StudentPageHeader
        title="Quiz Code de la Route"
        subtitle="Entraînement adapté à la réglementation camerounaise"
      />

      {!started ? (
        <>
          <Card title="À propos du quiz" style={{ marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 1rem', color: 'var(--moz-neutral-600)', fontSize: '0.9rem' }}>
              {data?.length ?? 0} questions couvrant la signalisation, les vitesses, les priorités et la sécurité routière au Cameroun.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
              {categories.map((c) => (
                <Badge key={c} variant="neutral" size="sm">{c}</Badge>
              ))}
            </div>
            {lastScore && (
              <p style={{ margin: '0 0 1rem', fontSize: '0.875rem' }}>
                Dernier score : <strong>{lastScore.score}/{lastScore.total}</strong>
              </p>
            )}
            <button
              type="button"
              className="moz-btn moz-btn--primary moz-btn--md"
              disabled={loading || !data?.length}
              onClick={() => setStarted(true)}
            >
              {loading ? 'Chargement…' : 'Commencer le quiz'}
            </button>
          </Card>
        </>
      ) : (
        data && (
          <QuizEngine
            questions={data}
            title="Quiz Code Cameroun"
            onComplete={(score, total) => {
              setLastScore({ score, total });
            }}
          />
        )
      )}

      {started && (
        <button
          type="button"
          className="moz-btn moz-btn--ghost moz-btn--sm"
          style={{ marginTop: '1rem' }}
          onClick={() => setStarted(false)}
        >
          ← Retour au menu quiz
        </button>
      )}
    </>
  );
}
