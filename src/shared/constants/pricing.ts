/**
 * Tarification numérique des formations : source unique pour simulateurs et paiements.
 * @module shared/constants/pricing
 */

export interface PermisPricing {
  id: string;
  label: string;
  totalPrice: number;
  deposit: number;
  /** Réduction en FCFA pour paiement comptant intégral */
  fullPaymentDiscount: number;
  /** Frais mensualité (% du reste) par tranche : 0 = sans frais */
  installmentFeePercent: number;
}

/** Tarifs en FCFA : alignés sur DEPOSIT_AMOUNTS et permis.ts */
export const PERMIS_PRICING: Record<string, PermisPricing> = {
  'permis-b': {
    id: 'permis-b',
    label: 'Permis B',
    totalPrice: 50000,
    deposit: 15000,
    fullPaymentDiscount: 2000,
    installmentFeePercent: 0,
  },
  'permis-a': {
    id: 'permis-a',
    label: 'Permis A',
    totalPrice: 35000,
    deposit: 10000,
    fullPaymentDiscount: 1500,
    installmentFeePercent: 0,
  },
  'permis-c': {
    id: 'permis-c',
    label: 'Permis C',
    totalPrice: 120000,
    deposit: 25000,
    fullPaymentDiscount: 5000,
    installmentFeePercent: 1,
  },
  'permis-d': {
    id: 'permis-d',
    label: 'Permis D',
    totalPrice: 120000,
    deposit: 25000,
    fullPaymentDiscount: 5000,
    installmentFeePercent: 1,
  },
  'permis-e': {
    id: 'permis-e',
    label: 'Permis E',
    totalPrice: 45000,
    deposit: 15000,
    fullPaymentDiscount: 1500,
    installmentFeePercent: 0,
  },
  conversion: {
    id: 'conversion',
    label: 'Conversion permis',
    totalPrice: 40000,
    deposit: 10000,
    fullPaymentDiscount: 1000,
    installmentFeePercent: 0,
  },
  'permis-international': {
    id: 'permis-international',
    label: 'Permis international',
    totalPrice: 25000,
    deposit: 10000,
    fullPaymentDiscount: 0,
    installmentFeePercent: 0,
  },
};

export const DEFAULT_PERMIS_ID = 'permis-b';

export const INSTALLMENT_OPTIONS = [2, 3, 4, 6] as const;
