interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white p-5 ronded w-[500px]">
            <div className="flex justify-end">
          <button className="cursor-pointer color-gray-500" onClick={onClose}>X</button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
