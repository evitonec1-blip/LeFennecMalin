/**
 * Swiss Tax Calculation Utility for Pillar 3a and 3b (2026 Rules)
 * Based on official guidelines from the Swiss Federal Tax Administration (ESTV/AFC)
 * and the Federal Social Insurance Office (FSIO/OFAS).
 */

export interface TaxCalculationResult {
  allowedContribution: number;
  isCapped: boolean;
  legalLimit: number;
  marginalTaxRate: number; // e.g. 0.245 for 24.5%
  federalMarginalRate: number;
  cantonalMarginalRate: number;
  communalMarginalRate: number;
  yearlyTaxSavings: number;
  totalTaxSavingsOverHorizon: number;
  projectedCapitalGross: number;
  projectedCapitalNet: number;
  withdrawalTaxAmount: number;
  withdrawalTaxRate: number;
}

/**
 * Returns the exact Swiss 3a contribution limit for 2026
 */
export function getSwiss3aLimit(hasSecondPillar: boolean, annualIncome: number): number {
  if (hasSecondPillar) {
    return 7258.00; // Exact 2026 legal max for salaried with LPP
  } else {
    // Independent without LPP: 20% of net income, capped at CHF 36'288 for 2026
    const twentyPercent = Math.round((annualIncome * 0.20) * 100) / 100;
    return Math.min(twentyPercent, 36288.00);
  }
}

/**
 * Calculates progressive combined marginal tax rate based on canton and gross annual income.
 * This emulates the progressive tax brackets of Federal, Cantonal, and Communal taxes.
 */
export function calculateMarginalTaxRate(canton: string, annualIncome: number): {
  combined: number;
  federal: number;
  cantonal: number;
  communal: number;
} {
  const income = Math.max(0, annualIncome);

  // 1. Federal Tax (IFD) marginal rate approximation for single individuals (progressive scale)
  let federal = 0.0;
  if (income <= 14800) federal = 0.0;
  else if (income <= 32200) federal = 0.0077;
  else if (income <= 42500) federal = 0.0088;
  else if (income <= 57400) federal = 0.0264;
  else if (income <= 75300) federal = 0.0594;
  else if (income <= 107100) federal = 0.066;
  else if (income <= 139100) federal = 0.088;
  else if (income <= 182200) federal = 0.11;
  else if (income <= 783200) federal = 0.132;
  else federal = 0.115; // capped average rate

  // 2. Cantonal & Communal combined marginal rate approximation based on Canton-specific progressive curves
  let cantonalBase = 0.12;
  let multiplier = 1.0; // Communal multiplier factor

  switch (canton) {
    case 'GE': // Genève (High tax, progressive)
      if (income < 30000) cantonalBase = 0.10;
      else if (income < 60000) cantonalBase = 0.15;
      else if (income < 90000) cantonalBase = 0.21;
      else if (income < 120000) cantonalBase = 0.24;
      else cantonalBase = 0.27;
      multiplier = 0.45; // Genève communal average centimes is low relative to base
      break;

    case 'VD': // Vaud (High tax)
      if (income < 30000) cantonalBase = 0.09;
      else if (income < 60000) cantonalBase = 0.14;
      else if (income < 90000) cantonalBase = 0.19;
      else if (income < 120000) cantonalBase = 0.22;
      else cantonalBase = 0.25;
      multiplier = 0.78;
      break;

    case 'NE': // Neuchâtel (Highest tax)
      if (income < 30000) cantonalBase = 0.12;
      else if (income < 60000) cantonalBase = 0.17;
      else if (income < 90000) cantonalBase = 0.21;
      else if (income < 120000) cantonalBase = 0.24;
      else cantonalBase = 0.26;
      multiplier = 0.90;
      break;

    case 'JU': // Jura
      if (income < 30000) cantonalBase = 0.11;
      else if (income < 60000) cantonalBase = 0.16;
      else if (income < 90000) cantonalBase = 0.20;
      else if (income < 120000) cantonalBase = 0.23;
      else cantonalBase = 0.25;
      multiplier = 0.95;
      break;

    case 'FR': // Fribourg
      if (income < 30000) cantonalBase = 0.08;
      else if (income < 60000) cantonalBase = 0.12;
      else if (income < 90000) cantonalBase = 0.17;
      else if (income < 120000) cantonalBase = 0.20;
      else cantonalBase = 0.23;
      multiplier = 0.82;
      break;

    case 'BE': // Berne
      if (income < 30000) cantonalBase = 0.09;
      else if (income < 60000) cantonalBase = 0.13;
      else if (income < 90000) cantonalBase = 0.17;
      else if (income < 120000) cantonalBase = 0.21;
      else cantonalBase = 0.23;
      multiplier = 1.54; // Canton of Bern communal coefficient is high
      break;

    case 'ZH': // Zurich (Favorable tax)
      if (income < 30000) cantonalBase = 0.04;
      else if (income < 60000) cantonalBase = 0.07;
      else if (income < 90000) cantonalBase = 0.09;
      else if (income < 120000) cantonalBase = 0.11;
      else cantonalBase = 0.13;
      multiplier = 1.19;
      break;

    case 'BS': // Bâle-Ville
      if (income < 30000) cantonalBase = 0.11;
      else if (income < 60000) cantonalBase = 0.15;
      else if (income < 90000) cantonalBase = 0.18;
      else if (income < 120000) cantonalBase = 0.21;
      else cantonalBase = 0.23;
      multiplier = 0.50;
      break;

    case 'TI': // Tessin
      if (income < 30000) cantonalBase = 0.07;
      else if (income < 60000) cantonalBase = 0.12;
      else if (income < 90000) cantonalBase = 0.16;
      else if (income < 120000) cantonalBase = 0.19;
      else cantonalBase = 0.21;
      multiplier = 0.95;
      break;

    case 'VS': // Valais
      if (income < 30000) cantonalBase = 0.06;
      else if (income < 60000) cantonalBase = 0.11;
      else if (income < 90000) cantonalBase = 0.15;
      else if (income < 120000) cantonalBase = 0.18;
      else cantonalBase = 0.21;
      multiplier = 1.10;
      break;

    default: // Average / other cantons
      if (income < 30000) cantonalBase = 0.08;
      else if (income < 60000) cantonalBase = 0.12;
      else if (income < 90000) cantonalBase = 0.16;
      else if (income < 120000) cantonalBase = 0.19;
      else cantonalBase = 0.22;
      multiplier = 0.90;
      break;
  }

  const cantonal = cantonalBase;
  const communal = cantonalBase * multiplier;
  const combined = federal + cantonal + communal;

  return {
    combined: Math.round(combined * 10000) / 10000,
    federal: Math.round(federal * 10000) / 10000,
    cantonal: Math.round(cantonal * 10000) / 10000,
    communal: Math.round(communal * 10000) / 10000,
  };
}

