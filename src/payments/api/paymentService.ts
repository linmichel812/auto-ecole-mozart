/**
 * Service paiements : façade unique pour espace élève et inscription.
 * @module payments/api/paymentService
 */

import { USE_MOCK_API } from '../../student/api/client';
import { mockPaymentApi } from './mockPaymentApi';
import type {
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentReceipt,
  PaymentSummary,
  Transaction,
} from '../../shared/types/payment';

export const paymentService = {
  getSummary: (): Promise<PaymentSummary> =>
    USE_MOCK_API ? mockPaymentApi.getSummary() : mockPaymentApi.getSummary(),

  getTransactions: (): Promise<Transaction[]> =>
    USE_MOCK_API ? mockPaymentApi.getTransactions() : mockPaymentApi.getTransactions(),

  initiatePayment: (req: PaymentInitRequest): Promise<PaymentInitResponse> =>
    USE_MOCK_API ? mockPaymentApi.initiatePayment(req) : mockPaymentApi.initiatePayment(req),

  getReceipt: (receiptId: string): Promise<PaymentReceipt | null> =>
    USE_MOCK_API ? mockPaymentApi.getReceipt(receiptId) : mockPaymentApi.getReceipt(receiptId),

  getReceiptByTransaction: (transactionId: string): Promise<PaymentReceipt | null> =>
    USE_MOCK_API
      ? mockPaymentApi.getReceiptByTransaction(transactionId)
      : mockPaymentApi.getReceiptByTransaction(transactionId),
};

export { DEMO_PAYER } from './mockPaymentApi';
