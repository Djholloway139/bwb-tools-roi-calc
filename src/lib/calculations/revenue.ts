import { CalculatorInputs, MonthlyProjection } from "./types";

/**
 * Generate monthly revenue projections with compound growth.
 */
export function generateRevenueProjections(
  inputs: CalculatorInputs
): MonthlyProjection[] {
  const projections: MonthlyProjection[] = [];
  let cumulativeRevenue = 0;

  const startingMonthlyRevenue = inputs.numberOfClients * inputs.averageServicePrice;

  for (let month = 1; month <= inputs.timelineMonths; month++) {
    const revenue =
      startingMonthlyRevenue *
      Math.pow(1 + inputs.monthlyGrowthRate, month - 1);
    cumulativeRevenue += revenue;
    const operatingExpenses = revenue * inputs.operatingExpenseRatio;
    const profit = revenue - operatingExpenses;

    projections.push({
      month,
      revenue,
      cumulativeRevenue,
      operatingExpenses,
      profit,
    });
  }

  return projections;
}
