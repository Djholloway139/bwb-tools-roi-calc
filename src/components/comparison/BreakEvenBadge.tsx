interface BreakEvenBadgeProps {
  month: number | null;
}

export default function BreakEvenBadge({ month }: BreakEvenBadgeProps) {
  if (month === null) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Not reached
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      Month {month}
    </span>
  );
}
