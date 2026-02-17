export default function Header() {
  return (
    <header className="bg-bwb-secondary text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <img
          src="/roi-calc/bwb-logo.png"
          alt="BWB Logo"
          width={48}
          height={48}
          className="rounded"
        />
        <h1 className="text-2xl font-normal">
          BWB ROI Calculator
        </h1>
      </div>
    </header>
  );
}
