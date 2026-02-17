import { CalculatorInputs, Option1Result, Option1Monthly } from "./types";
import { OPTION1_UPFRONT } from "./constants";
import { calculateMonthlyLicensingFee } from "./brackets";
import { generateRevenueProjections } from "./revenue";

/**
 * Calculate Option 1: Partnership-Licensing model.
 * - Upfront: $30,000
 * - Ongoing: progressive licensing fee on projected annual run rate
 * - Partner net = revenue - opex - licensing fee
 * - Break-even = first month cumulative partner net > upfront cost
 */
export function calculateOption1(inputs: CalculatorInputs): Option1Result {
  const baseProjections = generateRevenueProjections(inputs);
  const monthlyProjections: Option1Monthly[] = [];
  let cumulativePartnerNet = 0;
  let breakEvenMonth: number | null = null;
  let totalLicensingFees = 0;

  for (const proj of baseProjections) {
    const annualRunRate = proj.revenue * 12;
    const licensingFee = calculateMonthlyLicensingFee(proj.revenue);
    const partnerNet = proj.revenue - proj.operatingExpenses - licensingFee;
    cumulativePartnerNet += partnerNet;
    totalLicensingFees += licensingFee;

    if (breakEvenMonth === null && cumulativePartnerNet > OPTION1_UPFRONT) {
      breakEvenMonth = proj.month;
    }

    monthlyProjections.push({
      ...proj,
      annualRunRate,
      licensingFee,
      partnerNet,
      cumulativePartnerNet,
    });
  }

  const lastProjection = monthlyProjections[monthlyProjections.length - 1];
  const totalRevenue = lastProjection.cumulativeRevenue;
  const totalProfit = monthlyProjections.reduce((sum, p) => sum + p.profit, 0);
  const roi = (cumulativePartnerNet - OPTION1_UPFRONT) / OPTION1_UPFRONT;

  return {
    upfrontCost: OPTION1_UPFRONT,
    monthlyProjections,
    totalLicensingFees,
    totalPartnerNet: cumulativePartnerNet,
    totalRevenue,
    totalProfit,
    roi,
    breakEvenMonth,
  };
}
