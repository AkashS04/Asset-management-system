import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {Asset} from '../../types/assetTypes';
import { addAsset, bulkAsset, deleteAsset, fetchAssets, updateAsset } from './assetThunk';


interface AssetState {
    assets: Asset[];
    loading: {
  fetch: boolean;
  add: boolean;
  update: boolean;
  delete: boolean;
  bulk: boolean;
};
    error:string|null;
    initialized:boolean
}

const initialState:AssetState = {
    assets:[],
  loading: {
    fetch: false,
    add: false,
    update: false,
    delete: false,
    bulk: false,
  },
    error:null,
    initialized: false
}

const assetSlice = createSlice(
{
    name:"assets",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAssets.pending,(state)=>{
            state.loading.fetch = true;
            state.error=null;        })
        .addCase(fetchAssets.fulfilled,(state,action:PayloadAction<Asset[]>)=>{
            state.loading.fetch=false;
            state.assets=action.payload;
            state.initialized = true;
        })
        .addCase(fetchAssets.rejected,(state,action)=>{
            state.loading.fetch=false;
            state.error=action.error.message || "Failed to fetch Assets"
        })
        .addCase(addAsset.pending,(state)=>{
            state.loading.add=true;
            state.error=null
        })
        .addCase(addAsset.fulfilled,(state:AssetState, action:PayloadAction<Asset>)=>{
            state.loading.add=false;
            state.assets.push(action.payload);
        })
        .addCase(addAsset.rejected,(state,action)=>{
            state.loading.add=false;
            state.error=action.payload as string || "Failed to add Asset"
        })
        .addCase( bulkAsset.pending,(state:AssetState)=>{
            state.loading.bulk= true;
            state.error = null
        }
        )
        .addCase(bulkAsset.fulfilled, (state:AssetState, action:PayloadAction<Asset[]>)=>{
            state.loading.bulk = false;
            state.assets.push(...action.payload)
        })
        .addCase(bulkAsset.rejected,(state, action)=>{
            state.loading.bulk=false;
            state.error = action.payload as string || "Failed to Add Assets"
        })
        .addCase(updateAsset.pending,(state)=>{
            state.loading.update=true;
            state.error=null
        })
        .addCase(updateAsset.fulfilled,(state,action:PayloadAction<Asset>)=>{
            state.loading.update=false;
            const index = state.assets.findIndex(asset => asset.id === action.payload.id);
            if(index !== -1){
                state.assets[index] = action.payload;
            }
        })
        .addCase(updateAsset.rejected,(state,action)=>{
            state.loading.update=false;
            state.error=action.error.message || "Failed to update Asset"
        })
        .addCase(deleteAsset.pending,(state)=>{
            state.loading.delete = true; 
            state.error=null
        })
        .addCase(deleteAsset.fulfilled,(state,action:PayloadAction<number>)=>{
             state.loading.delete = false; 
            state.assets = state.assets.filter(asset => asset.id !== action.payload);
        })
        .addCase(deleteAsset.rejected,(state,action)=>{
            state.loading.delete = false;
            state.error=action.error.message || "Failed to delete Asset"
        })}
}
)

export default assetSlice.reducer;