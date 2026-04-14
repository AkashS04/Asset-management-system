import type { Asset } from "../../../types/assetTypes";

interface props {
  assets: Asset[];
  handleDelete: (id: number) => void;
  onEdit: (asset: Asset) => void;
  showActions: boolean;
}
export default function AssetTable({
  assets,
  handleDelete,
  onEdit,
  showActions,
}: props) {
  return (
    <>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-center ">Name</th>
            <th className="border border-gray-300 p-2 text-center ">Type</th>
            <th className="border border-gray-300 p-2 text-center ">Status</th>
            <th className="border border-gray-300 p-2 text-center ">
              Assigned To
            </th>
            <th className="border border-gray-300 p-2 text-center ">
              Created Date
            </th>
            <th className="border border-gray-300 p-2 text-center ">
              Updated Date
            </th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset: Asset) => (
            <tr key={asset.id}>
              <td className="border border-gray-300 p-2 text-center ">
                {asset.name}
              </td>
              <td className="border border-gray-300 p-2 text-center ">
                {asset.type}
              </td>
              <td className="border border-gray-300 p-2 text-center ">
                {asset.status}
              </td>
              <td className="border border-gray-300 p-2 text-center ">
                {asset.assignedTo}
              </td>
              <td className="border border-gray-300 p-2 text-center ">
                {new Date(asset.createdAt).toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2 text-center ">
                {new Date(asset.updatedAt).toLocaleString()}
              </td>
              {showActions && (
                <>
                  {" "}
                  <td className="border border-gray-300 p-2 text-center   ">
                    <button
                      className="underline text-blue-500 cursor-pointer"
                      onClick={() => {
                        onEdit?.(asset);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2 text-center  text-red-500">
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDelete?.(asset.id)}
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
}
