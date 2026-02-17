import { Bracket, CalculatorInputs } from "./types";

export const LICENSING_BRACKETS: Bracket[] = [
  { min: 0, max: 100_000, rate: 0.15 },
  { min: 100_000, max: 250_000, rate: 0.10 },
  { min: 250_000, max: 1_000_000, rate: 0.05 },
  { min: 1_000_000, max: Infinity, rate: 0.025 },
];

export const OPTION1_UPFRONT = 30_000;
export const OPTION2_UPFRONT = 20_000;
export const BWB_EQUITY_SHARE = 0.51;
export const PARTNER_EQUITY_SHARE = 0.49;

export const DEFAULT_INPUTS: CalculatorInputs = {
  numberOfClients: 8,
  averageServicePrice: 150,
  monthlyGrowthRate: 0.10,
  operatingExpenseRatio: 0.45,
  timelineMonths: 24,
};
