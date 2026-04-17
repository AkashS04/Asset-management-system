interface ModalProps {
  isOpen:boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white p-5 rounded w-[500px]">
            <div className="flex justify-end">
          <button type="button" className="cursor-pointer text-gray-500" onClick={onClose}>✖</button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
