import { useState } from 'react';
import { Badge, Card, Table } from '../../design-system';
import { BudgetSimulator } from '../../payments/components/BudgetSimulator';
import { InstallmentCalculator } from '../../payments/components/InstallmentCalculator';
import { PaymentCheckout } from '../../payments/components/PaymentCheckout';
import { PaymentReceiptButton } from '../../payments/components/PaymentReceiptButton';
import { paymentService } from '../../payments/api/paymentService';
import '../../payments/styles/payments.css';
import { StatCard } from '../components/StatCard';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_PLAN_LABELS,
  formatDate,
  formatFcfa,
} from '../../shared';
import type { Transaction } from '../../shared/types/payment';

const STATUS_VARIANT: Record<Transaction['status'], 'success' | 'warning' | 'error' | 'neutral'> = {
  completed: 'success',
  pending: 'warning',
  processing: 'neutral',
  failed: 'error',
  cancelled: 'neutral',
};

const STATUS_LABELS: Record<Transaction['status'], string> = {
  completed: 'Confirmé',
  pending: 'En attente',
  processing: 'En cours',
  failed: 'Échoué',
  cancelled: 'Annulé',
};

type TabId = 'pay' | 'history' | 'budget' | 'installments';

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'pay', label: 'Payer' },
  { id: 'history', label: 'Historique' },
  { id: 'budget', label: 'Simulateur' },
  { id: 'installments', label: 'Mensualités' },
];

export function PaymentsPage() {
  const [tab, setTab] = useState<TabId>('pay');
  const { data: summary, loading: loadingSummary, refetch: refetchSummary } = useAsyncData(
    () => paymentService.getSummary(),
    [],
  );
  const { data: transactions, loading: loadingTx, refetch: refetchTx } = useAsyncData(
    () => paymentService.getTransactions(),
    [],
  );

  const refetchAll = () => {
    refetchSummary();
    refetchTx();
  };

  const loading = loadingSummary || loadingTx;

  return (
    <>
      <StudentPageHeader
        title="Paiements"
        subtitle="Orange Money, MTN MoMo : complet, acompte ou échelonné"
      />

      {summary && (
        <div className="student-stats">
          <StatCard label="Total formation" value={formatFcfa(summary.totalDue)} />
          <StatCard label="Déjà payé" value={formatFcfa(summary.totalPaid)} accent />
          <StatCard label="Reste à payer" value={formatFcfa(summary.remaining)} />
          {summary.nextDueDate && (
            <StatCard
              label="Prochaine échéance"
              value={formatFcfa(summary.nextDueAmount ?? 0)}
              sub={formatDate(summary.nextDueDate)}
            />
          )}
        </div>
      )}

      <nav className="pay-tabs" aria-label="Sections paiement">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`pay-tab${tab === t.id ? ' pay-tab--active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {loading && tab === 'history' ? (
        <div className="student-skeleton" />
      ) : (
        <>
          {tab === 'pay' && (
            <PaymentCheckout onSuccess={() => { refetchAll(); setTab('history'); }} />
          )}

          {tab === 'history' && transactions && (
            <Card title="Historique des transactions">
              <Table
                columns={[
                  {
                    key: 'date',
                    header: 'Date',
                    render: (t: Transaction) => formatDate(t.date),
                  },
                  { key: 'label', header: 'Libellé', render: (t: Transaction) => t.label },
                  { key: 'amount', header: 'Montant', render: (t: Transaction) => formatFcfa(t.amount) },
                  {
                    key: 'planType',
                    header: 'Type',
                    render: (t: Transaction) => PAYMENT_PLAN_LABELS[t.planType] ?? t.planType,
                  },
                  {
                    key: 'method',
                    header: 'Mode',
                    render: (t: Transaction) => PAYMENT_METHOD_LABELS[t.method],
                  },
                  {
                    key: 'status',
                    header: 'Statut',
                    render: (t: Transaction) => (
                      <Badge variant={STATUS_VARIANT[t.status]} size="sm">
                        {STATUS_LABELS[t.status]}
                      </Badge>
                    ),
                  },
                  {
                    key: 'receipt',
                    header: 'Reçu',
                    render: (t: Transaction) => (
                      <div className="pay-tx-actions">
                        {t.status === 'completed' && (
                          <PaymentReceiptButton receiptId={t.receiptId} transactionId={t.id} />
                        )}
                      </div>
                    ),
                  },
                ]}
                data={transactions as Array<Transaction & Record<string, unknown>>}
              />
            </Card>
          )}

          {tab === 'budget' && <BudgetSimulator />}
          {tab === 'installments' && <InstallmentCalculator />}
        </>
      )}
    </>
  );
}
