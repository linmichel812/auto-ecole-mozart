import { Badge, Button, Card, Table } from '../../design-system';
import { adminService } from '../api/adminService';
import { useAsyncData } from '../../student/hooks/useAsyncData';
import type { TestimonialRecord } from '../types';

export function AdminTestimonialsPage() {
  const { data, loading, refetch } = useAsyncData(() => adminService.getTestimonials(), []);

  const toggle = async (id: string) => {
    await adminService.toggleTestimonial(id);
    refetch();
  };

  if (loading || !data) return <div className="admin-skeleton" />;

  return (
    <Card title={`Témoignages (${data.length})`}>
      <Table
        columns={[
          { key: 'name', header: 'Auteur', render: (t: TestimonialRecord) => t.name },
          { key: 'role', header: 'Profil', render: (t: TestimonialRecord) => t.role },
          { key: 'quote', header: 'Témoignage', render: (t: TestimonialRecord) => t.quote.slice(0, 80) + '…' },
          { key: 'rating', header: 'Note', render: (t: TestimonialRecord) => `${t.rating}/5` },
          {
            key: 'status',
            header: 'Publié',
            render: (t: TestimonialRecord) => (
              <Badge variant={t.published ? 'success' : 'neutral'} size="sm">{t.published ? 'Oui' : 'Non'}</Badge>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (t: TestimonialRecord) => (
              <Button size="sm" variant="outline" onClick={() => toggle(t.id)}>
                {t.published ? 'Masquer' : 'Publier'}
              </Button>
            ),
          },
        ]}
        data={data as Array<TestimonialRecord & Record<string, unknown>>}
      />
    </Card>
  );
}
