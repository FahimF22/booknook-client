"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuBookmarkPlus, LuCalendarClock } from "react-icons/lu";
import { apiRequest } from "@/lib/client-api";
import type { Borrow } from "@/lib/types";

const formatDate = (d: string | Date) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function BorrowButton({
  book,
  user,
  available,
}: {
  book: { _id: string; title: string };
  user: { name: string; email: string };
  available: boolean;
}) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [saving, setSaving] = useState(false);
  const [returnBy, setReturnBy] = useState("");

  const openModal = () => {
    setReturnBy(formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)));
    dialog.current?.showModal();
  };

  if (!available) {
    return (
      <button disabled className="btn btn-lg w-full sm:w-auto">
        Not Available
      </button>
    );
  }

  const confirmBorrow = async () => {
    setSaving(true);
    try {
      const borrow = await apiRequest<Borrow>("/borrows", { method: "POST", body: { bookId: book._id } });
      toast.success(`You borrowed "${book.title}". Please return it by ${formatDate(borrow.returnDate)}.`);
      dialog.current?.close();
      router.refresh(); // show the new copy count
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not borrow this book.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button onClick={openModal} className="btn btn-primary btn-lg w-full sm:w-auto">
        <LuBookmarkPlus /> Borrow This Book
      </button>

      <dialog ref={dialog} className="modal modal-bottom sm:modal-middle" aria-labelledby="borrow-title">
        <div className="modal-box">
          <h3 id="borrow-title" className="font-serif text-2xl font-semibold">
            Borrow this book
          </h3>
          <p className="mt-1 text-base-content/70">&ldquo;{book.title}&rdquo;</p>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              confirmBorrow();
            }}
          >
            <label>
              <span className="mb-1.5 block font-medium">Your Name</span>
              <input readOnly value={user.name} className="input input-bordered w-full bg-base-200 text-base-content/70" />
            </label>
            <label>
              <span className="mb-1.5 block font-medium">Your Email</span>
              <input readOnly value={user.email} className="input input-bordered w-full bg-base-200 text-base-content/70" />
            </label>
            <p className="flex items-center gap-2 rounded-lg bg-accent/15 px-3 py-2 text-sm">
              <LuCalendarClock className="h-4 w-4 shrink-0 text-secondary" />
              You can keep it for 7 days, until {returnBy}.
            </p>

            <div className="modal-action mt-2">
              <button type="button" onClick={() => dialog.current?.close()} className="btn btn-ghost" disabled={saving}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving && <span className="loading loading-spinner loading-sm" />}
                Confirm Borrow
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close">close</button>
        </form>
      </dialog>
    </>
  );
}
