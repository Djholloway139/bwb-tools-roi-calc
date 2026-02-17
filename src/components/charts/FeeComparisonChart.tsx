"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Option1Result, Option2Result } from "@/lib/calculations/types";
import { formatCurrency } from "@/lib/formatters";
import ChartWrapper from "./ChartWrapper";

interface FeeComparisonChartProps {
  option1: Option1Result;
  option2: Option2Result;
}

export default function FeeComparisonChart({
  option1,
  option2,
}: FeeComparisonChartProps) {
  let cumFees = 0;
  let cumDistributions = 0;

  const data = option1.monthlyProjections.map((p, i) => {
    cumFees += p.licensingFee;
    cumDistributions += option2.monthlyProjections[i].bwbDistribution;
    return {
      month: `Mo ${p.month}`,
      licensingFees: Math.round(cumFees),
      bwbDistributions: Math.round(cumDistributions),
    };
  });

  return (
    <ChartWrapper title="Cumulative BWB Revenue by Option" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D9CFC4" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#0A0706" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#0A0706" }}
          tickFormatter={(v) => formatCurrency(v)}
          tickLine={false}
          width={70}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0A0706",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: 12,
          }}
          itemStyle={{ color: "white" }}
          labelStyle={{ color: "white" }}
          formatter={(value: number | undefined, name: string | undefined) => [
            formatCurrency(value ?? 0),
            name === "licensingFees" ? "Licensing Fees" : "BWB Distributions",
          ]}
        />
        <Legend
          formatter={(value) =>
            value === "licensingFees"
              ? "Option 1: Licensing Fees"
              : "Option 2: BWB Distributions"
          }
        />
        <Line
          type="monotone"
          dataKey="licensingFees"
          stroke="#4F0115"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="bwbDistributions"
          stroke="#C0B3A6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartWrapper>
  );
}
