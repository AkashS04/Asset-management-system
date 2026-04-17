import { apiClient } from "../apiClient";
import type { Asset, AssetFormData } from "../../types/assetTypes";

export const assetAPI = {
  getAssets: async () => {
    const response = await apiClient.get<Asset[]>("/assets");
    return response.data;
  },
  addAsset: async (asset: AssetFormData) => {
    const now = new Date().toString();
    const newAsset = {
      ...asset,
      createdAt: now,
      updatedAt: now,
    };
    const response = await apiClient.post("/assets", newAsset);
    return response.data;
  },
  bulkAsset: async (assets: AssetFormData[]) => {
    const now = new Date().toISOString();
    const requests = assets.map((asset) =>
      apiClient.post("/assets", {
        ...asset,
        createdAt: now,
        updatedAt: now,
      }),
    );
    const responses = await Promise.all(requests);
    return responses.map((res) => res.data);
  },
  updateAsset: async (asset: Asset) => {
    const now = new Date().toString();
    const updatedAsset = { ...asset, updatedAt: now };
    const response = await apiClient.put(`/assets/${asset.id}`, updatedAsset);
    return response.data;
  },
  deleteAsset: async (id: number) => {
    await apiClient.delete(`/assets/${id}`);
    return id;
  },
};
