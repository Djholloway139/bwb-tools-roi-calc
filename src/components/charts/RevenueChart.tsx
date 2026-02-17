"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Option1Result } from "@/lib/calculations/types";
import { formatCurrency } from "@/lib/formatters";
import ChartWrapper from "./ChartWrapper";

interface RevenueChartProps {
  option1: Option1Result;
}

export default function RevenueChart({ option1 }: RevenueChartProps) {
  const data = option1.monthlyProjections.map((p) => ({
    month: `Mo ${p.month}`,
    revenue: Math.round(p.revenue),
  }));

  return (
    <ChartWrapper title="Monthly Revenue Projection">
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
          formatter={(value: number | undefined) => [formatCurrency(value ?? 0), "Revenue"]}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#0A0706"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#0A0706" }}
        />
      </LineChart>
    </ChartWrapper>
  );
}
