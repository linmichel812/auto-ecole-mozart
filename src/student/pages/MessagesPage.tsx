import { useState, type FormEvent } from 'react';
import { Button, Card, Input, Textarea } from '../../design-system';
import { studentService } from '../api/studentService';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatDateTime } from '../../shared';
import type { Message } from '../types';

export function MessagesPage() {
  const { data, loading, refetch } = useAsyncData(() => studentService.getMessages(), []);
  const [selected, setSelected] = useState<Message | null>(null);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const active = selected ?? data?.[0] ?? null;

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await studentService.sendMessage(subject, body);
      setSubject('');
      setBody('');
      setShowCompose(false);
      refetch();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <StudentPageHeader title="Messagerie" subtitle="Échangez avec votre monitrice et l'administration" />

      <div style={{ marginBottom: '1rem' }}>
        <Button size="sm" onClick={() => setShowCompose(!showCompose)}>
          {showCompose ? 'Annuler' : 'Nouveau message'}
        </Button>
      </div>

      {showCompose && (
        <Card title="Nouveau message" style={{ marginBottom: '1rem' }}>
          <form onSubmit={handleSend}>
            <Input label="Objet" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <Textarea label="Message" value={body} onChange={(e) => setBody(e.target.value)} rows={4} required />
            <Button type="submit" disabled={submitting}>{submitting ? 'Envoi…' : 'Envoyer'}</Button>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="student-skeleton" style={{ height: 300 }} />
      ) : (
        <div className="student-messages">
          <div className="student-messages__list">
            {data?.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`student-messages__item${active?.id === m.id ? ' student-messages__item--active' : ''}${!m.read ? ' student-messages__item--unread' : ''}`}
                onClick={() => setSelected(m)}
              >
                <div className="student-messages__subject">{m.subject}</div>
                <div className="student-messages__preview">{m.from} · {m.preview}</div>
              </button>
            ))}
          </div>

          {active ? (
            <div className="student-messages__detail">
              <h2 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--moz-secondary)' }}>{active.subject}</h2>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.8rem', color: 'var(--moz-neutral-500)' }}>
                De {active.from} · {formatDateTime(active.createdAt)}
              </p>
              <div className="student-messages__body">{active.body}</div>
            </div>
          ) : (
            <p className="student-empty">Sélectionnez un message.</p>
          )}
        </div>
      )}
    </>
  );
}
