import { studentService } from '../api/studentService';
import { LessonItem } from '../components/LessonItem';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';

export function PlanningPage() {
  const { data, loading } = useAsyncData(() => studentService.getPlanning(), []);

  const upcoming = data?.filter((l) => l.status === 'scheduled') ?? [];
  const past = data?.filter((l) => l.status !== 'scheduled') ?? [];

  return (
    <>
      <StudentPageHeader title="Planning des cours" subtitle="Vos séances théoriques et pratiques" />

      {loading ? (
        <div className="student-skeleton" style={{ height: 120 }} />
      ) : (
        <>
          <section className="student-section">
            <div className="student-section__title">À venir ({upcoming.length})</div>
            <div className="student-grid">
              {upcoming.length === 0 ? (
                <p className="student-empty">Aucun cours planifié. Réservez une séance.</p>
              ) : (
                upcoming.map((l) => <LessonItem key={l.id} lesson={l} />)
              )}
            </div>
          </section>

          <section className="student-section">
            <div className="student-section__title">Historique</div>
            <div className="student-grid">
              {past.map((l) => <LessonItem key={l.id} lesson={l} />)}
            </div>
          </section>
        </>
      )}
    </>
  );
}
