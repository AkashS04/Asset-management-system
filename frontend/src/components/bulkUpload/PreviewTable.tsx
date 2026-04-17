import React from "react";

const PreviewTable = ({ data }: any)=> {
  return (
    <>
      <table className="w-lg border border-gray-300 my-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-center ">Name</th>
            <th className="border border-gray-300 p-2 text-center ">Type</th>
            <th className="border border-gray-300 p-2 text-center ">Status</th>
            <th className="border border-gray-300 p-2 text-center ">Assigned</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2 text-center ">{item.name}</td>
              <td className="border border-gray-300 p-2 text-center ">{item.type}</td>
              <td className="border border-gray-300 p-2 text-center ">{item.status}</td>
              <td className="border border-gray-300 p-2 text-center ">{item.assignedTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default React.memo(PreviewTable)