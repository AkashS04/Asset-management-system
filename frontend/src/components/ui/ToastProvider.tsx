import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
 useEffect(() => {
    console.log("✅ Toaster MOUNTED");
    return () => {
      console.log("❌ Toaster UNMOUNTED"); // if you see this, it's the problem
    };
  }, []);

  return (
    <Toaster
      position="top-right"

        gutter={12}
  containerStyle={{
    top: 20,
    right: 20,
  }}
      toastOptions={{
        duration: 2000,
        style: {
          fontSize: "16px",
          padding: "16px 20px",
          borderRadius: "10px",
          minWidth: "300px",
        },
        success: {
          style: {
            background: "#16a34a",
            color: "#fff",
          },
        },
        error: {
          style: {
            background: "#dc2626",
            color: "#fff",
          },
        },
      }}
     />
  );
}
