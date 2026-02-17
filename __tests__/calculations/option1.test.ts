import { calculateOption1 } from "@/lib/calculations/option1";
import { CalculatorInputs } from "@/lib/calculations/types";

const baseInputs: CalculatorInputs = {
  numberOfClients: 8,
  averageServicePrice: 150,
  monthlyGrowthRate: 0.10,
  operatingExpenseRatio: 0.45,
  timelineMonths: 24,
};

describe("calculateOption1", () => {
  it("upfront cost is always $30,000", () => {
    const result = calculateOption1(baseInputs);
    expect(result.upfrontCost).toBe(30_000);
  });

  it("generates correct number of monthly projections", () => {
    const result = calculateOption1(baseInputs);
    expect(result.monthlyProjections).toHaveLength(24);
  });

  it("monthly licensing fees match bracket calculations", () => {
    const result = calculateOption1(baseInputs);
    const month1 = result.monthlyProjections[0];
    // Month 1 revenue: 8 × $150 = $1,200, annual run rate: $14,400
    // All in tier 1: 15% × $14,400 = $2,160 annual, $180/month
    expect(month1.annualRunRate).toBe(14_400);
    expect(month1.licensingFee).toBeCloseTo(180, 2);
  });

  it("partner net = revenue - opex - licensing fee", () => {
    const result = calculateOption1(baseInputs);
    for (const proj of result.monthlyProjections) {
      const expected = proj.revenue - proj.operatingExpenses - proj.licensingFee;
      expect(proj.partnerNet).toBeCloseTo(expected, 2);
    }
  });

  it("cumulative partner net accumulates correctly", () => {
    const result = calculateOption1(baseInputs);
    let cumulative = 0;
    for (const proj of result.monthlyProjections) {
      cumulative += proj.partnerNet;
      expect(proj.cumulativePartnerNet).toBeCloseTo(cumulative, 2);
    }
  });

  it("total licensing fees equals sum of monthly fees", () => {
    const result = calculateOption1(baseInputs);
    const sum = result.monthlyProjections.reduce(
      (acc, p) => acc + p.licensingFee,
      0
    );
    expect(result.totalLicensingFees).toBeCloseTo(sum, 2);
  });

  it("break-even month is when cumulative net exceeds upfront", () => {
    const result = calculateOption1(baseInputs);
    if (result.breakEvenMonth !== null) {
      const beMonth = result.monthlyProjections[result.breakEvenMonth - 1];
      expect(beMonth.cumulativePartnerNet).toBeGreaterThan(30_000);
      if (result.breakEvenMonth > 1) {
        const prevMonth =
          result.monthlyProjections[result.breakEvenMonth - 2];
        expect(prevMonth.cumulativePartnerNet).toBeLessThanOrEqual(30_000);
      }
    }
  });

  it("returns totalRevenue equal to cumulative revenue", () => {
    const result = calculateOption1(baseInputs);
    const lastMonth = result.monthlyProjections[result.monthlyProjections.length - 1];
    expect(result.totalRevenue).toBe(lastMonth.cumulativeRevenue);
  });

  it("returns totalProfit equal to sum of monthly profits", () => {
    const result = calculateOption1(baseInputs);
    const sum = result.monthlyProjections.reduce((acc, p) => acc + p.profit, 0);
    expect(result.totalProfit).toBeCloseTo(sum, 2);
  });

  it("returns ROI as (totalPartnerNet - upfront) / upfront", () => {
    const result = calculateOption1(baseInputs);
    const expectedRoi = (result.totalPartnerNet - 30_000) / 30_000;
    expect(result.roi).toBeCloseTo(expectedRoi, 6);
  });

  it("ROI is positive over 24 months with moderate growth", () => {
    const result = calculateOption1(baseInputs);
    expect(result.roi).toBeGreaterThan(0);
  });
});
