import { LICENSING_BRACKETS } from "./constants";

/**
 * Calculate progressive licensing fee on annual revenue.
 * Works like US tax brackets — each tier rate applies only to revenue within that band.
 */
export function calculateAnnualLicensingFee(annualRevenue: number): number {
  if (annualRevenue <= 0) return 0;

  let totalFee = 0;

  for (const bracket of LICENSING_BRACKETS) {
    if (annualRevenue <= bracket.min) break;

    const taxableInBracket = Math.min(annualRevenue, bracket.max) - bracket.min;
    totalFee += taxableInBracket * bracket.rate;
  }

  return totalFee;
}

/**
 * Calculate monthly licensing fee based on projected annual run rate.
 * Annual run rate = monthlyRevenue × 12
 * Monthly fee = annual fee / 12
 */
export function calculateMonthlyLicensingFee(monthlyRevenue: number): number {
  const annualRunRate = monthlyRevenue * 12;
  const annualFee = calculateAnnualLicensingFee(annualRunRate);
  return annualFee / 12;
}
