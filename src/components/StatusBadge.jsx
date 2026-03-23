import { statusStyles } from "../utils/patientUtils";

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ring-1 ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
