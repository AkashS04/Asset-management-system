import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAssets } from "./assetThunk";

export const useInitAssets = () => {
    const dispatch = useAppDispatch();
    const initialized = useAppSelector((state: any) => state.assets.initialized);

    useEffect(() => {
        if (!initialized) {
            dispatch(fetchAssets());
        }
    }, [initialized, dispatch]); 
};