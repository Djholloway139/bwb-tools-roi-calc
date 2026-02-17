import { LICENSING_BRACKETS } from "@/lib/calculations/constants";
import { formatCurrency } from "@/lib/formatters";

interface FeeBreakdownProps {
  annualRunRate: number;
}

export default function FeeBreakdown({ annualRunRate }: FeeBreakdownProps) {
  const tiers = LICENSING_BRACKETS.map((bracket) => {
    if (annualRunRate <= bracket.min) {
      return { ...bracket, taxable: 0, fee: 0 };
    }
    const taxable = Math.min(annualRunRate, bracket.max) - bracket.min;
    return { ...bracket, taxable, fee: taxable * bracket.rate };
  });

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-bwb-secondary/60 uppercase tracking-wider">
        Licensing Tier Breakdown
      </p>
      <div className="space-y-1">
        {tiers.map((tier, i) => {
          const maxLabel =
            tier.max === Infinity ? "+" : `–${formatCurrency(tier.max)}`;
          return (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div
                className="h-2 rounded-full bg-bwb-tertiary/20 flex-1 min-w-0"
              >
                <div
                  className="h-2 rounded-full bg-bwb-tertiary transition-all"
                  style={{
                    width:
                      tier.taxable > 0
                        ? `${Math.min(
                            (tier.taxable /
                              (tier.max === Infinity
                                ? annualRunRate - tier.min
                                : tier.max - tier.min)) *
                              100,
                            100
                          )}%`
                        : "0%",
                  }}
                />
              </div>
              <span className="whitespace-nowrap text-bwb-secondary/70 w-40 text-right">
                {(tier.rate * 100).toFixed(1)}% on {formatCurrency(tier.min)}
                {maxLabel}
              </span>
              <span className="font-medium tabular-nums w-20 text-right">
                {formatCurrency(tier.fee)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
