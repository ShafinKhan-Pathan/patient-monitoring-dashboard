import { statusExplanations } from "../data/dummyData";
import { explanationStyles } from "../utils/patientUtils";
import InfoTile from "./InfoTile";
import StatusBadge from "./StatusBadge";

export default function PatientDetail({ patient, explanationVisible, onExplain }) {
  if (!patient) {
    return null;
  }

  const isAssigned = Boolean(patient.assignedDoctor);

  return (
    <aside className="rounded-[24px] bg-white p-5 shadow-panel sm:rounded-[28px] sm:p-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm">
        Patient Details
      </p>
      <div className="mt-4 rounded-[24px] bg-slate-50 p-4 sm:rounded-[26px] sm:p-5">
        <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-ink sm:text-2xl">{patient.name}</h3>
            <p className="mt-1 text-sm text-slate-500">Last active {patient.lastActive}</p>
          </div>
          <StatusBadge status={patient.status} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
          <InfoTile label="Sleep Score" value={`${patient.sleepScore}%`} />
          <InfoTile label="Age" value={patient.age} />
        </div>

        <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
          <div>
            <p className="font-semibold text-ink">Monitored By</p>
            <p>{patient.assignedDoctor || "Unassigned"}</p>
          </div>
          <div>
            <p className="font-semibold text-ink">Condition Summary</p>
            <p>{patient.condition}</p>
          </div>
          <div>
            <p className="font-semibold text-ink">Care Notes</p>
            <p>{patient.notes}</p>
          </div>
        </div>

        <div
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
            isAssigned
              ? "border-sky-200 bg-sky-50 text-sky-800"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          {isAssigned
            ? `Ownership locked to ${patient.assignedDoctor}.`
            : "This patient is currently unassigned and ready to be claimed."}
        </div>

        <button
          type="button"
          onClick={onExplain}
          className="mt-6 w-full rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#25593b]"
        >
          Explain Status
        </button>
        {explanationVisible ? (
          <div
            className={`mt-4 rounded-2xl border p-4 text-sm leading-7 ${explanationStyles[patient.status]}`}
          >
            {statusExplanations[patient.status]}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
