/**
 * Formatage des dates au format général français (non ambigu).
 * Exemple : "23 juin 2026" plutôt que "23/06/2026" ou "06/23/2026".
 */

type DateInput = string | number | Date;

function toDate(value: DateInput): Date {
  if (value instanceof Date) return value;
  // Pour les dates seules "YYYY-MM-DD", on ancre à midi pour éviter
  // tout décalage de fuseau horaire (jour précédent/suivant).
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T12:00:00`);
  }
  return new Date(value);
}

/** "23 juin 2026" */
export function formatDate(value: DateInput): string {
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** "23 juin 2026 à 14:30" */
export function formatDateTime(value: DateInput): string {
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return '';
  const date = d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const time = d.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${date} à ${time}`;
}
