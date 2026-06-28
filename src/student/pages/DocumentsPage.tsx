import { Badge, Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatDate } from '../../shared';
import type { AdminDocument } from '../types';

const TYPE_LABELS: Record<AdminDocument['type'], string> = {
  cni: 'CNI',
  medical: 'Certificat médical',
  photo: 'Photos',
  contract: 'Contrat',
  other: 'Autre',
};

const STATUS_VARIANT: Record<AdminDocument['status'], 'success' | 'warning' | 'error' | 'neutral'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'error',
  missing: 'neutral',
};

const STATUS_LABELS: Record<AdminDocument['status'], string> = {
  approved: 'Validé',
  pending: 'En attente',
  rejected: 'Refusé',
  missing: 'Manquant',
};

export function DocumentsPage() {
  const { data, loading } = useAsyncData(() => studentService.getDocuments(), []);

  const approved = data?.filter((d) => d.status === 'approved').length ?? 0;
  const total = data?.length ?? 0;

  return (
    <>
      <StudentPageHeader
        title="Documents administratifs"
        subtitle={`${approved}/${total} documents validés`}
      />

      {loading ? (
        <div className="student-skeleton" />
      ) : (
        <div className="student-grid student-grid--2">
          {data?.map((doc) => (
            <Card
              key={doc.id}
              title={doc.name}
              badge={<Badge variant={STATUS_VARIANT[doc.status]} size="sm">{STATUS_LABELS[doc.status]}</Badge>}
              meta={[
                { label: 'Type', value: TYPE_LABELS[doc.type] },
                ...(doc.uploadedAt
                  ? [{ label: 'Déposé le', value: formatDate(doc.uploadedAt) }]
                  : []),
              ]}
            >
              {doc.status === 'missing' && (
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--moz-neutral-500)' }}>
                  Veuillez déposer ce document à votre agence ou via WhatsApp.
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
