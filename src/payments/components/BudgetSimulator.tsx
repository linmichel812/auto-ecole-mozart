import { useState } from 'react';
import { Card } from '../../design-system';
import {
  DEFAULT_PERMIS_ID,
  PERMIS_PRICING,
  formatFcfa,
  simulateBudget,
} from '../../shared';

/**
 * Simulateur de budget formation : compare options de paiement.
 */
export function BudgetSimulator() {
  const [permisId, setPermisId] = useState(DEFAULT_PERMIS_ID);
  const simulation = simulateBudget(permisId);

  if (!simulation) return null;

  return (
    <Card title="Simulateur de budget">
      <div className="pay-field">
        <label htmlFor="budget-permis" className="pay-field__label">Formation</label>
        <select
          id="budget-permis"
          className="moz-select"
          value={permisId}
          onChange={(e) => setPermisId(e.target.value)}
        >
          {Object.values(PERMIS_PRICING).map((p) => (
            <option key={p.id} value={p.id}>{p.label} : {formatFcfa(p.totalPrice)}</option>
          ))}
        </select>
      </div>

      <div className="pay-sim-grid">
        <div className="pay-sim-card">
          <span className="pay-sim-card__label">Prix catalogue</span>
          <strong>{formatFcfa(simulation.totalPrice)}</strong>
        </div>
        <div className="pay-sim-card pay-sim-card--accent">
          <span className="pay-sim-card__label">Paiement comptant</span>
          <strong>{formatFcfa(simulation.fullPaymentTotal)}</strong>
          {simulation.fullPaymentDiscount > 0 && (
            <small>Économie {formatFcfa(simulation.fullPaymentDiscount)}</small>
          )}
        </div>
        <div className="pay-sim-card">
          <span className="pay-sim-card__label">Acompte minimum</span>
          <strong>{formatFcfa(simulation.deposit)}</strong>
          <small>Reste {formatFcfa(simulation.remainingAfterDeposit)}</small>
        </div>
      </div>

      <h4 className="pay-subtitle">Options échelonnées (après acompte)</h4>
      <div className="pay-install-options">
        {simulation.installmentOptions.map((opt) => (
          <div key={opt.months} className="pay-install-option">
            <span>{opt.months} mois</span>
            <strong>{formatFcfa(opt.monthlyAmount)}/mois</strong>
            <small>Total {formatFcfa(opt.totalWithFees)}</small>
          </div>
        ))}
      </div>
    </Card>
  );
}
