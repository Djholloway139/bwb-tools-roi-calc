"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";
import { Option1Result, Option2Result } from "@/lib/calculations/types";
import { formatCurrency } from "@/lib/formatters";
import ChartWrapper from "./ChartWrapper";

interface CumulativeChartProps {
  option1: Option1Result;
  option2: Option2Result;
}

export default function CumulativeChart({
  option1,
  option2,
}: CumulativeChartProps) {
  const data = option1.monthlyProjections.map((p, i) => ({
    month: `Mo ${p.month}`,
    option1: Math.round(p.cumulativePartnerNet),
    option2: Math.round(
      option2.monthlyProjections[i].cumulativePartnerDistribution
    ),
  }));

  // Find crossover month
  let crossoverMonth: number | null = null;
  for (let i = 1; i < data.length; i++) {
    const prevDiff = data[i - 1].option1 - data[i - 1].option2;
    const currDiff = data[i].option1 - data[i].option2;
    if (prevDiff * currDiff < 0) {
      crossoverMonth = i + 1;
      break;
    }
  }

  return (
    <ChartWrapper title="Cumulative Partner Net Income" height={320}>
      <AreaChart data={data}>
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
            name === "option1" ? "Licensing" : "Partnership",
          ]}
        />
        <Legend
          formatter={(value) =>
            value === "option1" ? "Option 1: Licensing" : "Option 2: Partnership"
          }
        />
        <Area
          type="monotone"
          dataKey="option1"
          stroke="#4F0115"
          fill="#4F0115"
          fillOpacity={0.1}
          strokeWidth={2}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="option2"
          stroke="#C0B3A6"
          fill="#C0B3A6"
          fillOpacity={0.1}
          strokeWidth={2}
          dot={false}
        />
        {crossoverMonth && (
          <ReferenceLine
            x={`Mo ${crossoverMonth}`}
            stroke="#0A0706"
            strokeDasharray="4 4"
            label={{
              value: "Crossover",
              position: "top",
              fontSize: 11,
              fill: "#0A0706",
            }}
          />
        )}
      </AreaChart>
    </ChartWrapper>
  );
}
