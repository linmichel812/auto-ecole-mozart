import { Link } from 'react-router-dom';
import { Card } from '../../design-system';
import { formatDateTime, formatFcfa } from '../../shared';
import { adminService } from '../api/adminService';
import { AdminStat } from '../components/AdminStat';
import { useAsyncData } from '../../student/hooks/useAsyncData';
import type { ActivityLogEntry } from '../types';

export function AdminDashboardPage() {
  const { data, loading } = useAsyncData(() => adminService.getDashboard(), []);

  if (loading || !data) return <div className="admin-skeleton" />;

  const { stats, recentActivity, revenueByMonth, studentsByAgency } = data;
  const maxRev = Math.max(...revenueByMonth.map((r) => r.amount), 1);

  return (
    <>
      <div className="admin-stats">
        <AdminStat label="Élèves actifs" value={stats.activeStudents} accent />
        <AdminStat label="Revenus totaux" value={formatFcfa(stats.totalRevenue)} />
        <AdminStat label="Revenus ce mois" value={formatFcfa(stats.monthlyRevenue)} accent />
        <AdminStat label="Inscriptions en attente" value={stats.pendingInscriptions} />
        <AdminStat label="Paiements en attente" value={stats.pendingPayments} />
        <AdminStat label="Taux conversion" value={`${stats.conversionRate}%`} />
      </div>

      <div className="admin-grid-2">
        <Card title="Revenus mensuels (FCFA)">
          <div className="admin-chart">
            {revenueByMonth.map((r) => (
              <div key={r.month} className="admin-chart__bar-wrap">
                <div className="admin-chart__bar" style={{ height: `${(r.amount / maxRev) * 100}%` }} title={formatFcfa(r.amount)} />
                <span className="admin-chart__label">{r.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Élèves par agence">
          {studentsByAgency.map((a) => (
            <div key={a.agency} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
              <span>{a.agency}</span>
              <strong>{a.count}</strong>
            </div>
          ))}
        </Card>
      </div>

      <Card title="Activité récente" style={{ marginTop: '1rem' }}>
        {recentActivity.map((log: ActivityLogEntry) => (
          <div key={log.id} className={`admin-log-item${log.severity === 'critical' ? ' admin-log-item--critical' : ''}`}>
            <span className="admin-log-item__time">{formatDateTime(log.createdAt)}</span>
            <div>
              <strong className="admin-log-item__action">{log.action}</strong>
              {log.details && <p style={{ margin: '0.15rem 0 0', color: '#64748b' }}>{log.details}</p>}
            </div>
          </div>
        ))}
        <Link to="/espace-admin/journal" style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--moz-primary)' }}>
          Voir tout le journal →
        </Link>
      </Card>
    </>
  );
}
