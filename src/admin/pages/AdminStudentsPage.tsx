import { Badge, Button, Card, Table } from '../../design-system';
import { formatFcfa } from '../../shared';
import { adminService } from '../api/adminService';
import { useAsyncData } from '../../student/hooks/useAsyncData';
import type { StudentRecord } from '../types';

const STATUS_VARIANT: Record<StudentRecord['status'], 'success' | 'warning' | 'error' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  completed: 'neutral',
  suspended: 'error',
};

export function AdminStudentsPage() {
  const { data, loading, refetch } = useAsyncData(() => adminService.getStudents(), []);

  const handleStatus = async (id: string, status: StudentRecord['status']) => {
    await adminService.updateStudentStatus(id, status);
    refetch();
  };

  if (loading || !data) return <div className="admin-skeleton" />;

  return (
    <Card title={`Élèves (${data.length})`}>
      <Table
        columns={[
          { key: 'name', header: 'Nom', render: (s: StudentRecord) => `${s.firstName} ${s.lastName}` },
          { key: 'email', header: 'Email', render: (s: StudentRecord) => s.email },
          { key: 'permis', header: 'Formation', render: (s: StudentRecord) => s.permisType },
          { key: 'agency', header: 'Agence', render: (s: StudentRecord) => s.agencyName },
          { key: 'progress', header: 'Progression', render: (s: StudentRecord) => `${s.progressPercent}%` },
          { key: 'paid', header: 'Payé', render: (s: StudentRecord) => formatFcfa(s.totalPaid) },
          {
            key: 'status',
            header: 'Statut',
            render: (s: StudentRecord) => <Badge variant={STATUS_VARIANT[s.status]} size="sm">{s.status}</Badge>,
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (s: StudentRecord) => (
              <div className="admin-actions">
                {s.status !== 'active' && <Button size="sm" variant="outline" onClick={() => handleStatus(s.id, 'active')}>Activer</Button>}
                {s.status !== 'suspended' && <Button size="sm" variant="ghost" onClick={() => handleStatus(s.id, 'suspended')}>Suspendre</Button>}
              </div>
            ),
          },
        ]}
        data={data as Array<StudentRecord & Record<string, unknown>>}
      />
    </Card>
  );
}
