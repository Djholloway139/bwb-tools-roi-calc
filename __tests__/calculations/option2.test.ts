import { calculateOption2 } from "@/lib/calculations/option2";
import { CalculatorInputs } from "@/lib/calculations/types";

const baseInputs: CalculatorInputs = {
  numberOfClients: 8,
  averageServicePrice: 150,
  monthlyGrowthRate: 0.10,
  operatingExpenseRatio: 0.45,
  timelineMonths: 24,
};

describe("calculateOption2", () => {
  it("upfront cost is always $20,000", () => {
    const result = calculateOption2(baseInputs);
    expect(result.upfrontCost).toBe(20_000);
  });

  it("generates correct number of monthly projections", () => {
    const result = calculateOption2(baseInputs);
    expect(result.monthlyProjections).toHaveLength(24);
  });

  it("partner gets 49% of profit", () => {
    const result = calculateOption2(baseInputs);
    for (const proj of result.monthlyProjections) {
      expect(proj.partnerDistribution).toBeCloseTo(proj.profit * 0.49, 2);
    }
  });

  it("BWB gets 51% of profit", () => {
    const result = calculateOption2(baseInputs);
    for (const proj of result.monthlyProjections) {
      expect(proj.bwbDistribution).toBeCloseTo(proj.profit * 0.51, 2);
    }
  });

  it("distributions sum to total profit", () => {
    const result = calculateOption2(baseInputs);
    for (const proj of result.monthlyProjections) {
      const totalDist = proj.bwbDistribution + proj.partnerDistribution;
      expect(totalDist).toBeCloseTo(proj.profit, 2);
    }
  });

  it("cumulative partner distributions accumulate correctly", () => {
    const result = calculateOption2(baseInputs);
    let cumulative = 0;
    for (const proj of result.monthlyProjections) {
      cumulative += proj.partnerDistribution;
      expect(proj.cumulativePartnerDistribution).toBeCloseTo(cumulative, 2);
    }
  });

  it("total distributions equal sum of monthly distributions", () => {
    const result = calculateOption2(baseInputs);
    const partnerSum = result.monthlyProjections.reduce(
      (acc, p) => acc + p.partnerDistribution,
      0
    );
    const bwbSum = result.monthlyProjections.reduce(
      (acc, p) => acc + p.bwbDistribution,
      0
    );
    expect(result.totalPartnerDistributions).toBeCloseTo(partnerSum, 2);
    expect(result.totalBwbDistributions).toBeCloseTo(bwbSum, 2);
  });

  it("break-even month is when cumulative distributions exceed upfront", () => {
    const result = calculateOption2(baseInputs);
    if (result.breakEvenMonth !== null) {
      const beMonth = result.monthlyProjections[result.breakEvenMonth - 1];
      expect(beMonth.cumulativePartnerDistribution).toBeGreaterThan(20_000);
      if (result.breakEvenMonth > 1) {
        const prevMonth =
          result.monthlyProjections[result.breakEvenMonth - 2];
        expect(prevMonth.cumulativePartnerDistribution).toBeLessThanOrEqual(
          20_000
        );
      }
    }
  });

  it("returns totalRevenue equal to cumulative revenue", () => {
    const result = calculateOption2(baseInputs);
    const lastMonth = result.monthlyProjections[result.monthlyProjections.length - 1];
    expect(result.totalRevenue).toBe(lastMonth.cumulativeRevenue);
  });

  it("returns totalProfit equal to sum of monthly profits", () => {
    const result = calculateOption2(baseInputs);
    const sum = result.monthlyProjections.reduce((acc, p) => acc + p.profit, 0);
    expect(result.totalProfit).toBeCloseTo(sum, 2);
  });

  it("returns ROI as (totalPartnerDistributions - upfront) / upfront", () => {
    const result = calculateOption2(baseInputs);
    const expectedRoi = (result.totalPartnerDistributions - 20_000) / 20_000;
    expect(result.roi).toBeCloseTo(expectedRoi, 6);
  });

  it("ROI is positive over 24 months with moderate growth", () => {
    const result = calculateOption2(baseInputs);
    expect(result.roi).toBeGreaterThan(0);
  });
});
