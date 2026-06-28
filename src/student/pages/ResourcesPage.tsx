import { Badge, Button, Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import type { Resource } from '../types';

const CATEGORY_LABELS: Record<Resource['category'], string> = {
  code: 'Code',
  conduite: 'Conduite',
  admin: 'Administratif',
  video: 'Vidéo',
};

const FORMAT_LABELS: Record<Resource['format'], string> = {
  pdf: 'PDF',
  video: 'Vidéo',
  article: 'Article',
};

export function ResourcesPage() {
  const { data, loading } = useAsyncData(() => studentService.getResources(), []);

  return (
    <>
      <StudentPageHeader
        title="Centre de ressources"
        subtitle="Documents, vidéos et guides pour votre formation"
      />

      {loading ? (
        <div className="student-skeleton" />
      ) : (
        <div className="student-grid student-grid--2">
          {data?.map((r) => (
            <Card
              key={r.id}
              title={r.title}
              badge={<Badge variant="neutral" size="sm">{CATEGORY_LABELS[r.category]}</Badge>}
              meta={[
                { label: 'Format', value: FORMAT_LABELS[r.format] },
                ...(r.duration ? [{ label: 'Durée', value: r.duration }] : []),
              ]}
              footer={
                <Button href={r.url} variant="outline" size="sm" target="_blank" rel="noopener noreferrer">
                  Consulter
                </Button>
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
