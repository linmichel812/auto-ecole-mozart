import { Badge, Button, Card, Table } from '../../design-system';
import { adminService } from '../api/adminService';
import { useAsyncData } from '../../student/hooks/useAsyncData';
import type { InscriptionRecord } from '../types';

const STATUS_VARIANT: Record<InscriptionRecord['status'], 'success' | 'warning' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};

export function AdminInscriptionsPage() {
  const { data, loading, refetch } = useAsyncData(() => adminService.getInscriptions(), []);

  const updateStatus = async (id: string, status: InscriptionRecord['status']) => {
    await adminService.updateInscriptionStatus(id, status);
    refetch();
  };

  if (loading || !data) return <div className="admin-skeleton" />;

  return (
    <Card title={`Inscriptions (${data.length})`}>
      <Table
        columns={[
          { key: 'name', header: 'Candidat', render: (i: InscriptionRecord) => i.applicantName },
          { key: 'email', header: 'Email', render: (i: InscriptionRecord) => i.email },
          { key: 'phone', header: 'Tél.', render: (i: InscriptionRecord) => i.phone },
          { key: 'permis', header: 'Formation', render: (i: InscriptionRecord) => i.permisLabel },
          { key: 'agency', header: 'Agence', render: (i: InscriptionRecord) => i.agencyName },
          {
            key: 'deposit',
            header: 'Acompte',
            render: (i: InscriptionRecord) => (
              <Badge variant={i.depositPaid ? 'success' : 'warning'} size="sm">
                {i.depositPaid ? 'Payé' : 'En attente'}
              </Badge>
            ),
          },
          {
            key: 'status',
            header: 'Statut',
            render: (i: InscriptionRecord) => (
              <Badge variant={STATUS_VARIANT[i.status]} size="sm">{i.status}</Badge>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (i: InscriptionRecord) => (
              i.status === 'pending' ? (
                <div className="admin-actions">
                  <Button size="sm" onClick={() => updateStatus(i.id, 'approved')}>Approuver</Button>
                  <Button size="sm" variant="ghost" onClick={() => updateStatus(i.id, 'rejected')}>Refuser</Button>
                </div>
              ) : null
            ),
          },
        ]}
        data={data as Array<InscriptionRecord & Record<string, unknown>>}
      />
    </Card>
  );
}
