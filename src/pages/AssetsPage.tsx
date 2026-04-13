import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { Asset, AssetFormData } from "../types/assetTypes";
import {
  addAsset,
  bulkAsset,
  deleteAsset,
  fetchAssets,
  updateAsset,
} from "../features/assets/assetThunk";
import AddAssetForm from "../components/asset/forms/addAssetForm";
import AssetTable from "../components/asset/table/AssetTable";
import { useAssetsPipeline } from "../features/assets/useAssetPipeline";
import { useDebounce } from "../features/assets/useDebounce";
import BulkUpload from "../components/bulkUpload/BulkUpload";
import Modal from "../components/ui/Modal";
import { exportAssetsToPDF } from "../utils/exportAssetsToPDF";
type sortType = "latest" | "oldest" | "updated" | "name-asc" | "name-desc";
type filterType = "All" | "Available" | "Assigned" | "Repaired" | "Returned";
const AssetsPage = () => {
  const dispatch = useAppDispatch();
  const { assets, Loading, Error } = useAppSelector(
    (state: any) => state.assets,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<sortType>("latest");
  const [statusFilter, setStatusFilter] = useState<filterType>("All");

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);
  const handleDelete = (id: number) => {
    dispatch(deleteAsset(id));
  };

  const debouncedSearch = useDebounce(search, 300);

  const handleAdd = (data: AssetFormData) => {
    dispatch(addAsset(data));
  };

  const handleUpdate = (data: AssetFormData) => {
    if (!editingAsset) return;
    dispatch(updateAsset({ ...data, id: editingAsset.id }));

    setEditingAsset(null);
  };

  const processedAssets = useAssetsPipeline({
    assets,
    search: debouncedSearch,
    statusFilter,
    sortBy,
  });
  return (
    <div className="p-20px">
      <div className="">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-bold">Assets</h2>
          <div className="flex bg-gray-100 border">
            <div className="">
              <input
                className="border-gray-200 focus-visble:outline-none p-2"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Assets"
              />
            </div>
            <div className="border-l">
              <select
                className="bg-gray-100 px-4 py-2 text-center cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="All">All</option>
                <option value="Available">Available</option>
                <option value="Assigned">Assigned</option>
                <option value="Repaired">Repaired</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
            <div className="border-l">
              <select
                className="bg-gray-100 px-4 py-2 text-center cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="updated">Recently Updated</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
              </select>
            </div>
          </div>

          <div className=" flex gap-4 justify-end">
            {processedAssets.length > 0 && (
              <button
                className="bg-green-700 p-2 rounded-md cursor-pointer text-white"
                onClick={() => exportAssetsToPDF(processedAssets)}
                disabled={processedAssets.length === 0}
              >
                Download
              </button>
            )}

            <button
              className="bg-blue-500 p-2 w-[100px] rounded-md cursor-pointer text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? "Close" : "Add Asset"}
            </button>
          </div>
        </div>

        <div className="mt-8 mb-2">
          <BulkUpload
            onUpload={(data: any) => {
              data.forEach((asset: Asset[]) => {
                dispatch(bulkAsset(asset));
              });
            }}
          />
        </div>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <AddAssetForm mode="add" open={open} onSubmit={handleAdd} />
      </Modal>

      <Modal isOpen={!!editingAsset} onClose={() => setEditingAsset(null)}>
        {editingAsset && (
          <AddAssetForm
            mode="edit"
            defaultValues={{
              name: editingAsset.name,
              type: editingAsset.type,
              status: editingAsset.status,
              assignedTo: editingAsset.assignedTo,
              createdAt: editingAsset.createdAt,
              updatedAt: editingAsset.updatedAt,
            }}
            onSubmit={handleUpdate}
            onCancel={() => setEditingAsset(null)}
          />
        )}
      </Modal>

      {Loading && <div> Loading...</div>}

      {Error && <div className="text-red">{Error}</div>}
      {!Loading && assets.length === 0 && (
        <div className="text-gray:600">No Assets Found</div>
      )}
      {!Loading && assets.length > 0 && (
        <AssetTable
          assets={processedAssets}
          handleDelete={handleDelete}
          onEdit={setEditingAsset}
        />
      )}
    </div>
  );
};
export default AssetsPage;
