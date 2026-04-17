import { useMemo } from "react";
import type { Asset } from "../../types/assetTypes";

export const useDashBoardData = (assets: Asset[]) => {
  return useMemo(() => {
    const statusMap: Record<string, number> = {};
    const typeMap: Record<string, number> = {};

    assets.forEach((asset) => {
      statusMap[asset.status] = (statusMap[asset.status] || 0) + 1;
      typeMap[asset.type] = (typeMap[asset.type] || 0) + 1;
    });

    const statusData = Object.entries(statusMap).map(([name, value]) => ({
      name,
      value,
    }));

    const typeData = Object.entries(typeMap).map(([name, value]) => ({
      name,
      value,
    }));

    return {
      total: assets.length,
      assigned: statusMap["Assigned"] || 0,
      available: statusMap["Available"] || 0,
      repaired: statusMap["Repaired"] || 0,
      returned: statusMap["Returned"] || 0,
      statusData,
      typeData,
    };
  }, [assets]);
};
