"use client";

import { useState, useMemo } from "react";
import { CalculatorInputs, ScenarioName } from "@/lib/calculations/types";
import { DEFAULT_INPUTS } from "@/lib/calculations/constants";
import { SCENARIOS } from "@/lib/calculations/scenarios";
import { calculateOption1 } from "@/lib/calculations/option1";
import { calculateOption2 } from "@/lib/calculations/option2";
import { useDebounce } from "./useDebounce";

export function useCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [activeScenario, setActiveScenario] = useState<ScenarioName | null>(
    "moderate"
  );

  const debouncedInputs = useDebounce(inputs);

  const option1 = useMemo(
    () => calculateOption1(debouncedInputs),
    [debouncedInputs]
  );
  const option2 = useMemo(
    () => calculateOption2(debouncedInputs),
    [debouncedInputs]
  );

  const updateInput = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    // Clear active scenario when user manually adjusts growth or opex
    if (key === "monthlyGrowthRate" || key === "operatingExpenseRatio") {
      setActiveScenario(null);
    }
  };

  const applyScenario = (name: ScenarioName) => {
    const scenario = SCENARIOS.find((s) => s.name === name);
    if (scenario) {
      setInputs((prev) => ({
        ...prev,
        monthlyGrowthRate: scenario.monthlyGrowthRate,
        operatingExpenseRatio: scenario.operatingExpenseRatio,
      }));
      setActiveScenario(name);
    }
  };

  return {
    inputs,
    updateInput,
    activeScenario,
    applyScenario,
    option1,
    option2,
  };
}
