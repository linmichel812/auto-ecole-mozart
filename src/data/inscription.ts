/**
 * Données tunnel d'inscription : réexporte les constantes partagées.
 * @see shared/constants/pricing
 * @see shared/constants/payment
 */

import { PERMIS_PRICING } from '../shared/constants/pricing';
import { PAYMENT_METHODS as SHARED_METHODS } from '../shared/constants/payment';

export const INSCRIPTION_STEPS = [
  { id: 1, label: 'Informations', shortLabel: 'Infos' },
  { id: 2, label: 'Choix du permis', shortLabel: 'Permis' },
  { id: 3, label: 'Agence', shortLabel: 'Agence' },
  { id: 4, label: 'Documents', shortLabel: 'Docs' },
  { id: 5, label: 'Validation', shortLabel: 'Validation' },
  { id: 6, label: 'Acompte', shortLabel: 'Paiement' },
] as const;

export const REQUIRED_DOCUMENTS = [
  { id: 'cni', label: 'Photocopie CNI ou passeport', required: true },
  { id: 'medical', label: 'Certificat médical (< 3 mois)', required: true },
  { id: 'photos', label: '4 photos format permis', required: true },
  { id: 'domicile', label: 'Justificatif de domicile', required: false },
] as const;

/** Acomptes minimums par formation (FCFA) */
export const DEPOSIT_AMOUNTS: Record<string, number> = Object.fromEntries(
  Object.entries(PERMIS_PRICING).map(([id, p]) => [id, p.deposit]),
);

/** Méthodes affichées à l'inscription (subset mobile + agence) */
export const PAYMENT_METHODS = SHARED_METHODS.filter(
  (m) => m.id === 'orange_money' || m.id === 'mtn_momo' || m.id === 'agency',
).map((m) => ({
  id: m.id === 'orange_money' ? 'orange' : m.id === 'mtn_momo' ? 'mtn' : 'agency',
  label: m.label,
}));
