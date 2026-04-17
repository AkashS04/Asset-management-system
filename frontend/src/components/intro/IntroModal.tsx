import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

export default function IntroModal() {
    const [showIntro, setShowIntro] = useState(false);

useEffect(() => {
  setShowIntro(true);
}, []);
    return <Modal isOpen={showIntro} onClose={() => setShowIntro(false)}>
        <h2 className="text-lg font-semibold mb-3">
            Welcome 👋
        </h2>

        <p className="mb-4">
            Thank you for visiting this app.
            This is a demo asset tracking system built using React + TypeScript.
        </p>

        <p className="mb-4">
            Use the below credentials to login:
        </p>

        <div className="bg-gray-100 p-3 rounded mb-4">
            <p><strong>Email:</strong> admin@example.com</p>
            <p><strong>Password:</strong> 123456</p>
        </div>

        <div className="flex justify-end">
            <button
            type="button"
                onClick={() => setShowIntro(false)}
                className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded"
            >
                Continue
            </button>
        </div>
    </Modal>
}