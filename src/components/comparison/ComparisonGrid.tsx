import { Option1Result, Option2Result } from "@/lib/calculations/types";
import OptionCard from "./OptionCard";

interface ComparisonGridProps {
  option1: Option1Result;
  option2: Option2Result;
}

export default function ComparisonGrid({
  option1,
  option2,
}: ComparisonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <OptionCard option={1} result={option1} />
      <OptionCard option={2} result={option2} />
    </div>
  );
}
