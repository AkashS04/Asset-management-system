import type { FieldErrors, UseFormRegister } from "react-hook-form";

type props = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
};
export default function AddAssetFormFields({ register, errors }: props) {
  return (
    <>
      <div className="mb-4">
        <input
          {...register("name")}
          placeholder="Asset Name"
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message as string}
          </p>
        )}
      </div>
      <div className="mb-4">
        <input
          {...register("type")}
          placeholder="Asset type"
          className="w-full p-2 border rounded"
        />
        {errors.type && (
          <p className="text-red-500 text-sm">
            {errors.type.message as string}
          </p>
        )}
      </div>
      <div className="mb-4">
        <select {...register("status")} className="w-full p-2 border rounded">
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Repaired">Repaired</option>
          <option value="Returned">Returned</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">
            {errors.status.message as string}
          </p>
        )}
      </div>
      <div className="mb-4">
        <input {...register("assignedTo")} placeholder="Assigned person" className="w-full p-2 border rounded"/>
        {errors.assignedTo && (
          <p className="text-red-500 text-sm">
            {errors.assignedTo.message as string}
          </p>
        )}
      </div>
    </>
  );
}