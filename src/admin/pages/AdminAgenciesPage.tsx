import { Badge, Button, Card, Table } from '../../design-system';
import { adminService } from '../api/adminService';
import { useAsyncData } from '../../student/hooks/useAsyncData';
import type { AgencyRecord } from '../types';

export function AdminAgenciesPage() {
  const { data, loading, refetch } = useAsyncData(() => adminService.getAgencies(), []);

  const toggle = async (id: string) => {
    await adminService.toggleAgency(id);
    refetch();
  };

  if (loading || !data) return <div className="admin-skeleton" />;

  return (
    <Card title={`Agences (${data.length})`}>
      <Table
        columns={[
          { key: 'name', header: 'Nom', render: (a: AgencyRecord) => a.name },
          { key: 'district', header: 'Quartier', render: (a: AgencyRecord) => a.district },
          { key: 'address', header: 'Adresse', render: (a: AgencyRecord) => a.address },
          { key: 'phone', header: 'Téléphone', render: (a: AgencyRecord) => a.phone },
          { key: 'hours', header: 'Horaires', render: (a: AgencyRecord) => a.hours },
          { key: 'students', header: 'Élèves', render: (a: AgencyRecord) => String(a.studentsCount) },
          {
            key: 'status',
            header: 'Statut',
            render: (a: AgencyRecord) => (
              <Badge variant={a.active ? 'success' : 'neutral'} size="sm">{a.active ? 'Active' : 'Inactive'}</Badge>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (a: AgencyRecord) => (
              <Button size="sm" variant="outline" onClick={() => toggle(a.id)}>
                {a.active ? 'Désactiver' : 'Activer'}
              </Button>
            ),
          },
        ]}
        data={data as Array<AgencyRecord & Record<string, unknown>>}
      />
    </Card>
  );
}
