import { useState, type FormEvent } from 'react';
import { Button, Card, Input, Select } from '../../design-system';
import { studentService } from '../api/studentService';
import { LessonItem } from '../components/LessonItem';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';

const TIME_SLOTS = [
  { value: '08:00-09:00', label: '08:00 – 09:00' },
  { value: '10:00-11:00', label: '10:00 – 11:00' },
  { value: '14:00-15:00', label: '14:00 – 15:00' },
  { value: '16:00-17:00', label: '16:00 – 17:00' },
];

export function ReservationsPage() {
  const { data: planning, refetch } = useAsyncData(() => studentService.getPlanning(), []);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0].value);
  const [type, setType] = useState<'practice' | 'theory'>('practice');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const minDate = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await studentService.bookSession({ date, timeSlot, type, notes: notes || undefined });
      setSuccess(true);
      setDate('');
      setNotes('');
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la réservation');
    } finally {
      setSubmitting(false);
    }
  };

  const upcoming = planning?.filter((l) => l.status === 'scheduled').slice(0, 3) ?? [];

  return (
    <>
      <StudentPageHeader title="Réservations de séances" subtitle="Réservez vos créneaux théoriques ou pratiques" />

      <div className="student-grid student-grid--2">
        <Card title="Nouvelle réservation">
          {success && (
            <p style={{ color: '#16a34a', fontSize: '0.875rem', marginBottom: '1rem' }}>
              ✓ Séance réservée avec succès !
            </p>
          )}
          {error && (
            <p style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <Select
              label="Type de séance"
              value={type}
              onChange={(e) => setType(e.target.value as 'practice' | 'theory')}
              options={[
                { value: 'practice', label: 'Conduite pratique' },
                { value: 'theory', label: 'Cours théorique' },
              ]}
            />
            <Input
              label="Date"
              type="date"
              value={date}
              min={minDate}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Select
              label="Créneau horaire"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              options={TIME_SLOTS}
            />
            <Input
              label="Notes (optionnel)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex. : préférence monitrice, thème à travailler…"
            />
            <Button type="submit" fullWidth disabled={submitting || !date}>
              {submitting ? 'Réservation…' : 'Confirmer la réservation'}
            </Button>
          </form>
        </Card>

        <div>
          <div className="student-section__title">Prochaines réservations</div>
          <div className="student-grid">
            {upcoming.length === 0 ? (
              <p className="student-empty">Aucune réservation à venir.</p>
            ) : (
              upcoming.map((l) => <LessonItem key={l.id} lesson={l} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}
