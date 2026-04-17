import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { Asset, AssetFormData } from "../types/assetTypes";
import {
  addAsset,
  bulkAsset,
  deleteAsset,
  updateAsset,
} from "../features/assets/assetThunk";
import AddAssetForm from "../components/asset/forms/addAssetForm";
import AssetTable from "../components/asset/table/AssetTable";
import { useAssetsPipeline } from "../features/assets/useAssetPipeline";
import { useDebounce } from "../features/assets/useDebounce";
import BulkUpload from "../components/bulkUpload/BulkUpload";
import Modal from "../components/ui/Modal";
import { exportAssetsToPDF } from "../utils/exportAssetsToPDF";
import ConfirmModal from "../components/ui/ConfirmModal";
import toast from "react-hot-toast";
import { useInitAssets } from "../features/assets/useInitAssets";
type sortType = "latest" | "oldest" | "updated" | "name-asc" | "name-desc";
type filterType = "All" | "Available" | "Assigned" | "Repaired" | "Returned";

const AssetsPage = () => {
  const dispatch = useAppDispatch();
  const assets = useAppSelector((state: any) => state.assets.assets);
  const Error = useAppSelector((state: any) => state.assets.error);
  const fetchLoading = useAppSelector((state: any) => state.assets.loading.fetch);
  const initialized = useAppSelector((state: any) => state.assets.initialized);
  const [open, setOpen] = useState<boolean>(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<sortType>("latest");
  const [statusFilter, setStatusFilter] = useState<filterType>("All");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useInitAssets();

  const debouncedSearch = useDebounce(search, 300);

  const processedAssets = useAssetsPipeline({
    assets,
    search: debouncedSearch,
    statusFilter,
    sortBy,
  });

  const handleAdd = useCallback(
    async (data: AssetFormData) => {
      try {
        await dispatch(addAsset(data)).unwrap();
        toast.success("Asset added successfully", { icon: "✅" });
        setOpen(false);
      } catch (err) {
        toast.error("Failed to add asset",{ icon: "❌" });
      }
    },
    [dispatch],
  );

  const handleUpdate = useCallback(
    (data: AssetFormData) => {
      if (!editingAsset) return;
      dispatch(updateAsset({ ...data, id: editingAsset.id }));
      toast.success("Asset updated successfully", { icon: "✅" });
      setEditingAsset(null);
    },
    [dispatch, editingAsset],
  );

  const confirmDelete = useCallback(async () => {

    if (deleteId === null) return;

    try {
      await dispatch(deleteAsset(deleteId)).unwrap();
      setDeleteId(null);
      toast.success("Asset deleted sucessfully",{ icon: "✅" } );
    } catch (err) {
      toast.error("Failed to delete asset", { icon: "❌" })
    }
  }, [dispatch, deleteId]);

  const handleDelete = useCallback((id: number) => {
    setDeleteId(id);
  }, []);
  const handleCloseConfirm = useCallback(() => {
    setDeleteId(null);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setEditingAsset(null);
  }, []);



  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as filterType);
  }, []);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as sortType);
  }, []);

  const handleExportPDF = useCallback(() => {
    exportAssetsToPDF(processedAssets);
  }, [processedAssets]);

  const handleToggleOpen = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleBulkUpload = useCallback(async (data: AssetFormData[]) => {

    const loadingToast = toast.loading(`Uploading ${data.length} assets...`);
    try {
      await dispatch(bulkAsset(data)).unwrap();
      toast.success(`${data.length} assets uploaded successfully`, { id: loadingToast });
    } catch (err) {
      toast.error('Bulk upload failed', { id: loadingToast });
    }

  }, [dispatch]);

  const handleCloseOpen = useCallback(() => {
    setOpen(false);
  }, []);



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
                onChange={handleSearchChange}
                placeholder="Search Assets"
              />
            </div>
            <div className="border-l">
              <select
                className="bg-gray-100 px-4 py-2 text-center cursor-pointer"
                value={statusFilter}
                onChange={handleStatusChange}
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
                onChange={handleSortChange}
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
              <button type="button"
                className="bg-green-700 p-2 rounded-md cursor-pointer text-white"
                onClick={handleExportPDF}
                disabled={processedAssets.length === 0}
              >
                Download
              </button>
            )}

            <button type="button"
              className="bg-blue-500 p-2 w-[100px] rounded-md cursor-pointer text-white"
              onClick={handleToggleOpen}
            >
              {open ? "Close" : "Add Asset"}
            </button>
          </div>
        </div>

        <div className="mt-8 mb-2">
          <BulkUpload
            onUpload={handleBulkUpload}
          />
        </div>
      </div>
      <Modal isOpen={open} onClose={handleCloseOpen}>
        <AddAssetForm mode="add" open={open} onSubmit={handleAdd} />
      </Modal>

      <Modal isOpen={!!editingAsset} onClose={handleCloseEdit}>
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
            onCancel={handleCloseEdit}
          />
        )}
      </Modal>

      {fetchLoading && !initialized && <div>Loading...</div>}
      {Error && <div className="text-red">{Error}</div>}
      {!fetchLoading && assets.length === 0 && initialized && (
        <div className="text-gray:600">No Assets Found</div>
      )}
      <AssetTable
        assets={processedAssets}
        handleDelete={handleDelete}
        onEdit={setEditingAsset}
        showActions={true}
      />

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={handleCloseConfirm}
        onConfirm={confirmDelete}
      ></ConfirmModal>
    </div>
  );
};
export default AssetsPage;
