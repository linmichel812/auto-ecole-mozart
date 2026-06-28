/**
 * Génération PDF des reçus de paiement : Auto-École Mozart.
 * @module shared/utils/pdfReceipt
 */

import { jsPDF } from 'jspdf';
import type { PaymentReceipt } from '../types/payment';
import { PAYMENT_METHOD_LABELS, PAYMENT_PLAN_LABELS } from '../constants/payment';
import { formatFcfa } from './currency';
import { formatDateTime } from './date';

const BRAND = {
  name: 'Auto-École Mozart',
  address: 'Yaoundé, Cameroun',
  phone: '+237 6 77 00 00 00',
  email: 'contact@autoecolemozart.cm',
  primary: [230, 33, 0] as [number, number, number],
  secondary: [2, 30, 64] as [number, number, number],
};

/**
 * Génère et télécharge un reçu PDF pour une transaction.
 */
export function generatePaymentReceiptPdf(receipt: PaymentReceipt): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a5' });
  const w = doc.internal.pageSize.getWidth();

  // En-tête
  doc.setFillColor(...BRAND.secondary);
  doc.rect(0, 0, w, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(BRAND.name, 14, 12);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Reçu de paiement officiel', 14, 19);

  // Corps
  doc.setTextColor(...BRAND.secondary);
  doc.setFontSize(10);
  let y = 38;

  const line = (label: string, value: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(label, 14, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...BRAND.secondary);
    doc.text(value, 14, y + 5);
    y += 14;
  };

  line('Référence', receipt.reference);
  line('Date', formatDateTime(receipt.issuedAt));
  line('Payeur', receipt.payerName);
  line('Téléphone', receipt.payerPhone);
  line('Libellé', receipt.label);
  if (receipt.permisLabel) line('Formation', receipt.permisLabel);
  line('Type', PAYMENT_PLAN_LABELS[receipt.planType] ?? receipt.planType);
  line('Mode', PAYMENT_METHOD_LABELS[receipt.method] ?? receipt.method);

  // Montant
  y += 4;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, y - 4, w - 28, 18, 2, 2, 'F');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Montant payé', 18, y + 2);
  doc.setFontSize(18);
  doc.setTextColor(...BRAND.primary);
  doc.setFont('helvetica', 'bold');
  doc.text(formatFcfa(receipt.amount), 18, y + 11);

  // Pied
  y += 28;
  doc.setDrawColor(...BRAND.primary);
  doc.setLineWidth(0.5);
  doc.line(14, y, w - 14, y);
  y += 8;
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'normal');
  doc.text(`${BRAND.address} · ${BRAND.phone}`, 14, y);
  doc.text(BRAND.email, 14, y + 4);
  doc.text(`ID transaction : ${receipt.transactionId}`, 14, y + 10);
  doc.text('Document généré automatiquement, valable sans signature.', 14, y + 16);

  doc.save(`recu-mozart-${receipt.reference}.pdf`);
}

/**
 * Crée un objet reçu à partir d'une transaction complétée.
 */
export function buildReceiptFromTransaction(
  tx: {
    id: string;
    reference: string;
    amount: number;
    method: PaymentReceipt['method'];
    planType: PaymentReceipt['planType'];
    label: string;
    date: string;
  },
  payer: { name: string; phone: string },
  permisLabel?: string,
): PaymentReceipt {
  return {
    id: `rcpt_${tx.id}`,
    transactionId: tx.id,
    reference: tx.reference,
    amount: tx.amount,
    method: tx.method,
    planType: tx.planType,
    payerName: payer.name,
    payerPhone: payer.phone,
    issuedAt: tx.date,
    label: tx.label,
    permisLabel,
  };
}
