import { useState } from 'react';
import { Button, Card, Input, Table } from '../../design-system';
import { formatFcfa } from '../../shared';
import { adminService } from '../api/adminService';
import { useAsyncData } from '../../student/hooks/useAsyncData';
import type { FormationRecord } from '../types';

export function AdminFormationsPage() {
  const { data, loading, refetch } = useAsyncData(() => adminService.getFormations(), []);
  const [editing, setEditing] = useState<string | null>(null);
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');

  const startEdit = (f: FormationRecord) => {
    setEditing(f.id);
    setPrice(String(f.totalPrice));
    setDeposit(String(f.deposit));
  };

  const save = async (id: string) => {
    await adminService.updateFormationPrice(id, Number(price), Number(deposit));
    setEditing(null);
    refetch();
  };

  if (loading || !data) return <div className="admin-skeleton" />;

  return (
    <Card title={`Formations (${data.length})`}>
      <Table
        columns={[
          { key: 'title', header: 'Formation', render: (f: FormationRecord) => f.title },
          { key: 'category', header: 'Catégorie', render: (f: FormationRecord) => f.category },
          {
            key: 'price',
            header: 'Prix total',
            render: (f: FormationRecord) =>
              editing === f.id ? (
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              ) : (
                formatFcfa(f.totalPrice)
              ),
          },
          {
            key: 'deposit',
            header: 'Acompte',
            render: (f: FormationRecord) =>
              editing === f.id ? (
                <Input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
              ) : (
                formatFcfa(f.deposit)
              ),
          },
          { key: 'duration', header: 'Durée', render: (f: FormationRecord) => f.duration },
          { key: 'enrollments', header: 'Inscrits', render: (f: FormationRecord) => String(f.enrollments) },
          {
            key: 'actions',
            header: 'Actions',
            render: (f: FormationRecord) => (
              editing === f.id ? (
                <Button size="sm" onClick={() => save(f.id)}>Enregistrer</Button>
              ) : (
                <Button size="sm" variant="outline" onClick={() => startEdit(f)}>Modifier tarifs</Button>
              )
            ),
          },
        ]}
        data={data as Array<FormationRecord & Record<string, unknown>>}
      />
    </Card>
  );
}
