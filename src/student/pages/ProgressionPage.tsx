import { Badge, Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { ProgressRing } from '../components/ProgressRing';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import type { ProgressPhase } from '../types';

const STATUS_LABELS: Record<ProgressPhase['status'], string> = {
  completed: 'Terminé',
  in_progress: 'En cours',
  locked: 'Verrouillé',
};

const STATUS_VARIANT: Record<ProgressPhase['status'], 'success' | 'warning' | 'neutral'> = {
  completed: 'success',
  in_progress: 'warning',
  locked: 'neutral',
};

export function ProgressionPage() {
  const { data, loading } = useAsyncData(() => studentService.getProgress(), []);

  if (loading || !data) {
    return (
      <>
        <StudentPageHeader title="Progression de formation" />
        <div className="student-skeleton" style={{ height: 200 }} />
      </>
    );
  }

  return (
    <>
      <StudentPageHeader
        title="Progression de formation"
        subtitle={`Phase actuelle : ${data.currentPhase === 'practice' ? 'Conduite pratique' : data.currentPhase}`}
      />

      <div className="student-grid student-grid--3" style={{ marginBottom: '1.5rem' }}>
        <Card title="Global">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem' }}>
            <ProgressRing percent={data.overallPercent} size={100} />
          </div>
        </Card>
        <Card title="Théorie" meta={[{ label: 'Avancement', value: `${data.theoryPercent}%` }]} />
        <Card title="Pratique" meta={[{ label: 'Avancement', value: `${data.practicePercent}%` }]} />
      </div>

      <Card title="Prochain jalon">
        <p style={{ margin: 0, color: 'var(--moz-neutral-600)' }}>{data.nextMilestone}</p>
      </Card>

      <section className="student-section" style={{ marginTop: '1.5rem' }}>
        <div className="student-section__title">Étapes de formation</div>
        <div className="student-phases">
          {data.phases.map((phase) => (
            <div
              key={phase.id}
              className={`student-phase student-phase--${phase.status}`}
            >
              <div className="student-phase__header">
                <span className="student-phase__label">{phase.label}</span>
                <Badge variant={STATUS_VARIANT[phase.status]} size="sm">
                  {STATUS_LABELS[phase.status]}
                </Badge>
              </div>
              <div className="student-phase__bar">
                <div className="student-phase__fill" style={{ width: `${phase.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
