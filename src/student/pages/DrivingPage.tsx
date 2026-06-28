import { Badge, Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { ProgressRing } from '../components/ProgressRing';
import { StatCard } from '../components/StatCard';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatDate } from '../../shared';

export function DrivingPage() {
  const { data, loading } = useAsyncData(() => studentService.getDrivingHours(), []);

  if (loading || !data) {
    return (
      <>
        <StudentPageHeader title="Heures de conduite" />
        <div className="student-skeleton" />
      </>
    );
  }

  const pct = Math.round((data.completed / data.totalRequired) * 100);

  return (
    <>
      <StudentPageHeader
        title="Heures de conduite"
        subtitle={`${data.completed}h effectuées sur ${data.totalRequired}h requises`}
      />

      <div className="student-stats">
        <StatCard label="Heures effectuées" value={`${data.completed}h`} accent />
        <StatCard label="Heures restantes" value={`${data.remaining}h`} />
        <StatCard
          label="Dernière séance"
          value={data.lastSession ? formatDate(data.lastSession) : 'Aucune'}
        />
        <StatCard label="Avancement" value={`${pct}%`} />
      </div>

      <Card title="Progression conduite">
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', padding: '1rem' }}>
          <ProgressRing percent={pct} size={120} />
          <div>
            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--moz-secondary)' }}>
              {data.remaining} heure{data.remaining > 1 ? 's' : ''} restante{data.remaining > 1 ? 's' : ''}
            </p>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--moz-neutral-500)', fontSize: '0.875rem' }}>
              Objectif : {data.totalRequired}h minimum pour l&apos;examen pratique
            </p>
          </div>
        </div>
      </Card>

      <section className="student-section" style={{ marginTop: '1.5rem' }}>
        <div className="student-section__title">Historique des séances</div>
        <div className="student-grid">
          {data.sessions.map((s) => (
            <Card
              key={s.id}
              title={new Date(s.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
              meta={[
                { label: 'Durée', value: `${s.durationMinutes} min` },
                { label: 'Monitrice', value: s.instructor },
                ...(s.rating ? [{ label: 'Note', value: `${s.rating}/5` }] : []),
              ]}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {s.topics.map((t) => (
                  <Badge key={t} variant="neutral" size="sm">{t}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
