/**
 * Types paiement partagés : contrat frontend / backend PSP.
 * @module shared/types/payment
 */

/** Modes de paiement mobile acceptés au Cameroun */
export type MobileMoneyProvider = 'orange_money' | 'mtn_momo';

/** Tous les modes de paiement Mozart */
export type PaymentMethodId = MobileMoneyProvider | 'cash' | 'bank' | 'agency';

/** Type de règlement formation */
export type PaymentPlanType = 'full' | 'deposit' | 'installment';

export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

/** Demande d'initiation de paiement (Mobile Money) */
export interface PaymentInitRequest {
  amount: number;
  planType: PaymentPlanType;
  method: MobileMoneyProvider;
  /** Numéro au format 6XX XXX XXX */
  phoneNumber: string;
  permisId?: string;
  /** Nombre de mensualités (plan échelonné) */
  installmentCount?: number;
  label?: string;
}

/** Réponse après initiation PSP (mock ou API réelle) */
export interface PaymentInitResponse {
  transactionId: string;
  reference: string;
  status: TransactionStatus;
  /** Code USSD affiché à l'utilisateur (simulation) */
  ussdCode?: string;
  message: string;
  amount: number;
  method: PaymentMethodId;
  planType: PaymentPlanType;
}

/** Transaction enregistrée : historique élève / admin */
export interface Transaction {
  id: string;
  reference: string;
  date: string;
  label: string;
  amount: number;
  method: PaymentMethodId;
  planType: PaymentPlanType;
  status: TransactionStatus;
  phoneNumber?: string;
  receiptId?: string;
}

/** Reçu PDF générable */
export interface PaymentReceipt {
  id: string;
  transactionId: string;
  reference: string;
  amount: number;
  method: PaymentMethodId;
  planType: PaymentPlanType;
  payerName: string;
  payerPhone: string;
  issuedAt: string;
  label: string;
  permisLabel?: string;
}

/** Plan de mensualités calculé */
export interface InstallmentSchedule {
  permisId: string;
  totalAmount: number;
  depositAmount: number;
  installmentCount: number;
  installmentAmount: number;
  /** Montant arrondi de la dernière échéance (centimes) */
  lastInstallmentAmount: number;
  schedule: InstallmentDue[];
}

export interface InstallmentDue {
  number: number;
  dueDate: string;
  amount: number;
  label: string;
}

/** Résultat simulateur budget */
export interface BudgetSimulation {
  permisId: string;
  permisLabel: string;
  totalPrice: number;
  deposit: number;
  remainingAfterDeposit: number;
  fullPaymentDiscount: number;
  fullPaymentTotal: number;
  installmentOptions: Array<{
    months: number;
    monthlyAmount: number;
    totalWithFees: number;
  }>;
}

export interface PaymentSummary {
  totalDue: number;
  totalPaid: number;
  remaining: number;
  nextDueDate?: string;
  nextDueAmount?: number;
}

export interface ApiError {
  code: string;
  message: string;
}
