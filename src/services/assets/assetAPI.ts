import {apiClient} from '../apiClient';
import type {Asset, AssetFormData} from '../../types/assetTypes';

export const assetAPI = {
    getAssets:async()=>{
        const response = await apiClient.get<Asset[]>('/assets');
        return response.data;
    },
    addAsset:async(asset:AssetFormData)=>{
        const response =await apiClient.post("/assets", asset);
        return response.data;
    },
    updateAsset:async(asset:Asset)=>{
        const response = await apiClient.put(`/assets/${asset.id}`,asset);
        return response.data;
    },
    deleteAsset: async(id:number)=>{
        await apiClient.delete(`/assets/${id}`);
        return id;
    }
}