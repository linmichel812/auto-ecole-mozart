import { Badge, Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatDate } from '../../shared';
import type { ExamResult } from '../types';

export function ExamResultsPage() {
  const { data, loading } = useAsyncData(() => studentService.getExamResults(), []);

  const passed = data?.filter((e) => e.passed).length ?? 0;

  return (
    <>
      <StudentPageHeader
        title="Résultats d'examens"
        subtitle={`${passed} examen${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}`}
      />

      {loading ? (
        <div className="student-skeleton" />
      ) : (
        <div className="student-grid student-grid--2">
          {data?.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}
    </>
  );
}

function ExamCard({ exam }: { exam: ExamResult }) {
  const typeLabel = exam.type === 'code' ? 'Examen code' : 'Examen conduite';

  return (
    <Card
      title={typeLabel}
      badge={
        <Badge variant={exam.passed ? 'success' : 'error'} size="sm">
          {exam.passed ? 'Réussi' : 'Non obtenu'}
        </Badge>
      }
      meta={[
        { label: 'Date', value: formatDate(exam.date) },
        ...(exam.score !== undefined && exam.maxScore
          ? [{ label: 'Score', value: `${exam.score}/${exam.maxScore}` }]
          : []),
        ...(exam.examiner ? [{ label: 'Examinateur', value: exam.examiner }] : []),
      ]}
    >
      {exam.notes && (
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--moz-neutral-600)' }}>{exam.notes}</p>
      )}
    </Card>
  );
}
