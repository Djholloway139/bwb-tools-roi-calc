import { Option1Result, Option2Result } from "@/lib/calculations/types";
import { formatCurrency } from "@/lib/formatters";
import BreakEvenBadge from "./BreakEvenBadge";
import FeeBreakdown from "./FeeBreakdown";
import EquitySplit from "./EquitySplit";

interface OptionCardProps {
  option: 1 | 2;
  result: Option1Result | Option2Result;
}

function isOption1(result: Option1Result | Option2Result): result is Option1Result {
  return "totalLicensingFees" in result;
}

export default function OptionCard({ option, result }: OptionCardProps) {
  const borderColor = option === 1 ? "border-bwb-tertiary" : "border-bwb-primary";
  const accentBg = option === 1 ? "bg-bwb-tertiary" : "bg-bwb-secondary";

  const partnerTakeHome = isOption1(result)
    ? result.totalPartnerNet
    : result.totalPartnerDistributions;

  const lastMonthRunRate = isOption1(result)
    ? result.monthlyProjections[result.monthlyProjections.length - 1].annualRunRate
    : result.monthlyProjections[result.monthlyProjections.length - 1].revenue * 12;

  const netProfit = partnerTakeHome - result.upfrontCost;
  const roiPercent = (result.roi * 100).toFixed(0);

  return (
    <div
      className={`bg-white rounded-xl border-2 ${borderColor} p-5 space-y-4`}
    >
      <div className={`${accentBg} text-white rounded-lg px-4 py-2.5`}>
        <h3 className="font-bold text-base">
          Option {option}:{" "}
          {option === 1 ? "Partnership-Licensing" : "True Partnership LLC"}
        </h3>
        <p className="text-sm opacity-80">
          {option === 1
            ? "Flat fee + progressive licensing"
            : "49% equity ownership"}
        </p>
      </div>

      {/* Hero: Partner Take-Home + ROI */}
      <div className="bg-bwb-background rounded-lg p-4 flex flex-col items-center">
        <p className="text-xs text-bwb-secondary/60 mb-0.5">Partner Take-Home</p>
        <p className="text-2xl font-bold text-bwb-tertiary tabular-nums">
          {formatCurrency(partnerTakeHome)}
        </p>
        <div className="w-full border-t border-bwb-border my-2" />
        <p className="text-xs text-bwb-secondary/60 mb-0.5">Net Profit (after upfront costs)</p>
        <p className="text-lg font-bold text-bwb-secondary tabular-nums">
          {formatCurrency(netProfit)}
        </p>
        <div
          className={`mt-2 px-3 py-1 rounded-full text-sm font-bold ${
            result.roi >= 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {result.roi >= 0 ? "+" : ""}
          {roiPercent}% ROI
        </div>
      </div>

      {/* Row 1: 3-col grid */}
      <div className="grid grid-cols-3 gap-4">
        <Metric label="Total Revenue" value={formatCurrency(result.totalRevenue)} />
        <Metric label="Total Profit" value={formatCurrency(result.totalProfit)} />
        <Metric
          label="Break-Even"
          value={<BreakEvenBadge month={result.breakEvenMonth} />}
        />
      </div>

      {/* Row 2: 2-col grid */}
      <div className="grid grid-cols-2 gap-4">
        <Metric label="Upfront Cost" value={formatCurrency(result.upfrontCost)} />
        {isOption1(result) ? (
          <Metric
            label="Total Licensing Fees"
            value={formatCurrency(result.totalLicensingFees)}
          />
        ) : (
          <Metric
            label="Total BWB Distributions"
            value={formatCurrency(
              (result as Option2Result).totalBwbDistributions
            )}
          />
        )}
      </div>

      {isOption1(result) ? (
        <FeeBreakdown annualRunRate={lastMonthRunRate} />
      ) : (
        <EquitySplit />
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-bwb-secondary/60 mb-0.5">{label}</p>
      <p
        className={`text-sm font-semibold tabular-nums ${
          highlight ? "text-bwb-tertiary" : "text-bwb-secondary"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
