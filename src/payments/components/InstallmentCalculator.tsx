import { useMemo, useState } from 'react';
import { Card } from '../../design-system';
import {
  DEFAULT_PERMIS_ID,
  INSTALLMENT_OPTIONS,
  PERMIS_PRICING,
  calculateInstallmentSchedule,
  formatDate,
  formatFcfa,
} from '../../shared';

/**
 * Calculateur de mensualités : échéancier détaillé après acompte.
 */
export function InstallmentCalculator() {
  const [permisId, setPermisId] = useState(DEFAULT_PERMIS_ID);
  const [months, setMonths] = useState<number>(INSTALLMENT_OPTIONS[1]);

  const schedule = useMemo(
    () => calculateInstallmentSchedule(permisId, months),
    [permisId, months],
  );

  const pricing = PERMIS_PRICING[permisId];

  return (
    <Card title="Calculateur de mensualités">
      <div className="pay-field-row">
        <div className="pay-field">
          <label htmlFor="calc-permis" className="pay-field__label">Formation</label>
          <select
            id="calc-permis"
            className="moz-select"
            value={permisId}
            onChange={(e) => setPermisId(e.target.value)}
          >
            {Object.values(PERMIS_PRICING).map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>
        <div className="pay-field">
          <label htmlFor="calc-months" className="pay-field__label">Durée (mois)</label>
          <select
            id="calc-months"
            className="moz-select"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          >
            {INSTALLMENT_OPTIONS.map((m) => (
              <option key={m} value={m}>{m} mensualités</option>
            ))}
          </select>
        </div>
      </div>

      {pricing && schedule && (
        <>
          <div className="pay-calc-summary">
            <p>
              Acompte : <strong>{formatFcfa(schedule.depositAmount)}</strong>
              {' · '}
              Puis <strong>{formatFcfa(schedule.installmentAmount)}</strong>/mois
              {schedule.lastInstallmentAmount !== schedule.installmentAmount && (
                <> (dernière : {formatFcfa(schedule.lastInstallmentAmount)})</>
              )}
            </p>
            <p className="pay-calc-total">Total formation : {formatFcfa(schedule.totalAmount)}</p>
          </div>

          <table className="pay-schedule-table">
            <thead>
              <tr>
                <th>Échéance</th>
                <th>Date</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              <tr className="pay-schedule-table__deposit">
                <td>Acompte</td>
                <td>À l&apos;inscription</td>
                <td>{formatFcfa(schedule.depositAmount)}</td>
              </tr>
              {schedule.schedule.map((due) => (
                <tr key={due.number}>
                  <td>{due.label}</td>
                  <td>{formatDate(due.dueDate)}</td>
                  <td>{formatFcfa(due.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Card>
  );
}
