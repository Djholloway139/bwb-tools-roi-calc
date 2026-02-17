import { generateRevenueProjections } from "@/lib/calculations/revenue";
import { CalculatorInputs } from "@/lib/calculations/types";

const baseInputs: CalculatorInputs = {
  numberOfClients: 8,
  averageServicePrice: 150,
  monthlyGrowthRate: 0.10,
  operatingExpenseRatio: 0.45,
  timelineMonths: 12,
};

describe("generateRevenueProjections", () => {
  it("generates correct number of months", () => {
    const result = generateRevenueProjections(baseInputs);
    expect(result).toHaveLength(12);
  });

  it("first month revenue equals numberOfClients × averageServicePrice", () => {
    const result = generateRevenueProjections(baseInputs);
    // 8 × $150 = $1,200
    expect(result[0].revenue).toBe(1_200);
  });

  it("applies compound growth correctly", () => {
    const result = generateRevenueProjections(baseInputs);
    // Month 2: $1,200 × 1.10 = $1,320
    expect(result[1].revenue).toBeCloseTo(1_320, 2);
    // Month 3: $1,200 × 1.10² = $1,452
    expect(result[2].revenue).toBeCloseTo(1_452, 2);
  });

  it("calculates cumulative revenue correctly", () => {
    const result = generateRevenueProjections(baseInputs);
    let sum = 0;
    for (const proj of result) {
      sum += proj.revenue;
      expect(proj.cumulativeRevenue).toBeCloseTo(sum, 2);
    }
  });

  it("calculates operating expenses as ratio of revenue", () => {
    const result = generateRevenueProjections(baseInputs);
    expect(result[0].operatingExpenses).toBe(540); // 1200 × 0.45
  });

  it("calculates profit as revenue minus opex", () => {
    const result = generateRevenueProjections(baseInputs);
    expect(result[0].profit).toBe(660); // 1200 - 540
  });

  it("produces flat line with 0% growth", () => {
    const result = generateRevenueProjections({
      ...baseInputs,
      monthlyGrowthRate: 0,
    });
    for (const proj of result) {
      expect(proj.revenue).toBe(1_200);
    }
  });

  it("handles 24-month timeline", () => {
    const result = generateRevenueProjections({
      ...baseInputs,
      timelineMonths: 24,
    });
    expect(result).toHaveLength(24);
  });

  it("changing clients changes starting revenue", () => {
    const result = generateRevenueProjections({
      ...baseInputs,
      numberOfClients: 10,
    });
    // 10 × $150 = $1,500
    expect(result[0].revenue).toBe(1_500);
  });

  it("changing price changes starting revenue", () => {
    const result = generateRevenueProjections({
      ...baseInputs,
      averageServicePrice: 200,
    });
    // 8 × $200 = $1,600
    expect(result[0].revenue).toBe(1_600);
  });
});
