"use client";

import { ResponsiveContainer } from "recharts";

interface ChartWrapperProps {
  title: string;
  children: React.ReactElement;
  height?: number;
}

export default function ChartWrapper({
  title,
  children,
  height = 300,
}: ChartWrapperProps) {
  return (
    <div className="bg-white rounded-xl border border-bwb-border p-4 sm:p-5">
      <h4 className="text-sm font-normal text-bwb-secondary mb-3">{title}</h4>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
