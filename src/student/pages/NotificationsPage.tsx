import { Link } from 'react-router-dom';
import { Badge, Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatDateTime } from '../../shared';
import type { Notification } from '../types';

const TYPE_VARIANT: Record<Notification['type'], 'primary' | 'success' | 'warning' | 'neutral'> = {
  info: 'neutral',
  success: 'success',
  warning: 'warning',
  reminder: 'primary',
};

export function NotificationsPage() {
  const { data, loading, refetch } = useAsyncData(() => studentService.getNotifications(), []);

  const handleMarkRead = async (id: string) => {
    await studentService.markNotificationRead(id);
    refetch();
  };

  const unread = data?.filter((n) => !n.read).length ?? 0;

  return (
    <>
      <StudentPageHeader
        title="Notifications"
        subtitle={unread > 0 ? `${unread} notification${unread > 1 ? 's' : ''} non lue${unread > 1 ? 's' : ''}` : 'Tout est à jour'}
      />

      {loading ? (
        <div className="student-skeleton" />
      ) : (
        <div className="student-grid">
          {data?.length === 0 ? (
            <p className="student-empty">Aucune notification.</p>
          ) : (
            data?.map((n) => (
              <Card
                key={n.id}
                title={n.title}
                badge={
                  <Badge variant={TYPE_VARIANT[n.type]} size="sm">
                    {n.type === 'reminder' ? 'Rappel' : n.type}
                  </Badge>
                }
                interactive
                onClick={() => !n.read && handleMarkRead(n.id)}
              >
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: 'var(--moz-neutral-600)' }}>
                  {n.message}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--moz-neutral-400)' }}>
                    {formatDateTime(n.createdAt)}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {!n.read && <Badge variant="primary" size="sm">Nouveau</Badge>}
                    {n.link && (
                      <Link to={n.link} style={{ fontSize: '0.8rem', color: 'var(--moz-primary)' }}>
                        Voir →
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </>
  );
}
