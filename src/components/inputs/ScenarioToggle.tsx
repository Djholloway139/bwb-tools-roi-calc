"use client";

import { ScenarioName } from "@/lib/calculations/types";
import { SCENARIOS } from "@/lib/calculations/scenarios";

interface ScenarioToggleProps {
  activeScenario: ScenarioName | null;
  onSelect: (name: ScenarioName) => void;
}

export default function ScenarioToggle({
  activeScenario,
  onSelect,
}: ScenarioToggleProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-bwb-secondary/80">
        Scenario Preset
      </label>
      <div className="flex gap-1 bg-bwb-border/50 rounded-lg p-1">
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario.name}
            onClick={() => onSelect(scenario.name)}
            className={`flex-1 px-2 py-1.5 rounded-md whitespace-nowrap text-xs sm:text-sm font-medium transition-colors ${
              activeScenario === scenario.name
                ? "bg-bwb-tertiary text-white shadow-sm"
                : "text-bwb-secondary/70 hover:bg-bwb-bg"
            }`}
            aria-pressed={activeScenario === scenario.name}
          >
            {scenario.label}
          </button>
        ))}
      </div>
    </div>
  );
}
