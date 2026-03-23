import { patientRecords } from "../data/dummyData";

export function fetchPatients() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(patientRecords);
    }, 350);
  });
}
