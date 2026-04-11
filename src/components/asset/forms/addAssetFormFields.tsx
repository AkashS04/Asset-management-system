import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { addAssetValidation } from "../../../validations/assets/addAssetValidaiton";

type props = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
};
export default function AddAssetFormFields({ register, errors }: props) {
  return (
    <>
      <div className="mb-4 h-[55px]">
        <input
          {...register("name", addAssetValidation.name)}
          placeholder="Asset Name"
          className="w-full p-2 border border-gray-300 focus-visible:outline-none "
        />
        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message as string}
          </p>
        )}
      </div>
      <div className="mb-4 h-[55px]">
        <input
          {...register("type", addAssetValidation.type)}
          placeholder="Asset type"
          className="w-full p-2 border border-gray-300 focus-visible:outline-none "
        />
        {errors.type && (
          <p className="text-red-500 text-sm">
            {errors.type.message as string}
          </p>
        )}
      </div>
      <div className="mb-4 h-[55px]">
        <select {...register("status")} className="w-full p-2 border border-gray-300 focus-visible:outline-none ">
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
      <div className="mb-4 h-[55px]">
        <input {...register("assignedTo",addAssetValidation.assignedTo)} placeholder="Assigned person" className="w-full p-2 border border-gray-300 focus-visible:outline-none "/>
        {errors.assignedTo && (
          <p className="text-red-500 text-sm">
            {errors.assignedTo.message as string}
          </p>
        )}
      </div>
    </>
  );
}