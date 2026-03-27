import { createAsyncThunk } from "@reduxjs/toolkit";
import { assetAPI } from "../../services/assets/assetAPI";
import type { Asset } from "../../types/assetTypes";

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
    async(id:number, {rejectWithValue})=>{
        try{
            const res = await assetAPI.deleteAsset(id);
            return res
        }
        catch(err:any){
            return rejectWithValue(err.message)
        }
    }
)