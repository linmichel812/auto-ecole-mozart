import { Badge, Card, Table } from '../../design-system';
import { adminService } from '../api/adminService';
import { useAsyncData } from '../../student/hooks/useAsyncData';
import { formatDate } from '../../shared';
import type { ContentRecord } from '../types';

export function AdminContentsPage() {
  const { data, loading } = useAsyncData(() => adminService.getContents(), []);

  if (loading || !data) return <div className="admin-skeleton" />;

  const articles = data.filter((c) => c.type === 'article');
  const faqs = data.filter((c) => c.type === 'faq');

  return (
    <>
      <Card title={`Articles (${articles.length})`} style={{ marginBottom: '1rem' }}>
        <Table
          columns={[
            { key: 'title', header: 'Titre', render: (c: ContentRecord) => c.title },
            { key: 'category', header: 'Catégorie', render: (c: ContentRecord) => c.category },
            {
              key: 'status',
              header: 'Statut',
              render: (c: ContentRecord) => <Badge variant="success" size="sm">{c.status}</Badge>,
            },
            { key: 'updated', header: 'Mis à jour', render: (c: ContentRecord) => formatDate(c.updatedAt) },
          ]}
          data={articles as Array<ContentRecord & Record<string, unknown>>}
        />
      </Card>

      <Card title={`FAQ (${faqs.length})`}>
        <Table
          columns={[
            { key: 'title', header: 'Question', render: (c: ContentRecord) => c.title },
            { key: 'category', header: 'Catégorie', render: (c: ContentRecord) => c.category },
            {
              key: 'status',
              header: 'Statut',
              render: (c: ContentRecord) => <Badge variant="success" size="sm">{c.status}</Badge>,
            },
          ]}
          data={faqs as Array<ContentRecord & Record<string, unknown>>}
        />
      </Card>
    </>
  );
}
