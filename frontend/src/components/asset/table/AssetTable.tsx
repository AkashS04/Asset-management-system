import { memo } from "react";
import type { Asset } from "../../../types/assetTypes";

interface props {
  assets: Asset[];
  handleDelete: (id: number) => void;
  onEdit: (asset: Asset) => void;
  showActions: boolean;
}

const AssetTable = memo(function AssetTable({
  assets,
  handleDelete,
  onEdit,
  showActions,
}: props) {

  return (
    <>
      <table className="w-full border border-gray-300 table-div">
        <thead className="bg-gray-200">
          <tr >
            <th className="border border-gray-300 px-2 py-3 text-center text-gray-700 ">Name</th>
            <th className="border border-gray-300 px-2 py-3 text-center text-gray-700">Type</th>
            <th className="border border-gray-300 px-2 py-3 text-center text-gray-700">Status</th>
            <th className="border border-gray-300 px-2 py-3 text-center text-gray-700">
              Assigned To
            </th>
            <th className="border border-gray-300 px-2 py-3 text-center text-gray-700 ">
              Created Date
            </th>
            <th className="border border-gray-300 px-2 py-3 text-center text-gray-700 ">
              Updated Date
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset: Asset) => (
            <tr key={asset.id}>
              <td className="border border-gray-300 px-2 py-3 text-center text-gray-700 ">
                {asset.name}
              </td>
              <td className="border border-gray-300 px-2 py-3 text-center text-gray-700 ">
                {asset.type}
              </td>
              <td className="border border-gray-300 px-2 py-3 text-center text-gray-700 ">
                {asset.status}
              </td>
              <td className="border border-gray-300 px-2 py-3 text-center text-gray-700 ">
                {asset.assignedTo}
              </td>
              <td className="border border-gray-300 px-2 py-3 text-center text-gray-700 ">
                {new Date(asset.createdAt).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-3 text-center text-gray-700 ">
                {new Date(asset.updatedAt).toLocaleString()}
              </td>
              {showActions && (
                <>
                  <td className="border border-gray-300 px-2 py-3 text-center   ">
                    <button
                    type="button"
                      className="underline text-blue-500 cursor-pointer"
                      onClick={(e) => {
                         e.stopPropagation(); 
                        onEdit?.(asset);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-gray-300 px-2 py-3 text-center  text-red-500">
                    <button
                    type="button"
                      className="cursor-pointer"
                      onClick={(e) =>{  e.stopPropagation();  handleDelete?.(asset.id)}}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
});
export default AssetTable;
