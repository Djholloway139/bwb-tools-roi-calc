"use client";

interface TimelineSelectorProps {
  value: 12 | 18 | 24;
  onChange: (value: 12 | 18 | 24) => void;
}

const OPTIONS: (12 | 18 | 24)[] = [12, 18, 24];

export default function TimelineSelector({
  value,
  onChange,
}: TimelineSelectorProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-bwb-secondary/80">
        Timeline
      </label>
      <div className="flex gap-1 bg-bwb-border/50 rounded-lg p-1">
        {OPTIONS.map((months) => (
          <button
            key={months}
            onClick={() => onChange(months)}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              value === months
                ? "bg-bwb-tertiary text-white shadow-sm"
                : "text-bwb-secondary/70 hover:bg-bwb-bg"
            }`}
            aria-pressed={value === months}
          >
            {months}mo
          </button>
        ))}
      </div>
    </div>
  );
}
