"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Our own confirm dialog (the assignment does not allow the browser's confirm()).
export default function ConfirmModal({
  open,
  title,
  children,
  confirmLabel,
  tone = "error",
  busy = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  tone?: "error" | "primary";
  busy?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  // Keep the native <dialog> in sync with the `open` prop
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog ref={dialog} className="modal modal-bottom sm:modal-middle" onClose={onClose} aria-labelledby="confirm-title">
      <div className="modal-box">
        <h3 id="confirm-title" className="font-serif text-2xl font-semibold">
          {title}
        </h3>
        <div className="mt-3 leading-relaxed text-base-content/75">{children}</div>
        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button
            type="button"
            className={`btn ${tone === "error" ? "btn-error" : "btn-primary"}`}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy && <span className="loading loading-spinner loading-sm" />}
            {confirmLabel}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close" disabled={busy}>
          close
        </button>
      </form>
    </dialog>
  );
}
