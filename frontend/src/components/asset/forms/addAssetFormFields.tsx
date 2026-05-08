import { useWatch, type FieldErrors, type UseFormRegister, type Control, type UseFormSetValue } from "react-hook-form";
import { addAssetValidation } from "../../../validations/assets/addAssetValidaiton";
import { useEffect } from "react";

type props = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  control: Control<any>;
  setValue:UseFormSetValue<any>
};
export default function AddAssetFormFields({ register, errors, control,setValue }: props) {

  const status = useWatch({ control, name: "status", defaultValue: "Available" })

  useEffect(()=>{
    if(['Available','Repaired'].includes(status)){
      setValue("assignedTo","NILL")
    }
  })

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
        <select {...register("type", addAssetValidation.type)} className="w-full p-2 border border-gray-300 focus-visible:outline-none ">
          <option value="Server">Server</option>
          <option value="Monitor">Monitor</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Mouse">Mouse</option>
          <option value="Laptop">Laptop</option>
          <option value="Printer">Printer</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">
            {errors.status.message as string}
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
      {status !== "Available" && status !== "Repaired" && <div className="mb-4 h-[55px]">
        <input {...register("assignedTo", addAssetValidation.assignedTo)} placeholder="Assigned person" className="w-full p-2 border border-gray-300 focus-visible:outline-none " />
        {errors.assignedTo && (
          <p className="text-red-500 text-sm">
            {errors.assignedTo.message as string}
          </p>
        )}
      </div>}

    </>
  );
}