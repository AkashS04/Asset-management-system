import { useMemo } from "react";
import type { Asset } from "../../types/assetTypes";

type SortType =
  | "latest"
  | "oldest"
  | "updated"
  | "name-asc"
  | "name-desc";

type StatusFilter =
  | "All"
  | "Available"
  | "Assigned"
  | "Repaired"
  | "Returned";

interface Props {
  assets: Asset[];
  search: string;
  statusFilter: StatusFilter;
  sortBy: SortType;
}

export const useAssetsPipeline = ({
  assets,
  search,
  statusFilter,
  sortBy,
}: Props) => {
  const processedAssets = useMemo(() => {
    return assets
      .filter((asset) => {
        const query = search.toLowerCase();

        return (
          asset.name.toLowerCase().includes(query) ||
          asset.type.toLowerCase().includes(query) ||
          (asset.assignedTo || "").toLowerCase().includes(query)
        );
      })

      .filter((asset) => {
        if (statusFilter === "All") return true;
        return asset.status === statusFilter;
      })

      .sort((a, b) => {
        switch (sortBy) {
          case "latest":
            return (
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
            );

          case "oldest":
            return (
              new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()
            );

          case "updated":
            return (
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime()
            );

          case "name-asc":
            return a.name.localeCompare(b.name);

          case "name-desc":
            return b.name.localeCompare(a.name);

          default:
            return 0;
        }
      });
  }, [assets, search, statusFilter, sortBy]);

  return processedAssets;
};