import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { Asset } from "../types/assetTypes";
import { deleteAsset, fetchAssets } from "../features/assets/assetSlice";

const AssetsPage = () => {
  const dispatch = useAppDispatch();
  const { assets, Loading, Error } = useAppSelector(
    (state: any) => state.assets,
  );
  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);
  const handleDelete = (id: number) => {
    dispatch(deleteAsset(id));
  };
  return (
    <div className="p-20px">
        <h2>Assets</h2>
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
