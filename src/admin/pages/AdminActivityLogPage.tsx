import { Badge, Card } from '../../design-system';
import { adminService } from '../api/adminService';
import { useAsyncData } from '../../student/hooks/useAsyncData';
import { formatDateTime } from '../../shared';
import type { ActivityLogEntry } from '../types';

const SEVERITY_VARIANT: Record<ActivityLogEntry['severity'], 'neutral' | 'warning' | 'error'> = {
  info: 'neutral',
  warning: 'warning',
  critical: 'error',
};

export function AdminActivityLogPage() {
  const { data, loading } = useAsyncData(() => adminService.getActivityLog(), []);

  if (loading || !data) return <div className="admin-skeleton" />;

  return (
    <Card title={`Journal d'activité (${data.length} entrées)`}>
      {data.map((log) => (
        <div key={log.id} className={`admin-log-item${log.severity === 'critical' ? ' admin-log-item--critical' : ''}`}>
          <span className="admin-log-item__time">{formatDateTime(log.createdAt)}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <strong className="admin-log-item__action">{log.action}</strong>
              <Badge variant={SEVERITY_VARIANT[log.severity]} size="sm">{log.severity}</Badge>
            </div>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#64748b' }}>
              {log.actor} ({log.actorRole}) · {log.resource}
              {log.resourceId && ` #${log.resourceId}`}
            </p>
            {log.details && <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>{log.details}</p>}
          </div>
        </div>
      ))}
    </Card>
  );
}
