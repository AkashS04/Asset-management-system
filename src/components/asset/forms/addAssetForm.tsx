import { useForm } from "react-hook-form";
import AddAssetFormFields from "./addAssetFormFields";
import type { AssetFormData } from "../../../types/assetTypes";
import { useEffect } from "react";

interface props {
  mode: "add" | "edit";
  defaultValues?: AssetFormData;
  onSubmit: (data: AssetFormData) => void;
  onCancel?: () => void;
  open?:boolean
}

export default function AddAssetForm({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  open
}: props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssetFormData>({ defaultValues });

  const submitHandler = (data: AssetFormData) => {
    onSubmit(data);
    if (mode === "add") reset();
  };

  const isEdit = mode === "edit";

  useEffect(() => {
  if (!open) {
    reset()
  }
}, [open, reset]);

  return (
    <>
      <div className="max-w-[50%]">
        <form onSubmit={handleSubmit(submitHandler)}>
          <h2 className="text-xl font-semibold mb-3">
            {isEdit ? "Edit Asset" : "Add Asset"}
          </h2>
          <AddAssetFormFields register={register} errors={errors} />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {" "}
              {isEdit ? "Edit Asset" : "Add Asset"}
            </button>
            {isEdit && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}