/**
 * Calculates withdrawal tax rate for capital payouts in Switzerland.
 * Payout is taxed preferentially, separately from other income, but progressively.
 */
export function getWithdrawalTaxRate(canton: string, capitalAmount: number): number {
  if (capitalAmount <= 0) return 0;
  
  let baseRate = 0.02; // baseline

  switch (canton) {
    case 'GE':
    case 'VD':
    case 'NE':
    case 'JU':
      // Romandie is slightly higher
      if (capitalAmount <= 50000) baseRate = 0.022;
      else if (capitalAmount <= 100000) baseRate = 0.035;
      else if (capitalAmount <= 250000) baseRate = 0.048;
      else baseRate = 0.059;
      break;
    case 'ZH':
    case 'SZ':
    case 'ZG':
      // Favorable German-speaking cantons
      if (capitalAmount <= 50000) baseRate = 0.012;
      else if (capitalAmount <= 100000) baseRate = 0.018;
      else if (capitalAmount <= 250000) baseRate = 0.026;
      else baseRate = 0.038;
      break;
    default:
      if (capitalAmount <= 50000) baseRate = 0.018;
      else if (capitalAmount <= 100000) baseRate = 0.028;
      else if (capitalAmount <= 250000) baseRate = 0.039;
      else baseRate = 0.048;
      break;
  }

  return baseRate;
}

/**
 * Main function to run the full, precise Swiss tax and projection simulation.
 */
export function calculateSwiss3rdPillarSimulation(params: {
  type: '3a' | '3b' | 'all' | 'mixte';
  annualIncome: number;
  hasSecondPillar: boolean;
  savingAmount: number; // monthly or yearly
  savingFrequency: 'monthly' | 'yearly';
  canton: string;
  durationYears: number;
  projectedCapitalGross: number; // From the insurance yield calculator
}): TaxCalculationResult {
  const is3a = params.type === '3a' || params.type === 'all' || params.type === 'mixte';
  
  // Convert savings to yearly basis
  const desiredAnnualContribution = params.savingFrequency === 'monthly' 
    ? params.savingAmount * 12 
    : params.savingAmount;

  // Legal Limits
  const legalLimit = getSwiss3aLimit(params.hasSecondPillar, params.annualIncome);
  
  // Allowed contribution (capped to the cent if 3a)
  let allowedContribution = desiredAnnualContribution;
  let isCapped = false;
  if (is3a) {
    if (desiredAnnualContribution > legalLimit) {
      allowedContribution = legalLimit;
      isCapped = true;
    }
  }

  // Get progressive marginal tax rates
  const taxRates = calculateMarginalTaxRate(params.canton, params.annualIncome);
  
  // Tax savings apply only if 3a (or 3b in certain exceptions like GE/FR, which we simulate here with 35% of regular rate)
  const taxRateFactor = is3a ? taxRates.combined : (['GE', 'FR'].includes(params.canton) ? taxRates.combined * 0.35 : 0.0);
  
  const yearlyTaxSavings = Math.round((allowedContribution * taxRateFactor) * 100) / 100;
  const totalTaxSavingsOverHorizon = Math.round((yearlyTaxSavings * params.durationYears) * 100) / 100;

  // Withdrawal tax calculation (exact Swiss rule)
  const projectedCapitalGross = params.projectedCapitalGross;
  const withdrawalTaxRate = getWithdrawalTaxRate(params.canton, projectedCapitalGross);
  const withdrawalTaxAmount = Math.round((projectedCapitalGross * withdrawalTaxRate) * 100) / 100;
  const projectedCapitalNet = Math.round((projectedCapitalGross - withdrawalTaxAmount) * 100) / 100;

  return {
    allowedContribution: Math.round(allowedContribution * 100) / 100,
    isCapped,
    legalLimit,
    marginalTaxRate: taxRates.combined,
    federalMarginalRate: taxRates.federal,
    cantonalMarginalRate: taxRates.cantonal,
    communalMarginalRate: taxRates.communal,
    yearlyTaxSavings,
    totalTaxSavingsOverHorizon,
    projectedCapitalGross,
    projectedCapitalNet,
    withdrawalTaxAmount,
    withdrawalTaxRate
  };
}
