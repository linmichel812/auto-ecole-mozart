/**
 * Constantes paiement unifiées : inscription, espace élève, admin.
 * @module shared/constants/payment
 */

import type { MobileMoneyProvider, PaymentMethodId } from '../types/payment';

export interface PaymentMethodOption {
  id: PaymentMethodId;
  label: string;
  /** Disponible pour paiement mobile en ligne */
  mobileOnline: boolean;
  provider?: MobileMoneyProvider;
}

/** Méthodes de paiement Mozart */
export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'orange_money',
    label: 'Orange Money',
    mobileOnline: true,
    provider: 'orange_money',
  },
  {
    id: 'mtn_momo',
    label: 'MTN Mobile Money',
    mobileOnline: true,
    provider: 'mtn_momo',
  },
  {
    id: 'agency',
    label: 'Paiement en agence',
    mobileOnline: false,
  },
  {
    id: 'cash',
    label: 'Espèces',
    mobileOnline: false,
  },
  {
    id: 'bank',
    label: 'Virement bancaire',
    mobileOnline: false,
  },
];

export const MOBILE_MONEY_METHODS = PAYMENT_METHODS.filter(
  (m): m is PaymentMethodOption & { provider: MobileMoneyProvider } => m.mobileOnline,
);

export const PAYMENT_PLAN_LABELS: Record<string, string> = {
  full: 'Paiement complet',
  deposit: 'Acompte',
  installment: 'Paiement échelonné',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethodId, string> = {
  orange_money: 'Orange Money',
  mtn_momo: 'MTN Mobile Money',
  cash: 'Espèces',
  bank: 'Virement bancaire',
  agency: 'Paiement en agence',
};

/** Mapping legacy inscription → API */
export const LEGACY_PAYMENT_METHOD_MAP: Record<string, PaymentMethodId> = {
  orange: 'orange_money',
  mtn: 'mtn_momo',
  agency: 'agency',
};

/** Regex numéro Cameroun (9 chiffres, commence par 6) */
export const CM_PHONE_REGEX = /^6[0-9]{8}$/;

export function normalizePhoneNumber(input: string): string {
  return input.replace(/\D/g, '').slice(-9);
}

export function isValidCmPhone(input: string): boolean {
  return CM_PHONE_REGEX.test(normalizePhoneNumber(input));
}
