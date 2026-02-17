export default function EquitySplit() {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-bwb-secondary/60 uppercase tracking-wider">
        Equity Split
      </p>
      <div className="flex rounded-lg overflow-hidden h-6">
        <div
          className="bg-bwb-secondary flex items-center justify-center text-white text-xs font-medium"
          style={{ width: "51%" }}
        >
          BWB 51%
        </div>
        <div
          className="bg-bwb-primary flex items-center justify-center text-bwb-secondary text-xs font-medium"
          style={{ width: "49%" }}
        >
          Partner 49%
        </div>
      </div>
    </div>
  );
}
