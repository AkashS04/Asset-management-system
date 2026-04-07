export interface Asset {
  id: number;
  name: string;
  type: string;
  status: "Available" | "Assigned" | "Repaired" | "Returned";
  assignedTo: string;
}

export type AssetFormData = Omit<Asset, "id">;