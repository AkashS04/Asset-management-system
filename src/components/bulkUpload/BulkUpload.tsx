import React, { useCallback, useRef, useState } from "react";
import * as XLSX from "xlsx";
import DropZone from "./DropZone";
import PreviewTable from "./PreviewTable";
import ErrorReport from "./ErrorReport";

const BulkUpload = ({ onUpload }: any) => {
  const [preview, setPreview] = useState<any[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState(0)
  const isProcessingRef = useRef(false);

  const processFile = useCallback((file: File) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result as ArrayBuffer;
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
      isProcessingRef.current = false;
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  }, []);
  const handleCancel = useCallback(() => {
    setPreview([]);
    setErrors([]);
    setResetKey(prev => prev + 1);

  }, [])

  const handleConfirm = useCallback(async () => {
    if (uploading) return;
    setUploading(true);
    try {
      await onUpload(preview);
      handleCancel();
    } catch (err) {
      console.error("Upload failed", err);
      setErrors(prev => [...prev, { row: 0, message: "Upload failed. Please try again." }]);
    } finally {
      setUploading(false);
    }
  }, [onUpload, preview, uploading, handleCancel]);



  return (
    <div className="mb-4">
      <DropZone onFileSelect={processFile} resetTrigger={resetKey} />
      {(loading || uploading) && <p>{uploading ? "Processing File..." : "Processing File..."}</p>}
      {errors?.length > 0 && <ErrorReport errors={errors} />}
      {preview?.length > 0 && <PreviewTable data={preview} />}
      {preview?.length > 0 && (
        <div className="w-full flex gap-2">
          <button
            type="button"
            className="bg-blue-500 p-2 rounded-md cursor-pointer text-white"
            onClick={handleConfirm}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Confirm Update"}
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleCancel}
            disabled={uploading}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(BulkUpload)
