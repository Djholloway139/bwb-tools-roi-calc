"use client";

import { CalculatorInputs, ScenarioName } from "@/lib/calculations/types";
import { formatCurrency } from "@/lib/formatters";
import SliderInput from "./SliderInput";
import ScenarioToggle from "./ScenarioToggle";
import TimelineSelector from "./TimelineSelector";

interface InputPanelProps {
  inputs: CalculatorInputs;
  activeScenario: ScenarioName | null;
  onUpdateInput: <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => void;
  onApplyScenario: (name: ScenarioName) => void;
}

export default function InputPanel({
  inputs,
  activeScenario,
  onUpdateInput,
  onApplyScenario,
}: InputPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-bwb-border p-5 space-y-5">
      <h3 className="text-lg font-bold text-bwb-secondary">
        Assumptions
      </h3>

      <ScenarioToggle
        activeScenario={activeScenario}
        onSelect={onApplyScenario}
      />

      <TimelineSelector
        value={inputs.timelineMonths}
        onChange={(v) => onUpdateInput("timelineMonths", v)}
      />

      <SliderInput
        label="Number of Clients"
        value={inputs.numberOfClients}
        min={1}
        max={100}
        step={1}
        onChange={(v) => onUpdateInput("numberOfClients", v)}
      />

      <SliderInput
        label="Average Client Spend (per month)"
        value={inputs.averageServicePrice}
        min={50}
        max={1000}
        step={10}
        onChange={(v) => onUpdateInput("averageServicePrice", v)}
        formatValue={(v) => formatCurrency(v)}
      />

      <div className="bg-bwb-background rounded-lg px-4 py-3 text-center">
        <p className="text-xs text-bwb-secondary/60 mb-1">Starting Monthly Revenue</p>
        <p className="text-lg font-bold text-bwb-tertiary tabular-nums">
          {inputs.numberOfClients} clients × {formatCurrency(inputs.averageServicePrice)} ={" "}
          {formatCurrency(inputs.numberOfClients * inputs.averageServicePrice)}/mo
        </p>
      </div>

      <SliderInput
        label="Monthly Growth Rate"
        value={inputs.monthlyGrowthRate}
        min={0}
        max={0.25}
        step={0.01}
        onChange={(v) => onUpdateInput("monthlyGrowthRate", v)}
        formatValue={(v) => `${(v * 100).toFixed(0)}%`}
      />

      <SliderInput
        label="Operating Expense Ratio"
        value={inputs.operatingExpenseRatio}
        min={0.1}
        max={0.8}
        step={0.05}
        onChange={(v) => onUpdateInput("operatingExpenseRatio", v)}
        formatValue={(v) => `${(v * 100).toFixed(0)}%`}
      />
    </div>
  );
}
