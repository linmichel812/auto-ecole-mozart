import type { MobileMoneyProvider, PaymentPlanType } from '../../shared/types/payment';
import { MOBILE_MONEY_METHODS } from '../../shared/constants/payment';

interface PaymentMethodSelectorProps {
  value: MobileMoneyProvider;
  onChange: (method: MobileMoneyProvider) => void;
}

/** Sélecteur Orange Money / MTN MoMo */
export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="pay-methods" role="radiogroup" aria-label="Mode de paiement mobile">
      {MOBILE_MONEY_METHODS.map((m) => (
        <button
          key={m.id}
          type="button"
          role="radio"
          aria-checked={value === m.id}
          className={`pay-method${value === m.id ? ' pay-method--active' : ''}`}
          onClick={() => m.provider && onChange(m.provider)}
        >
          <span className="pay-method__label">{m.label}</span>
        </button>
      ))}
    </div>
  );
}

export const PLAN_OPTIONS: Array<{ id: PaymentPlanType; label: string; description: string }> = [
  { id: 'full', label: 'Paiement complet', description: 'Régler l\'intégralité avec remise' },
  { id: 'deposit', label: 'Acompte', description: 'Verser l\'acompte minimum pour démarrer' },
  { id: 'installment', label: 'Échelonné', description: 'Payer une mensualité du solde' },
];
