import MetricCard from "./MetricCard";

export default function DashboardHeader({ patients }) {
  const criticalCount = patients.filter((patient) => patient.priority === "critical").length;

  return (
    <section className="rounded-[28px] bg-[#17301f] px-5 py-6 text-white shadow-panel sm:rounded-[32px] sm:px-6 sm:py-8 md:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 sm:text-sm">
            Health Care Dashboard
          </p>
          <h1 className="mt-3 max-w-md text-3xl font-semibold leading-tight sm:text-4xl">
            Clear patient monitoring for fast, confident decisions.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/90 sm:text-base">
            Review patient status, highlight urgent cases, and open simple AI-style guidance
            without leaving the dashboard.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:w-full sm:max-w-xl md:grid-cols-3 lg:w-auto">
          <MetricCard label="Patients" value={patients.length} tone="emerald" />
          <MetricCard label="Critical" value={criticalCount} tone="rose" />
          <MetricCard label="Monitoring" value="Live" tone="amber" />
        </div>
      </div>
    </section>
  );
}
