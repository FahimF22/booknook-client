"use client";

import { Toaster } from "react-hot-toast";

// Toasts follow the active DaisyUI theme colors
export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "var(--color-base-100)",
          color: "var(--color-base-content)",
          border: "1px solid var(--color-base-300)",
          borderRadius: "0.75rem",
          boxShadow: "0 10px 30px -10px rgb(0 0 0 / 0.25)",
        },
        success: { iconTheme: { primary: "var(--color-success)", secondary: "var(--color-success-content)" } },
        error: { iconTheme: { primary: "var(--color-error)", secondary: "var(--color-error-content)" } },
      }}
    />
  );
}
