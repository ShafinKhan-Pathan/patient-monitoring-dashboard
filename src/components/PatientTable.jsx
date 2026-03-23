import StatusBadge from "./StatusBadge";
import { getAssignedDoctorLabel, ownershipBadgeStyles } from "../utils/patientUtils";

export default function PatientTable({ patients, selectedId, onSelect, showOnlyUnassigned, onToggleUnassignedFilter }) {
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-panel sm:rounded-[28px] sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm">
            Patient List
          </p>
          <h2 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">Current patient overview</h2>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <label className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={showOnlyUnassigned}
              onChange={onToggleUnassignedFilter}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
            />
            Show only unassigned patients
          </label>
          <div className="rounded-full bg-rose-50 px-4 py-2 text-center text-sm font-medium text-rose-700">
            Critical patients shown first
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4 md:hidden">
        {patients.length ? (
          patients.map((patient) => (
            <button
              key={patient.id}
              type="button"
              onClick={() => onSelect(patient.id)}
              className={`w-full rounded-[24px] border p-4 text-left transition ${
                selectedId === patient.id
                  ? "border-emerald-200 bg-emerald-50/60"
                  : patient.assignedDoctor
                    ? "border-sky-100 bg-sky-50/40"
                    : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accentSoft font-semibold text-accent">
                  {patient.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
                    <div>
                      <p className="font-semibold text-ink">{patient.name}</p>
                      <p className="text-sm text-slate-500">Age {patient.age}</p>
                    </div>
                    <StatusBadge status={patient.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Progress Status
                      </p>
                      <span
                        className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                          patient.assignedDoctor
                            ? ownershipBadgeStyles.assigned
                            : ownershipBadgeStyles.unassigned
                        }`}
                      >
                        {patient.assignedDoctor ? "Assigned" : "In Progress"}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Sleep Score
                      </p>
                      <p className="mt-2 font-semibold text-slate-700">{patient.sleepScore}%</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Last Active
                      </p>
                      <p className="mt-2 text-slate-600">{patient.lastActive}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Monitored By
                      </p>
                      <p className="mt-2 text-slate-600">{getAssignedDoctorLabel(patient.assignedDoctor)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No unassigned patients are available right now.
          </div>
        )}
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-3xl border border-slate-200 md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-4 py-4 font-medium">Patient</th>
                <th className="px-4 py-4 font-medium">Progress Status</th>
                <th className="px-4 py-4 font-medium">Sleep Score</th>
                <th className="px-4 py-4 font-medium">Last Active</th>
                <th className="px-4 py-4 font-medium">Health Status</th>
                <th className="px-4 py-4 font-medium">Monitored By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {patients.length ? (
                patients.map((patient) => (
                  <tr
                    key={patient.id}
                    onClick={() => onSelect(patient.id)}
                    className={`cursor-pointer transition hover:bg-slate-50 ${
                      selectedId === patient.id
                        ? "bg-emerald-50/60"
                        : patient.assignedDoctor
                          ? "bg-sky-50/40"
                          : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accentSoft font-semibold text-accent">
                          {patient.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-ink">{patient.name}</p>
                          <p className="text-sm text-slate-500">Age {patient.age}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                          patient.assignedDoctor
                            ? ownershipBadgeStyles.assigned
                            : ownershipBadgeStyles.unassigned
                        }`}
                      >
                        {patient.assignedDoctor ? "Assigned" : "In Progress"}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-700">{patient.sleepScore}%</td>
                    <td className="px-4 py-4 text-slate-600">{patient.lastActive}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={patient.status} />
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {getAssignedDoctorLabel(patient.assignedDoctor)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-sm text-slate-500">
                    No unassigned patients are available right now.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
