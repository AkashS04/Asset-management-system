import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { Asset , AssetFormData} from "../types/assetTypes";
import {
  addAsset,
  deleteAsset,
  fetchAssets,
  updateAsset,
} from "../features/assets/assetThunk";
import AddAssetForm from "../components/forms/asset/addAssetForm";

const AssetsPage = () => {
  const dispatch = useAppDispatch();
  const { assets, Loading, Error } = useAppSelector(
    (state: any) => state.assets,
  );
  const [open, setOpen] = useState<boolean>(false);
   const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);
  const handleDelete = (id: number) => {
    dispatch(deleteAsset(id));
  };

  const handleAdd = (data: AssetFormData) => {
    dispatch(addAsset(data));
  };

  const handleUpdate = (data:  AssetFormData) => {
    if (!editingAsset) return;
    dispatch(updateAsset({ ...data, id: editingAsset.id }));

    setEditingAsset(null);
  };
  return (
    <div className="p-20px">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold">Assets</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? "Close" : "Add Asset"}
        </button>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden mb-[24px] ${
          open ? "max-h-[500px] opacity-100" : " max-h-0 opacity-0"
        }`}
      >
        <AddAssetForm mode="add" onSubmit={handleAdd} />
      </div>



   {editingAsset && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <AddAssetForm
            mode="edit"
            defaultValues={{           
              name: editingAsset.name,
              type: editingAsset.type,
              status: editingAsset.status,
              assignedTo: editingAsset.assignedTo,
            }}
            onSubmit={handleUpdate}
            onCancel={() => setEditingAsset(null)}
          />
        </div>
      )}


      {Loading && <div> Loading...</div>}

      {Error && <div className="text-red">{Error}</div>}
      {!Loading && assets.length === 0 && (
        <div className="text-gray:600">No Assets Found</div>
      )}
      {!Loading && assets.length > 0 && (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset: Asset) => (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.status}</td>
                <td>{asset.assignedTo}</td>
                <td>
                  <button onClick={()=> setEditingAsset(asset)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(asset.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default AssetsPage;
