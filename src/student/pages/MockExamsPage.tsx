import { useState } from 'react';
import { Badge, Button, Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { QuizEngine } from '../components/QuizEngine';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import type { MockExam } from '../types';

export function MockExamsPage() {
  const { data: exams, loading: loadingExams } = useAsyncData(() => studentService.getMockExams(), []);
  const { data: questions, loading: loadingQ } = useAsyncData(() => studentService.getQuizQuestions(), []);
  const [activeExam, setActiveExam] = useState<MockExam | null>(null);

  if (activeExam && questions) {
    const expanded = Array.from({ length: Math.min(activeExam.questionsCount, 40) }, (_, i) =>
      questions[i % questions.length],
    );

    return (
      <>
        <StudentPageHeader title={activeExam.title} subtitle={`${activeExam.durationMinutes} min · Seuil ${activeExam.passingScore}/40`} />
        <QuizEngine
          questions={expanded}
          title={activeExam.title}
          timed
          durationMinutes={activeExam.durationMinutes}
          onComplete={() => {}}
        />
        <Button variant="ghost" size="sm" onClick={() => setActiveExam(null)} style={{ marginTop: '1rem' }}>
          ← Retour aux examens blancs
        </Button>
      </>
    );
  }

  return (
    <>
      <StudentPageHeader
        title="Examens blancs"
        subtitle="Simulez les conditions réelles de l'examen du code"
      />

      {loadingExams || loadingQ ? (
        <div className="student-skeleton" />
      ) : (
        <div className="student-grid student-grid--2">
          {exams?.map((exam) => (
            <Card
              key={exam.id}
              title={exam.title}
              meta={[
                { label: 'Questions', value: String(exam.questionsCount) },
                { label: 'Durée', value: `${exam.durationMinutes} min` },
                { label: 'Seuil', value: `${exam.passingScore}/40` },
                { label: 'Tentatives', value: String(exam.attempts) },
                ...(exam.bestScore !== undefined
                  ? [{ label: 'Meilleur score', value: `${exam.bestScore}/40` }]
                  : []),
              ]}
              footer={
                <Button size="sm" onClick={() => setActiveExam(exam)}>
                  {exam.attempts > 0 ? 'Retenter' : 'Commencer'}
                </Button>
              }
            >
              {exam.bestScore !== undefined && exam.bestScore >= exam.passingScore && (
                <Badge variant="success" size="sm">Réussi</Badge>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
