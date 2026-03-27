export interface FormData {
  name: string;
  type: string;
  status: "Available"|"Assigned"|"Repair"|"Retired";
  assignedTo: string;
}
