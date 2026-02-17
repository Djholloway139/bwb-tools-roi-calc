"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Option1Result, Option2Result } from "@/lib/calculations/types";
import { formatCurrency } from "@/lib/formatters";
import ChartWrapper from "./ChartWrapper";

interface NetTakeHomeChartProps {
  option1: Option1Result;
  option2: Option2Result;
}

export default function NetTakeHomeChart({
  option1,
  option2,
}: NetTakeHomeChartProps) {
  const data = option1.monthlyProjections.map((p, i) => ({
    month: `Mo ${p.month}`,
    option1: Math.round(p.partnerNet),
    option2: Math.round(option2.monthlyProjections[i].partnerDistribution),
  }));

  return (
    <ChartWrapper title="Monthly Partner Take-Home" height={300}>
      <BarChart data={data}>
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
        <Bar dataKey="option1" fill="#4F0115" radius={[2, 2, 0, 0]} />
        <Bar dataKey="option2" fill="#C0B3A6" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ChartWrapper>
  );
}
