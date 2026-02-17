import {
  calculateAnnualLicensingFee,
  calculateMonthlyLicensingFee,
} from "@/lib/calculations/brackets";

describe("calculateAnnualLicensingFee", () => {
  it("returns 0 for $0 revenue", () => {
    expect(calculateAnnualLicensingFee(0)).toBe(0);
  });

  it("returns 0 for negative revenue", () => {
    expect(calculateAnnualLicensingFee(-10000)).toBe(0);
  });

  it("calculates correctly within tier 1 ($50K)", () => {
    // 15% of $50K = $7,500
    expect(calculateAnnualLicensingFee(50_000)).toBe(7_500);
  });

  it("calculates correctly at tier 1 boundary ($100K)", () => {
    // 15% of $100K = $15,000
    expect(calculateAnnualLicensingFee(100_000)).toBe(15_000);
  });

  it("calculates correctly in tier 2 ($175K)", () => {
    // 15% × $100K + 10% × $75K = $15,000 + $7,500 = $22,500
    expect(calculateAnnualLicensingFee(175_000)).toBe(22_500);
  });

  it("calculates correctly at tier 2 boundary ($250K)", () => {
    // 15% × $100K + 10% × $150K = $15,000 + $15,000 = $30,000
    expect(calculateAnnualLicensingFee(250_000)).toBe(30_000);
  });

  it("calculates correctly in tier 3 ($300K — PRD example)", () => {
    // 15% × $100K + 10% × $150K + 5% × $50K = $15,000 + $15,000 + $2,500 = $32,500
    expect(calculateAnnualLicensingFee(300_000)).toBe(32_500);
  });

  it("calculates correctly at tier 3 boundary ($1M)", () => {
    // 15% × $100K + 10% × $150K + 5% × $750K = $15,000 + $15,000 + $37,500 = $67,500
    expect(calculateAnnualLicensingFee(1_000_000)).toBe(67_500);
  });

  it("calculates correctly in tier 4 ($2M)", () => {
    // $67,500 (first $1M) + 2.5% × $1M = $67,500 + $25,000 = $92,500
    expect(calculateAnnualLicensingFee(2_000_000)).toBe(92_500);
  });
});

describe("calculateMonthlyLicensingFee", () => {
  it("returns 0 for $0 monthly revenue", () => {
    expect(calculateMonthlyLicensingFee(0)).toBe(0);
  });

  it("calculates monthly fee from annual run rate", () => {
    // $25K/mo → $300K annual run rate
    // Annual fee = $32,500, monthly = $32,500/12 ≈ $2,708.33
    const fee = calculateMonthlyLicensingFee(25_000);
    expect(fee).toBeCloseTo(32_500 / 12, 2);
  });
});
