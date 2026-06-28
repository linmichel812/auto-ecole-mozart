/**
 * Utilitaires monétaires FCFA.
 * @module shared/utils/currency
 */

/** Formate un montant en FCFA lisible (fr-FR) */
export function formatFcfa(amount: number): string {
  return `${new Intl.NumberFormat('fr-FR').format(amount)} FCFA`;
}

/** Parse une chaîne prix type "50 000 FCFA" */
export function parseFcfa(text: string): number | null {
  const digits = text.replace(/[^\d]/g, '');
  if (!digits) return null;
  return parseInt(digits, 10);
}

/** Arrondi au multiple de 100 FCFA (usage Mobile Money) */
export function roundToMobileMoney(amount: number): number {
  return Math.ceil(amount / 100) * 100;
}
