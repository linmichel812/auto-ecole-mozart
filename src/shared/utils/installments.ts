/**
 * Calcul des mensualités et échéanciers.
 * @module shared/utils/installments
 */

import type { BudgetSimulation, InstallmentSchedule } from '../types/payment';
import { INSTALLMENT_OPTIONS, PERMIS_PRICING, type PermisPricing } from '../constants/pricing';
import { roundToMobileMoney } from './currency';

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

/**
 * Calcule un échéancier après acompte.
 * @param permisId - Identifiant formation
 * @param installmentCount - Nombre de mensualités (hors acompte)
 * @param startDate - Date de début (défaut: aujourd'hui)
 */
export function calculateInstallmentSchedule(
  permisId: string,
  installmentCount: number,
  startDate = new Date(),
): InstallmentSchedule | null {
  const pricing = PERMIS_PRICING[permisId];
  if (!pricing || installmentCount < 1) return null;

  const remaining = pricing.totalPrice - pricing.deposit;
  const feeMultiplier = 1 + pricing.installmentFeePercent / 100;
  const totalWithFees = Math.round(remaining * feeMultiplier);
  const baseInstallment = roundToMobileMoney(totalWithFees / installmentCount);
  const scheduleTotal = baseInstallment * (installmentCount - 1);
  const lastAmount = totalWithFees - scheduleTotal;

  const schedule = Array.from({ length: installmentCount }, (_, i) => {
    const dueDate = addMonths(startDate, i + 1);
    const amount = i === installmentCount - 1 ? lastAmount : baseInstallment;
    return {
      number: i + 1,
      dueDate: dueDate.toISOString().split('T')[0],
      amount,
      label: `Mensualité ${i + 1}/${installmentCount}`,
    };
  });

  return {
    permisId,
    totalAmount: pricing.totalPrice,
    depositAmount: pricing.deposit,
    installmentCount,
    installmentAmount: baseInstallment,
    lastInstallmentAmount: lastAmount,
    schedule,
  };
}

/**
 * Simule le budget formation avec options de paiement.
 */
export function simulateBudget(permisId: string): BudgetSimulation | null {
  const pricing = PERMIS_PRICING[permisId];
  if (!pricing) return null;

  const remainingAfterDeposit = pricing.totalPrice - pricing.deposit;

  const installmentOptions = INSTALLMENT_OPTIONS.map((months) => {
    const feeMultiplier = 1 + pricing.installmentFeePercent / 100;
    const totalWithFees = Math.round(remainingAfterDeposit * feeMultiplier);
    const monthlyAmount = roundToMobileMoney(totalWithFees / months);
    return {
      months,
      monthlyAmount,
      totalWithFees: pricing.deposit + monthlyAmount * months,
    };
  });

  return {
    permisId,
    permisLabel: pricing.label,
    totalPrice: pricing.totalPrice,
    deposit: pricing.deposit,
    remainingAfterDeposit,
    fullPaymentDiscount: pricing.fullPaymentDiscount,
    fullPaymentTotal: pricing.totalPrice - pricing.fullPaymentDiscount,
    installmentOptions,
  };
}

/** Montant à payer selon le type de plan */
export function getPlanAmount(
  pricing: PermisPricing,
  planType: 'full' | 'deposit' | 'installment',
  installmentCount?: number,
): number {
  switch (planType) {
    case 'full':
      return pricing.totalPrice - pricing.fullPaymentDiscount;
    case 'deposit':
      return pricing.deposit;
    case 'installment': {
      if (!installmentCount) return pricing.deposit;
      const schedule = calculateInstallmentSchedule(pricing.id, installmentCount);
      return schedule?.installmentAmount ?? pricing.deposit;
    }
    default:
      return pricing.totalPrice;
  }
}
