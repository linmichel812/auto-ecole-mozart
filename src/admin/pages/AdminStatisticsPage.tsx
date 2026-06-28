import { Card } from '../../design-system';
import { formatFcfa } from '../../shared';
import { adminService } from '../api/adminService';
import { AdminStat } from '../components/AdminStat';
import { useAsyncData } from '../../student/hooks/useAsyncData';

export function AdminStatisticsPage() {
  const { data, loading } = useAsyncData(() => adminService.getStatistics(), []);

  if (loading || !data) return <div className="admin-skeleton" />;

  const { stats, revenueByMonth, studentsByAgency } = data;
  const maxRev = Math.max(...revenueByMonth.map((r) => r.amount), 1);
  const maxStudents = Math.max(...studentsByAgency.map((a) => a.count), 1);

  return (
    <>
      <div className="admin-stats">
        <AdminStat label="Total élèves" value={stats.totalStudents} />
        <AdminStat label="Élèves actifs" value={stats.activeStudents} accent />
        <AdminStat label="Agences actives" value={stats.agenciesCount} />
        <AdminStat label="Formations actives" value={stats.formationsCount} />
        <AdminStat label="Revenus cumulés" value={formatFcfa(stats.totalRevenue)} />
        <AdminStat label="Revenus mensuels" value={formatFcfa(stats.monthlyRevenue)} accent />
        <AdminStat label="Conversion" value={`${stats.conversionRate}%`} />
        <AdminStat label="Inscriptions pending" value={stats.pendingInscriptions} />
      </div>

      <div className="admin-grid-2">
        <Card title="Évolution revenus">
          <div className="admin-chart">
            {revenueByMonth.map((r) => (
              <div key={r.month} className="admin-chart__bar-wrap">
                <div className="admin-chart__bar" style={{ height: `${(r.amount / maxRev) * 100}%`, background: 'var(--moz-primary)' }} />
                <span className="admin-chart__label">{r.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Répartition par agence">
          <div className="admin-chart">
            {studentsByAgency.map((a) => (
              <div key={a.agency} className="admin-chart__bar-wrap">
                <div className="admin-chart__bar" style={{ height: `${(a.count / maxStudents) * 100}%` }} title={`${a.count} élèves`} />
                <span className="admin-chart__label">{a.agency.slice(0, 6)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
