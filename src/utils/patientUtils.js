export const statusStyles = {
  Stable: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Monitor: "bg-amber-100 text-amber-700 ring-amber-200",
  Critical: "bg-rose-100 text-rose-700 ring-rose-200",
};

export const explanationStyles = {
  Stable: "border-emerald-200 bg-emerald-50 text-emerald-900",
  Monitor: "border-amber-200 bg-amber-50 text-amber-900",
  Critical: "border-rose-200 bg-rose-50 text-rose-900",
};

export const ownershipBadgeStyles = {
  assigned: "bg-sky-100 text-sky-700 ring-sky-200",
  unassigned: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function sortPatients(list) {
  const priorityWeight = { critical: 0, warning: 1, good: 2 };

  return [...list].sort((a, b) => {
    if (!!a.assignedDoctor !== !!b.assignedDoctor) {
      return a.assignedDoctor ? 1 : -1;
    }

    const priorityDiff = priorityWeight[a.priority] - priorityWeight[b.priority];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return a.sleepScore - b.sleepScore;
  });
}

export function getActivityPath(values) {
  const width = 320;
  const height = 140;
  const step = width / (values.length - 1);

  return values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / 100) * height;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export function getPriorityColor(priority) {
  if (priority === "critical") {
    return "#c84d4d";
  }

  if (priority === "warning") {
    return "#d7a229";
  }

  return "#2f6b47";
}

export function getAssignedDoctorLabel(assignedDoctor) {
  return assignedDoctor || "Unassigned";
}
