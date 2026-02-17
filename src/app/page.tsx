"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import InputPanel from "@/components/inputs/InputPanel";
import ComparisonGrid from "@/components/comparison/ComparisonGrid";
import RevenueChart from "@/components/charts/RevenueChart";
import CumulativeChart from "@/components/charts/CumulativeChart";
import NetTakeHomeChart from "@/components/charts/NetTakeHomeChart";
import FeeComparisonChart from "@/components/charts/FeeComparisonChart";
import { useCalculator } from "@/lib/hooks/useCalculator";

export default function Home() {
  const {
    inputs,
    updateInput,
    activeScenario,
    applyScenario,
    option1,
    option2,
  } = useCalculator();

  return (
    <DashboardShell>
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-bwb-tertiary mb-2">
          Bozeman Expansion Deal Comparison
        </h2>
        <p className="text-bwb-secondary/60 text-sm sm:text-base">
          Compare two partnership structures side-by-side with interactive
          financial projections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-6">
          <InputPanel
            inputs={inputs}
            activeScenario={activeScenario}
            onUpdateInput={updateInput}
            onApplyScenario={applyScenario}
          />
        </div>

        <div className="space-y-6">
          <ComparisonGrid option1={option1} option2={option2} />

          <RevenueChart option1={option1} />
          <CumulativeChart option1={option1} option2={option2} />
          <NetTakeHomeChart option1={option1} option2={option2} />
          <FeeComparisonChart option1={option1} option2={option2} />
        </div>
      </div>
    </DashboardShell>
  );
}
