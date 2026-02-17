"use client";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
}: SliderInputProps) {
  const displayValue = formatValue ? formatValue(value) : String(value);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-bwb-secondary/80">
          {label}
        </label>
        <span className="text-sm font-semibold text-bwb-tertiary tabular-nums">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer accent-bwb-tertiary"
        style={{
          background: `linear-gradient(to right, #4F0115 0%, #4F0115 ${percentage}%, #D9CFC4 ${percentage}%, #D9CFC4 100%)`,
        }}
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-bwb-secondary/40">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}
