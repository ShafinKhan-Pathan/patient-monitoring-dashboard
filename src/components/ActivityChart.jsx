import MetricCard from "./MetricCard";
import { getActivityPath, getPriorityColor } from "../utils/patientUtils";

export default function ActivityChart({ patients }) {
  const criticalCount = patients.filter((patient) => patient.priority === "critical").length;
  const averageSleep = patients.length
    ? Math.round(patients.reduce((sum, patient) => sum + patient.sleepScore, 0) / patients.length)
    : 0;
  const totalActivity = patients.reduce(
    (sum, patient) => sum + patient.activity[patient.activity.length - 1],
    0,
  );

  return (
    <section className="rounded-[24px] bg-white p-5 shadow-panel sm:rounded-[28px] sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm">
            Patient Activity
          </p>
          <h2 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">Weekly movement trend</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            This simple view helps staff quickly spot patients whose activity is dropping.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3 md:grid-cols-3">
          <MetricCard label="Critical" value={criticalCount} tone="rose" />
          <MetricCard label="Avg Sleep" value={`${averageSleep}%`} tone="emerald" />
          <MetricCard label="Today Activity" value={totalActivity} tone="amber" />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] bg-slate-50 px-3 py-4 sm:mt-8 sm:rounded-3xl sm:px-4 sm:py-6">
        <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
          <span>Low</span>
          <span>Activity level</span>
          <span>High</span>
        </div>
        {patients.length ? (
          <>
            <svg viewBox="0 0 320 140" className="h-40 w-full sm:h-48">
              {[25, 50, 75, 100].map((marker) => {
                const y = 140 - (marker / 100) * 140;
                return (
                  <line
                    key={marker}
                    x1="0"
                    x2="320"
                    y1={y}
                    y2={y}
                    stroke="#dbe4dd"
                    strokeDasharray="5 5"
                  />
                );
              })}
              {patients.map((patient) => (
                <path
                  key={patient.id}
                  d={getActivityPath(patient.activity)}
                  fill="none"
                  stroke={getPriorityColor(patient.priority)}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              ))}
            </svg>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs text-slate-600 sm:text-sm">
              {patients.map((patient) => (
                <div key={patient.id} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: getPriorityColor(patient.priority) }}
                  />
                  <span className="break-words">{patient.name}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-center text-sm text-slate-500">
            No patients match the current ownership filter.
          </div>
        )}
      </div>
    </section>
  );
}
