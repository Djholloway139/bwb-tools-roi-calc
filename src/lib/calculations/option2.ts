import { CalculatorInputs, Option2Result, Option2Monthly } from "./types";
import {
  OPTION2_UPFRONT,
  BWB_EQUITY_SHARE,
  PARTNER_EQUITY_SHARE,
} from "./constants";
import { generateRevenueProjections } from "./revenue";

/**
 * Calculate Option 2: True Partnership LLC (49% equity).
 * - Upfront: $20,000
 * - Profit split: BWB 51%, Partner 49%
 * - Break-even = first month cumulative partner distributions > upfront cost
 */
export function calculateOption2(inputs: CalculatorInputs): Option2Result {
  const baseProjections = generateRevenueProjections(inputs);
  const monthlyProjections: Option2Monthly[] = [];
  let cumulativePartnerDistribution = 0;
  let breakEvenMonth: number | null = null;
  let totalBwbDistributions = 0;
  let totalPartnerDistributions = 0;

  for (const proj of baseProjections) {
    const bwbDistribution = proj.profit * BWB_EQUITY_SHARE;
    const partnerDistribution = proj.profit * PARTNER_EQUITY_SHARE;
    cumulativePartnerDistribution += partnerDistribution;
    totalBwbDistributions += bwbDistribution;
    totalPartnerDistributions += partnerDistribution;

    if (
      breakEvenMonth === null &&
      cumulativePartnerDistribution > OPTION2_UPFRONT
    ) {
      breakEvenMonth = proj.month;
    }

    monthlyProjections.push({
      ...proj,
      bwbDistribution,
      partnerDistribution,
      cumulativePartnerDistribution,
    });
  }

  const lastProjection = monthlyProjections[monthlyProjections.length - 1];
  const totalRevenue = lastProjection.cumulativeRevenue;
  const totalProfit = monthlyProjections.reduce((sum, p) => sum + p.profit, 0);
  const roi = (totalPartnerDistributions - OPTION2_UPFRONT) / OPTION2_UPFRONT;

  return {
    upfrontCost: OPTION2_UPFRONT,
    monthlyProjections,
    totalBwbDistributions,
    totalPartnerDistributions,
    totalRevenue,
    totalProfit,
    roi,
    breakEvenMonth,
  };
}
