const tones = {
  rose: "bg-rose-50 text-rose-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
};

export default function MetricCard({ label, value, tone }) {
  return (
    <div className={`rounded-2xl px-4 py-3 sm:px-5 sm:py-4 ${tones[tone]}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs">{label}</p>
      <p className="mt-2 text-xl font-semibold sm:text-2xl">{value}</p>
    </div>
  );
}
