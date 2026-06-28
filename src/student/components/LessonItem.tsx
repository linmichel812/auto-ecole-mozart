import { Badge } from '../../design-system';
import type { LessonSlot } from '../types';

const TYPE_LABELS: Record<LessonSlot['type'], string> = {
  theory: 'Théorie',
  practice: 'Conduite',
  simulation: 'Simulation',
};

const STATUS_VARIANT: Record<LessonSlot['status'], 'success' | 'warning' | 'neutral'> = {
  scheduled: 'warning',
  completed: 'success',
  cancelled: 'neutral',
};

const STATUS_LABELS: Record<LessonSlot['status'], string> = {
  scheduled: 'Prévu',
  completed: 'Terminé',
  cancelled: 'Annulé',
};

export function LessonItem({ lesson }: { lesson: LessonSlot }) {
  const d = new Date(lesson.date + 'T12:00:00');
  const day = d.getDate();
  const month = d.toLocaleDateString('fr-FR', { month: 'short' });

  return (
    <div className="student-list-item">
      <div className="student-list-item__date">
        <div className="student-list-item__date-day">{day}</div>
        <div className="student-list-item__date-month">{month}</div>
      </div>
      <div className="student-list-item__body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
          <p className="student-list-item__title" style={{ margin: 0 }}>{lesson.title}</p>
          <Badge variant={STATUS_VARIANT[lesson.status]} size="sm">{STATUS_LABELS[lesson.status]}</Badge>
        </div>
        <p className="student-list-item__meta">
          {lesson.startTime} – {lesson.endTime} · {TYPE_LABELS[lesson.type]} · {lesson.location}
        </p>
        <p className="student-list-item__meta">{lesson.instructor}</p>
      </div>
    </div>
  );
}
