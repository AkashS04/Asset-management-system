import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';
import type {Asset} from '../../types/assetTypes';
import {assetAPI} from '../../services/assets/assetAPI';

export const fetchAssets = createAsyncThunk(
    "assets/fetchAssets",
    async()=>{
    const data = await assetAPI.getAssets();
    return data;
    }
)

export const addAsset = createAsyncThunk(
    "assets/addAsset",
    async (asset:Omit<Asset , "id"> )=>{
        const data = await assetAPI.addAsset(asset);
        return data;
    }
)

export const updateAsset = createAsyncThunk(
    "assets/updateAsset",
    async (asset:Asset)=>{
        const data= await assetAPI.updateAsset(asset);
        return data;
    }
)

export const deleteAsset = createAsyncThunk(
    "assets/deleteAsset",
    async (id:number)=>{
        const data = await assetAPI.deleteAsset(id);
        return data;
    }
)

interface AssetState {
    assets: Asset[];
    loading:boolean;
    error:string|null
}

const initialState:AssetState = {
    assets:[],
    loading:false,
    error:null
}

const assetSlice = createSlice(
{
    name:"assets",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAssets.pending,(state)=>{
            state.loading = true;
            state.error=null;        })
        .addCase(fetchAssets.fulfilled,(state,action:PayloadAction<Asset[]>)=>{
            state.loading=false;
            state.assets=action.payload;
        })
        .addCase(fetchAssets.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message || "Failed to fetch Assets"
        })
        .addCase(addAsset.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(addAsset.fulfilled,(state:AssetState, action:PayloadAction<Asset>)=>{
            state.loading=false;
            state.assets.push(action.payload);
        })
        .addCase(addAsset.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message || "Failed to add Asset"
        })
        .addCase(updateAsset.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(updateAsset.fulfilled,(state,action:PayloadAction<Asset>)=>{
            state.loading=false;
            const index = state.assets.findIndex(asset => asset.id === action.payload.id);
            if(index !== -1){
                state.assets[index] = action.payload;
            }
        })
        .addCase(updateAsset.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message || "Failed to update Asset"
        })
        .addCase(deleteAsset.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(deleteAsset.fulfilled,(state,action:PayloadAction<number>)=>{
            state.loading=false;
            state.assets = state.assets.filter(asset => asset.id !== action.payload);
        })
        .addCase(deleteAsset.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message || "Failed to delete Asset"
        })}
}
)

export default assetSlice.reducer;