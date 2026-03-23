export default function InfoTile({ label, value }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 sm:px-5 sm:py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-ink sm:text-xl">{value}</p>
    </div>
  );
}
