import { ScenarioPreset } from "./types";

export const SCENARIOS: ScenarioPreset[] = [
  {
    name: "conservative",
    label: "Conservative",
    monthlyGrowthRate: 0.05,
    operatingExpenseRatio: 0.60,
  },
  {
    name: "moderate",
    label: "Moderate",
    monthlyGrowthRate: 0.10,
    operatingExpenseRatio: 0.45,
  },
  {
    name: "aggressive",
    label: "Aggressive",
    monthlyGrowthRate: 0.15,
    operatingExpenseRatio: 0.30,
  },
];
