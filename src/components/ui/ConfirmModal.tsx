import Modal from "./Modal";

interface props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export default function ConfirmModal({ isOpen, onClose, onConfirm }: props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-3 ">Confirm Delete</h2>
      <p className="mb-4">Are you sure you want to delete this asset?</p>
      <div className="flex justify-end gap-2">
        <button
        type="button"
          onClick={onClose}
          className="bg-gray-300 px-3 py-1 cursor-pointer rounded"
        >
          Cancel
        </button>
        <button
        type="button"
          onClick={onConfirm}
          className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
