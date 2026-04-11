import { useEffect, useRef } from "react";

type props = {
  onFileSelect: (file: File) => void;
  resetTrigger: number;
};
export default function DropZone({ onFileSelect, resetTrigger }: props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [resetTrigger]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) onFileSelect(file);
  };
  return (
    <>
      <div
        onClick={handleClick}
        onDrag={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="p-[30px] border-[2px] border-dashed border-gray-300 text-center text-green cursor-pointer"
      >
        Drag & Upload File Here
        <input
          className="hidden"
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
