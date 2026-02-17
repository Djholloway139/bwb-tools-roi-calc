export interface Bracket {
  min: number;
  max: number; // Infinity for last tier
  rate: number;
}

export interface CalculatorInputs {
  numberOfClients: number;
  averageServicePrice: number;
  monthlyGrowthRate: number; // decimal, e.g. 0.10 for 10%
  operatingExpenseRatio: number; // decimal, e.g. 0.45 for 45%
  timelineMonths: 12 | 18 | 24;
}

export interface MonthlyProjection {
  month: number;
  revenue: number;
  cumulativeRevenue: number;
  operatingExpenses: number;
  profit: number;
}

export interface Option1Monthly extends MonthlyProjection {
  annualRunRate: number;
  licensingFee: number;
  partnerNet: number;
  cumulativePartnerNet: number;
}

export interface Option2Monthly extends MonthlyProjection {
  bwbDistribution: number; // 51%
  partnerDistribution: number; // 49%
  cumulativePartnerDistribution: number;
}

export interface Option1Result {
  upfrontCost: number;
  monthlyProjections: Option1Monthly[];
  totalLicensingFees: number;
  totalPartnerNet: number;
  totalRevenue: number;
  totalProfit: number;
  roi: number; // (totalPartnerNet - upfrontCost) / upfrontCost
  breakEvenMonth: number | null; // null if never breaks even
}

export interface Option2Result {
  upfrontCost: number;
  monthlyProjections: Option2Monthly[];
  totalBwbDistributions: number;
  totalPartnerDistributions: number;
  totalRevenue: number;
  totalProfit: number;
  roi: number; // (totalPartnerDistributions - upfrontCost) / upfrontCost
  breakEvenMonth: number | null;
}

export type ScenarioName = "conservative" | "moderate" | "aggressive";

export interface ScenarioPreset {
  name: ScenarioName;
  label: string;
  monthlyGrowthRate: number;
  operatingExpenseRatio: number;
}
