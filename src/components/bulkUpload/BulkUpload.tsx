import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import DropZone from "./DropZone";
import PreviewTable from "./PreviewTable";
import ErrorReport from "./ErrorReport";

export default function BulkUpload({ onUpload }: any) {
  const [preview, setPreview] = useState<any[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [resetKey, setResetKey] = useState(0)
 const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = (file: File) => {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json<any>(sheet) || [];

      const errorList: any[] = [];

      let lastAssigned = "";

      const formatted = raw.map((item, index) => {
        if (!item.name || !item.type) {
          errorList.push({ row: index + 1, message: "Missing name/type" });
        }

        if (item.assignedTo) {
          lastAssigned = item.assignedTo;
        }

        return {
          id: crypto.randomUUID(),
          name: item.name || "",
          type: item.type || "",
          status: item.status || "Available",
          assignedTo: item.assignedTo || lastAssigned,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });

      setPreview(formatted);
      setErrors(errorList);
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const handleCancel = ()=>{
    setPreview([]);
    setErrors([]);
      setResetKey(prev => prev + 1);
  
  }

  return (
    <div className="">
      <DropZone onFileSelect={processFile} resetTrigger={resetKey} />
      {loading && <p>Processing File...</p>}
      {errors?.length > 0 && <ErrorReport errors={errors} />}
      {preview?.length > 0 && <PreviewTable data={preview} />}
      {preview?.length > 0 && (
        <div className="w-full flex gap-2">
          <button
            className="bg-blue-500 p-2 rounded-md cursor-pointer text-white"
            onClick={() => onUpload(preview)}
          >
            Confirm Update
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
