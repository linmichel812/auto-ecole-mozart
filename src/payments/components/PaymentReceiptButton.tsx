import { useState } from 'react';
import { Button } from '../../design-system';
import type { PaymentReceipt } from '../../shared/types/payment';
import { generatePaymentReceiptPdf } from '../../shared/utils/pdfReceipt';
import { paymentService } from '../api/paymentService';

interface PaymentReceiptButtonProps {
  receiptId?: string;
  transactionId?: string;
  size?: 'sm' | 'md';
}

/**
 * Bouton de téléchargement du reçu PDF pour une transaction.
 */
export function PaymentReceiptButton({ receiptId, transactionId, size = 'sm' }: PaymentReceiptButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      let receipt: PaymentReceipt | null = null;
      if (receiptId) {
        receipt = await paymentService.getReceipt(receiptId);
      } else if (transactionId) {
        receipt = await paymentService.getReceiptByTransaction(transactionId);
      }
      if (receipt) {
        generatePaymentReceiptPdf(receipt);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!receiptId && !transactionId) return null;

  return (
    <Button variant="outline" size={size} onClick={handleDownload} disabled={loading}>
      {loading ? '…' : 'Reçu PDF'}
    </Button>
  );
}
