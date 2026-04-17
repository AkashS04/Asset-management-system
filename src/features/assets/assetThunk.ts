import { createAsyncThunk } from "@reduxjs/toolkit";
import { assetAPI } from "../../services/assets/assetAPI";
import type { Asset, AssetFormData } from "../../types/assetTypes";

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await assetAPI.getAssets();
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const addAsset = createAsyncThunk(
  "assets/addAsset",
  async (asset: Omit<Asset, "id">, { rejectWithValue }) => {
    try {
      const res = await assetAPI.addAsset(asset);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const bulkAsset = createAsyncThunk(
  "assets/bulkAsset",
  async (asset: AssetFormData[], { rejectWithValue }) => {
    try {
      const res = await assetAPI.bulkAsset(asset);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Upload Failed");
    }
  },
);

export const updateAsset = createAsyncThunk(
  "assets/updateAsset",
  async (asset: Asset, { rejectWithValue }) => {
    try {
      const res = await assetAPI.updateAsset(asset);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteAsset = createAsyncThunk(
  "assets/deleteAsset",
  async (id: number, { rejectWithValue }) => {
    try {
      await assetAPI.deleteAsset(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);
