import { calculateOption1 } from "@/lib/calculations/option1";
import { calculateOption2 } from "@/lib/calculations/option2";
import { CalculatorInputs } from "@/lib/calculations/types";

/**
 * Golden integration test: hand-verified scenario with known expected outputs.
 *
 * Inputs: 8 clients × $150 = $1,200/mo starting, 10% growth, 45% opex, 24 months
 *
 * Month 1: Revenue = $1,200
 *   OpEx = $540
 *   Profit = $660
 *   Option 1: Annual run rate = $14,400, annual fee = $2,160, monthly fee = $180
 *     Partner net = $1,200 - $540 - $180 = $480
 *   Option 2: Partner (49%) = $323.40, BWB (51%) = $336.60
 *
 * Month 2: Revenue = $1,320 (1,200 × 1.10)
 *   OpEx = $594
 *   Profit = $726
 *   Option 1: Annual run rate = $15,840, annual fee = $2,376, monthly fee = $198
 *     Partner net = $1,320 - $594 - $198 = $528
 *   Option 2: Partner (49%) = $355.74, BWB (51%) = $370.26
 */
describe("Golden integration test", () => {
  const inputs: CalculatorInputs = {
    numberOfClients: 8,
    averageServicePrice: 150,
    monthlyGrowthRate: 0.10,
    operatingExpenseRatio: 0.45,
    timelineMonths: 24,
  };

  it("Option 1 month 1 values are correct", () => {
    const result = calculateOption1(inputs);
    const m1 = result.monthlyProjections[0];

    expect(m1.revenue).toBe(1_200);
    expect(m1.operatingExpenses).toBeCloseTo(540, 2);
    expect(m1.annualRunRate).toBe(14_400);
    expect(m1.licensingFee).toBeCloseTo(180, 2);
    expect(m1.partnerNet).toBeCloseTo(480, 2);
  });

  it("Option 1 month 2 values are correct", () => {
    const result = calculateOption1(inputs);
    const m2 = result.monthlyProjections[1];

    expect(m2.revenue).toBeCloseTo(1_320, 2);
    expect(m2.operatingExpenses).toBeCloseTo(594, 2);
    expect(m2.annualRunRate).toBeCloseTo(15_840, 2);
    expect(m2.licensingFee).toBeCloseTo(198, 2);
    expect(m2.partnerNet).toBeCloseTo(528, 2);
  });

  it("Option 2 month 1 values are correct", () => {
    const result = calculateOption2(inputs);
    const m1 = result.monthlyProjections[0];

    expect(m1.revenue).toBe(1_200);
    expect(m1.profit).toBeCloseTo(660, 2);
    expect(m1.partnerDistribution).toBeCloseTo(323.4, 2);
    expect(m1.bwbDistribution).toBeCloseTo(336.6, 2);
  });

  it("Option 2 month 2 values are correct", () => {
    const result = calculateOption2(inputs);
    const m2 = result.monthlyProjections[1];

    expect(m2.revenue).toBeCloseTo(1_320, 2);
    expect(m2.profit).toBeCloseTo(726, 2);
    expect(m2.partnerDistribution).toBeCloseTo(355.74, 2);
    expect(m2.bwbDistribution).toBeCloseTo(370.26, 2);
  });

  it("Option 1 has higher upfront but potentially more income", () => {
    const o1 = calculateOption1(inputs);
    const o2 = calculateOption2(inputs);

    expect(o1.upfrontCost).toBeGreaterThan(o2.upfrontCost);
    // With moderate growth and 45% opex, Option 1 partner net should exceed Option 2
    expect(o1.totalPartnerNet).toBeGreaterThan(o2.totalPartnerDistributions);
  });

  it("both options have valid break-even months within 24 months", () => {
    const o1 = calculateOption1(inputs);
    const o2 = calculateOption2(inputs);

    expect(o1.breakEvenMonth).not.toBeNull();
    expect(o2.breakEvenMonth).not.toBeNull();
    expect(o1.breakEvenMonth!).toBeGreaterThan(0);
    expect(o1.breakEvenMonth!).toBeLessThanOrEqual(24);
    expect(o2.breakEvenMonth!).toBeGreaterThan(0);
    expect(o2.breakEvenMonth!).toBeLessThanOrEqual(24);
  });

  it("both options report positive ROI over 24 months", () => {
    const o1 = calculateOption1(inputs);
    const o2 = calculateOption2(inputs);

    expect(o1.roi).toBeGreaterThan(0);
    expect(o2.roi).toBeGreaterThan(0);
    expect(o1.totalRevenue).toBeGreaterThan(0);
    expect(o1.totalProfit).toBeGreaterThan(0);
    expect(o2.totalRevenue).toBeGreaterThan(0);
    expect(o2.totalProfit).toBeGreaterThan(0);
  });
});
