export default function LoadingState() {
  return (
    <div className="rounded-[28px] bg-white p-8 text-center shadow-panel">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Loading</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">Fetching patient records...</h2>
      <p className="mt-2 text-sm text-slate-600">
        Preparing the latest dashboard view for the care team.
      </p>
    </div>
  );
}
