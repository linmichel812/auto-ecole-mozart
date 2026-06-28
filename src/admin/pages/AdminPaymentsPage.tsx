import { Badge, Card, Table } from '../../design-system';
import { formatDate, formatFcfa } from '../../shared';
import { adminService } from '../api/adminService';
import { AdminStat } from '../components/AdminStat';
import { useAsyncData } from '../../student/hooks/useAsyncData';
import type { AdminPaymentRecord } from '../types';

export function AdminPaymentsPage() {
  const { data, loading } = useAsyncData(() => adminService.getPayments(), []);
  const { data: dashboard } = useAsyncData(() => adminService.getDashboard(), []);

  if (loading || !data) return <div className="admin-skeleton" />;

  const total = data.reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <div className="admin-stats">
        <AdminStat label="Transactions" value={data.length} />
        <AdminStat label="Volume total" value={formatFcfa(total)} accent />
        <AdminStat label="En attente" value={dashboard?.stats.pendingPayments ?? 0} />
      </div>

      <Card title="Transactions élèves">
        <Table
          columns={[
            { key: 'student', header: 'Élève', render: (p: AdminPaymentRecord) => p.studentName },
            { key: 'amount', header: 'Montant', render: (p: AdminPaymentRecord) => formatFcfa(p.amount) },
            { key: 'method', header: 'Mode', render: (p: AdminPaymentRecord) => p.method },
            { key: 'plan', header: 'Type', render: (p: AdminPaymentRecord) => p.planType },
            {
              key: 'status',
              header: 'Statut',
              render: (p: AdminPaymentRecord) => (
                <Badge variant={p.status === 'completed' ? 'success' : 'warning'} size="sm">{p.status}</Badge>
              ),
            },
            { key: 'ref', header: 'Référence', render: (p: AdminPaymentRecord) => p.reference },
            { key: 'date', header: 'Date', render: (p: AdminPaymentRecord) => formatDate(p.date) },
          ]}
          data={data as Array<AdminPaymentRecord & Record<string, unknown>>}
        />
      </Card>
    </>
  );
}
