/**
 * Mock API paiements : simule Orange Money / MTN MoMo.
 * Remplacer par appels PSP réels côté backend en production.
 * @module payments/api/mockPaymentApi
 */

import type {
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentReceipt,
  PaymentSummary,
  Transaction,
} from '../../shared/types/payment';
import { buildReceiptFromTransaction } from '../../shared/utils/pdfReceipt';
import { MOCK_USER } from '../../student/api/mockStudentApi';

export const DEMO_PAYER = {
  name: `${MOCK_USER.firstName} ${MOCK_USER.lastName}`,
  phone: MOCK_USER.phone.replace(/\D/g, '').slice(-9),
};

let transactions: Transaction[] = [
  {
    id: 'tx_p1',
    reference: 'OM-7829341',
    date: '2025-11-15T10:30:00',
    label: 'Acompte inscription',
    amount: 15000,
    method: 'orange_money',
    planType: 'deposit',
    status: 'completed',
    phoneNumber: '677123456',
    receiptId: 'rcpt_tx_p1',
  },
  {
    id: 'tx_p2',
    reference: 'MTN-4491023',
    date: '2025-12-20T14:00:00',
    label: '2e tranche',
    amount: 10000,
    method: 'mtn_momo',
    planType: 'installment',
    status: 'completed',
    phoneNumber: '677123456',
    receiptId: 'rcpt_tx_p2',
  },
  {
    id: 'tx_p3',
    reference: 'CASH-20260210',
    date: '2026-02-10T09:00:00',
    label: '3e tranche',
    amount: 10000,
    method: 'cash',
    planType: 'installment',
    status: 'completed',
    receiptId: 'rcpt_tx_p3',
  },
  {
    id: 'tx_p4',
    reference: 'OM-PENDING-001',
    date: '2026-04-01T00:00:00',
    label: 'Solde final',
    amount: 15000,
    method: 'orange_money',
    planType: 'full',
    status: 'pending',
  },
];

const receipts: Map<string, PaymentReceipt> = new Map();

function delay(ms = 500): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function generateReference(method: string): string {
  const prefix = method === 'orange_money' ? 'OM' : 'MTN';
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

function ussdForMethod(method: string, amount: number, phone: string): string {
  if (method === 'orange_money') {
    return `#150*1*1*${amount}*${phone}#`;
  }
  return `*126*1*${phone}*${amount}#`;
}

function initReceipt(tx: Transaction, payer = DEMO_PAYER): PaymentReceipt {
  const receipt = buildReceiptFromTransaction(tx, payer);
  receipts.set(receipt.id, receipt);
  tx.receiptId = receipt.id;
  return receipt;
}

// Pré-générer reçus existants
transactions.filter((t) => t.status === 'completed').forEach((t) => initReceipt(t));

export const mockPaymentApi = {
  async getSummary(): Promise<PaymentSummary> {
    await delay(200);
    const paid = transactions.filter((t) => t.status === 'completed').reduce((s, t) => s + t.amount, 0);
    const totalDue = 50000;
    const pending = transactions.find((t) => t.status === 'pending');
    return {
      totalDue,
      totalPaid: paid,
      remaining: totalDue - paid,
      nextDueDate: pending?.date.split('T')[0],
      nextDueAmount: pending?.amount,
    };
  },

  async getTransactions(): Promise<Transaction[]> {
    await delay(200);
    return [...transactions].sort((a, b) => b.date.localeCompare(a.date));
  },

  async initiatePayment(request: PaymentInitRequest): Promise<PaymentInitResponse> {
    await delay(800);
    const reference = generateReference(request.method);
    const txId = `tx_${Date.now()}`;

    const tx: Transaction = {
      id: txId,
      reference,
      date: new Date().toISOString(),
      label: request.label ?? `Paiement ${request.planType}`,
      amount: request.amount,
      method: request.method,
      planType: request.planType,
      status: 'processing',
      phoneNumber: request.phoneNumber,
    };

    transactions.unshift(tx);

    // Simulation confirmation automatique après traitement
    await delay(600);
    tx.status = 'completed';
    initReceipt(tx, { name: DEMO_PAYER.name, phone: request.phoneNumber });

    return {
      transactionId: txId,
      reference,
      status: 'completed',
      ussdCode: ussdForMethod(request.method, request.amount, request.phoneNumber),
      message: `Paiement de ${request.amount} FCFA confirmé via ${request.method === 'orange_money' ? 'Orange Money' : 'MTN MoMo'}.`,
      amount: request.amount,
      method: request.method,
      planType: request.planType,
    };
  },

  async getReceipt(receiptId: string): Promise<PaymentReceipt | null> {
    await delay(100);
    return receipts.get(receiptId) ?? null;
  },

  async getReceiptByTransaction(transactionId: string): Promise<PaymentReceipt | null> {
    const tx = transactions.find((t) => t.id === transactionId);
    if (!tx?.receiptId) return null;
    return receipts.get(tx.receiptId) ?? null;
  },
};
