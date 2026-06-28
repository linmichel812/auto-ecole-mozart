import { useState, type FormEvent } from 'react';
import { Badge, Button, Card, Input } from '../../design-system';
import type { PaymentInitResponse, PaymentPlanType } from '../../shared/types/payment';
import {
  DEFAULT_PERMIS_ID,
  PERMIS_PRICING,
  formatFcfa,
  getPlanAmount,
  isValidCmPhone,
  normalizePhoneNumber,
  INSTALLMENT_OPTIONS,
} from '../../shared';
import { paymentService } from '../api/paymentService';
import { PaymentMethodSelector, PLAN_OPTIONS } from './PaymentMethodSelector';
import type { MobileMoneyProvider } from '../../shared/types/payment';

interface PaymentCheckoutProps {
  permisId?: string;
  defaultPlan?: PaymentPlanType;
  onSuccess?: (response: PaymentInitResponse) => void;
}

/**
 * Tunnel de paiement Mobile Money : complet, acompte ou échelonné.
 */
export function PaymentCheckout({
  permisId = DEFAULT_PERMIS_ID,
  defaultPlan = 'deposit',
  onSuccess,
}: PaymentCheckoutProps) {
  const pricing = PERMIS_PRICING[permisId] ?? PERMIS_PRICING[DEFAULT_PERMIS_ID];
  const [planType, setPlanType] = useState<PaymentPlanType>(defaultPlan);
  const [method, setMethod] = useState<MobileMoneyProvider>('orange_money');
  const [phone, setPhone] = useState('');
  const [installmentCount, setInstallmentCount] = useState<number>(INSTALLMENT_OPTIONS[1]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PaymentInitResponse | null>(null);

  const amount = getPlanAmount(pricing, planType, installmentCount);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalized = normalizePhoneNumber(phone);
    if (!isValidCmPhone(normalized)) {
      setError('Numéro invalide. Format attendu : 6XX XXX XXX');
      return;
    }
    setSubmitting(true);
    try {
      const response = await paymentService.initiatePayment({
        amount,
        planType,
        method,
        phoneNumber: normalized,
        permisId: pricing.id,
        installmentCount: planType === 'installment' ? installmentCount : undefined,
        label: `${PLAN_OPTIONS.find((p) => p.id === planType)?.label} : ${pricing.label}`,
      });
      setResult(response);
      onSuccess?.(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec du paiement');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <Card title="Paiement confirmé">
        <Badge variant="success" size="sm" style={{ marginBottom: '1rem' }}>✓ Transaction réussie</Badge>
        <p style={{ margin: '0 0 0.5rem' }}>{result.message}</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--moz-neutral-600)' }}>
          Référence : <strong>{result.reference}</strong>
        </p>
        {result.ussdCode && (
          <p style={{ fontSize: '0.8rem', background: 'var(--moz-neutral-50)', padding: '0.75rem', borderRadius: 8, marginTop: '0.75rem' }}>
            Code USSD (simulation) : <code>{result.ussdCode}</code>
          </p>
        )}
        <Button variant="outline" size="sm" style={{ marginTop: '1rem' }} onClick={() => setResult(null)}>
          Nouveau paiement
        </Button>
      </Card>
    );
  }

  return (
    <Card title="Effectuer un paiement">
      <form onSubmit={handleSubmit}>
        <div className="pay-plan-tabs" role="tablist">
          {PLAN_OPTIONS.map((plan) => (
            <button
              key={plan.id}
              type="button"
              role="tab"
              aria-selected={planType === plan.id}
              className={`pay-plan-tab${planType === plan.id ? ' pay-plan-tab--active' : ''}`}
              onClick={() => setPlanType(plan.id)}
            >
              <span>{plan.label}</span>
              <small>{plan.description}</small>
            </button>
          ))}
        </div>

        {planType === 'installment' && (
          <div className="pay-field">
            <label htmlFor="installment-count" className="pay-field__label">Nombre de mensualités</label>
            <select
              id="installment-count"
              className="moz-select"
              value={installmentCount}
              onChange={(e) => setInstallmentCount(Number(e.target.value))}
            >
              {INSTALLMENT_OPTIONS.map((m) => (
                <option key={m} value={m}>{m} mois</option>
              ))}
            </select>
          </div>
        )}

        <div className="pay-amount-display">
          <span>Montant à payer</span>
          <strong>{formatFcfa(amount)}</strong>
        </div>

        <p className="pay-field__label" style={{ marginBottom: '0.5rem' }}>Opérateur Mobile Money</p>
        <PaymentMethodSelector value={method} onChange={setMethod} />

        <Input
          label="Numéro Mobile Money"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="6XX XXX XXX"
          hint="Numéro enregistré sur votre compte Orange Money ou MTN MoMo"
          required
        />

        {error && <p className="pay-error" role="alert">{error}</p>}

        <Button type="submit" fullWidth disabled={submitting}>
          {submitting ? 'Traitement en cours…' : `Payer ${formatFcfa(amount)}`}
        </Button>
      </form>
    </Card>
  );
}
