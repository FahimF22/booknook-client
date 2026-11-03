"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuUndo2 } from "react-icons/lu";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { apiRequest } from "@/lib/client-api";
import type { Borrow } from "@/lib/types";

const formatDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function MyBorrowsTable({ initialBorrows }: { initialBorrows: Borrow[] }) {
  // Show the latest list from the server; only remember returns made on this page
  const [returnedIds, setReturnedIds] = useState<string[]>([]);
  const borrows = initialBorrows.filter((b) => !returnedIds.includes(b._id));
  const [toReturn, setToReturn] = useState<Borrow | null>(null);
  const [busy, setBusy] = useState(false);

  const confirmReturn = async () => {
    if (!toReturn) return;
    setBusy(true);
    try {
      await apiRequest(`/borrows/${toReturn._id}`, { method: "DELETE" });
      setReturnedIds((ids) => [...ids, toReturn._id]);
      toast.success(`Thanks! "${toReturn.bookTitle}" is back on the shelf.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not return the book.");
    } finally {
      setToReturn(null);
      setBusy(false);
    }
  };

  const modal = (
    <ConfirmModal
      open={!!toReturn}
      title="Return this book?"
      confirmLabel="Return Book"
      tone="primary"
      busy={busy}
      onConfirm={confirmReturn}
      onClose={() => !busy && setToReturn(null)}
    >
      <p>
        <strong className="text-base-content">&ldquo;{toReturn?.bookTitle}&rdquo;</strong> will go back on the shelf so
        another reader can borrow it.
      </p>
    </ConfirmModal>
  );

  if (!borrows.length) {
    return (
      <div className="rounded-box border border-dashed border-base-300 py-16 text-center">
        <p className="text-lg text-base-content/70">You don&apos;t have any borrowed books right now.</p>
        <Link href="/books" className="btn btn-primary mt-6">
          Browse Books
        </Link>
        {modal}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm">
      {modal}
      <table className="table">
        <thead className="bg-base-200 text-sm text-base-content">
          <tr>
            <th>Image</th>
            <th>Title</th>
            {/* On phones the dates move under the title so the table fits the screen */}
            <th className="hidden sm:table-cell">Borrow Date</th>
            <th className="hidden sm:table-cell">Return Date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow) => (
            <tr key={borrow._id} className="hover:bg-base-200/50">
              <td>
                <div className="relative h-16 w-11 overflow-hidden rounded-md bg-base-200 sm:h-20 sm:w-14">
                  <Image src={borrow.bookImage} alt={`Cover of ${borrow.bookTitle}`} fill sizes="56px" className="object-cover" />
                </div>
              </td>
              <td>
                <Link href={`/books/${borrow.bookId}`} className="line-clamp-2 font-serif text-lg font-semibold leading-snug hover:text-primary">
                  {borrow.bookTitle}
                </Link>
                <dl className="mt-1 text-xs text-base-content/70 sm:hidden">
                  <div>
                    <dt className="inline">Borrowed: </dt>
                    <dd className="inline">{formatDate(borrow.borrowDate)}</dd>
                  </div>
                  <div>
                    <dt className="inline">Return by: </dt>
                    <dd className="inline font-medium text-base-content">{formatDate(borrow.returnDate)}</dd>
                  </div>
                </dl>
              </td>
              <td className="hidden whitespace-nowrap text-base-content/70 sm:table-cell">{formatDate(borrow.borrowDate)}</td>
              <td className="hidden whitespace-nowrap font-medium sm:table-cell">{formatDate(borrow.returnDate)}</td>
              <td className="text-right">
                <button onClick={() => setToReturn(borrow)} className="btn btn-primary btn-sm">
                  <LuUndo2 /> <span className="hidden sm:inline">Return Book</span>
                  <span className="sm:hidden">Return</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
