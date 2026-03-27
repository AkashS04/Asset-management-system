import { useForm } from "react-hook-form";
import AddAssetFormFields from "./addAssetFormfields";
import type { FormData } from "../../../types/addFormTypes";


interface props {
  onSubmit: (data: FormData) => void;
}

export default function AddAssetForm({ onSubmit }: props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const submitHandler = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <>
    <div className="max-w-[50%]">
      <form onSubmit={handleSubmit(submitHandler)}>
        <h2 className="text-xl font-semibold mb-3">Add Asset</h2>
        <AddAssetFormFields register={register} errors={errors} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {" "}
          Add Asset
        </button>
      </form>
      </div>
    </>
  );
}
