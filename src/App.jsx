import { useEffect, useMemo, useState } from "react";
import ActivityChart from "./components/ActivityChart";
import DashboardHeader from "./components/DashboardHeader";
import LoadingState from "./components/LoadingState";
import PatientDetail from "./components/PatientDetail";
import PatientTable from "./components/PatientTable";
import { fetchPatients } from "./services/patientService";
import { sortPatients } from "./utils/patientUtils";

export default function App() {
  const currentDoctor = "Dr. Shafin";
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [assignmentMessage, setAssignmentMessage] = useState("");
  const [showOnlyUnassigned, setShowOnlyUnassigned] = useState(false);
  const orderedPatients = useMemo(() => sortPatients(patients), [patients]);
  const visiblePatients = useMemo(() => {
    if (!showOnlyUnassigned) {
      return orderedPatients;
    }

    return orderedPatients.filter((patient) => !patient.assignedDoctor);
  }, [orderedPatients, showOnlyUnassigned]);

  useEffect(() => {
    let isMounted = true;

    async function loadPatients() {
      try {
        const data = await fetchPatients();
        if (!isMounted) {
          return;
        }

        setPatients(data);
        setSelectedPatientId(data[0]?.id ?? null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPatients();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedPatient =
    visiblePatients.find((patient) => patient.id === selectedPatientId) ?? visiblePatients[0] ?? null;

  const handleSelectPatient = (patientId) => {
    setSelectedPatientId(patientId);
    setShowExplanation(false);
    setAssignmentMessage("");
  };

  const handleAssignToMe = () => {
    if (!selectedPatient) {
      return;
    }

    if (selectedPatient.assignedDoctor) {
      setAssignmentMessage(`This patient is already assigned to ${selectedPatient.assignedDoctor}.`);
      return;
    }

    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === selectedPatient.id
          ? { ...patient, assignedDoctor: currentDoctor }
          : patient,
      ),
    );
    setAssignmentMessage(`You are now monitoring ${selectedPatient.name}.`);
  };

  const handleToggleUnassignedFilter = () => {
    setShowOnlyUnassigned((current) => !current);
    setAssignmentMessage("");
  };

  useEffect(() => {
    if (!visiblePatients.length) {
      setSelectedPatientId(null);
      return;
    }

    const selectedStillVisible = visiblePatients.some((patient) => patient.id === selectedPatientId);
    if (!selectedStillVisible) {
      setSelectedPatientId(visiblePatients[0].id);
      setShowExplanation(false);
    }
  }, [visiblePatients, selectedPatientId]);

  return (
    <main className="min-h-screen px-3 py-4 text-ink sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader patients={visiblePatients} />

        <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 xl:mt-8 xl:grid-cols-[minmax(0,1.7fr)_360px] xl:gap-8">
          {isLoading ? (
            <div className="xl:col-span-2">
              <LoadingState />
            </div>
          ) : (
            <>
              <div className="space-y-5 sm:space-y-6 xl:space-y-8">
                <ActivityChart patients={visiblePatients} />
                <PatientTable
                  patients={visiblePatients}
                  selectedId={selectedPatientId}
                  onSelect={handleSelectPatient}
                  showOnlyUnassigned={showOnlyUnassigned}
                  onToggleUnassignedFilter={handleToggleUnassignedFilter}
                />
              </div>

              <div className="space-y-4 sm:space-y-5">
                {selectedPatient ? (
                  <PatientDetail
                    patient={selectedPatient}
                    explanationVisible={showExplanation}
                    onExplain={() => setShowExplanation((current) => !current)}
                  />
                ) : (
                  <div className="rounded-[28px] bg-white p-6 shadow-panel">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                      Patient Details
                    </p>
                    <div className="mt-4 rounded-[24px] bg-slate-50 p-5 text-sm leading-6 text-slate-600 sm:rounded-[26px] sm:p-6">
                      No patient is currently available for this filter. Turn off
                      &nbsp;`Show only unassigned patients` to review the full list.
                    </div>
                  </div>
                )}
                <div className="rounded-[24px] bg-white p-5 shadow-panel sm:rounded-[28px]">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm">
                    Patient Ownership
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Assign the selected patient to yourself to reflect current care ownership.
                  </p>
                  <button
                    type="button"
                    onClick={handleAssignToMe}
                    disabled={!selectedPatient || Boolean(selectedPatient.assignedDoctor)}
                    className="mt-4 w-full rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#25593b] disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Assign to Me
                  </button>
                  <p className="mt-3 text-sm text-slate-600">
                    Current user: <span className="font-semibold text-ink">{currentDoctor}</span>
                  </p>
                  {assignmentMessage ? (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {assignmentMessage}
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
