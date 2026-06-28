import { Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { StatCard } from '../components/StatCard';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function StatisticsPage() {
  const { data, loading } = useAsyncData(() => studentService.getStatistics(), []);

  if (loading || !data) {
    return (
      <>
        <StudentPageHeader title="Statistiques de progression" />
        <div className="student-skeleton" />
      </>
    );
  }

  const maxHours = Math.max(...data.weeklyHours, 1);

  return (
    <>
      <StudentPageHeader
        title="Statistiques de progression"
        subtitle="Vue d'ensemble de vos performances"
      />

      <div className="student-stats">
        <StatCard label="Moyenne quiz" value={`${data.quizAverage}%`} accent />
        <StatCard label="Meilleur examen blanc" value={`${data.mockExamBest}/40`} />
        <StatCard label="Leçons complétées" value={`${data.lessonsCompleted}/${data.lessonsTotal}`} />
        <StatCard label="Série d'entraînement" value={`${data.streakDays} jours`} />
      </div>

      <Card title="Heures d'entraînement cette semaine">
        <div className="student-chart" role="img" aria-label="Graphique des heures par jour">
          {data.weeklyHours.map((h, i) => (
            <div key={DAYS[i]} className="student-chart__bar-wrap">
              <div
                className="student-chart__bar"
                style={{ height: `${(h / maxHours) * 100}%` }}
                title={`${h}h`}
              />
              <span className="student-chart__label">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="student-grid student-grid--2" style={{ marginTop: '1rem' }}>
        <Card title="Taux de complétion">
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--moz-primary)' }}>
            {Math.round((data.lessonsCompleted / data.lessonsTotal) * 100)}%
          </div>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--moz-neutral-500)' }}>
            {data.lessonsTotal - data.lessonsCompleted} leçons restantes
          </p>
        </Card>
        <Card title="Performance code">
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--moz-secondary)' }}>
            {data.quizAverage >= 75 ? 'Prêt' : 'En cours'}
          </div>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--moz-neutral-500)' }}>
            Objectif : 75% de moyenne aux quiz
          </p>
        </Card>
      </div>
    </>
  );
}
