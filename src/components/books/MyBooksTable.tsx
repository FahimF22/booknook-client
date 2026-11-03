"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { apiRequest } from "@/lib/client-api";
import type { Book } from "@/lib/types";

const formatDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function MyBooksTable({ initialBooks }: { initialBooks: Book[] }) {
  // Always show the latest list from the server; only remember deletions made on this page
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const books = initialBooks.filter((b) => !deletedIds.includes(b._id));
  const [toDelete, setToDelete] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await apiRequest(`/books/${toDelete._id}`, { method: "DELETE" });
      setDeletedIds((ids) => [...ids, toDelete._id]);
      toast.success(`"${toDelete.title}" was deleted.`);
      setToDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the book.");
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const modal = (
    <ConfirmModal
      open={!!toDelete}
      title="Delete this book?"
      confirmLabel="Yes, delete it"
      busy={deleting}
      onConfirm={confirmDelete}
      onClose={() => !deleting && setToDelete(null)}
    >
      <p>
        <strong className="text-base-content">&ldquo;{toDelete?.title}&rdquo;</strong> will be removed from BookNook for
        good. This can&apos;t be undone.
      </p>
    </ConfirmModal>
  );

  if (!books.length) {
    return (
      <div className="rounded-box border border-dashed border-base-300 py-16 text-center">
        <p className="text-lg text-base-content/70">You haven&apos;t added any books yet.</p>
        <Link href="/add-book" className="btn btn-primary mt-6">
          Add Your First Book
        </Link>
        {modal}
      </div>
    );
  }

  const actions = (book: Book) => (
    <>
      <Link href={`/books/${book._id}`} className="btn btn-ghost btn-sm btn-square" aria-label={`View ${book.title}`}>
        <LuEye />
      </Link>
      <Link href={`/my-books/${book._id}/edit`} className="btn btn-outline btn-primary btn-sm">
        <LuPencil /> Edit
      </Link>
      <button onClick={() => setToDelete(book)} className="btn btn-outline btn-error btn-sm">
        <LuTrash2 /> Delete
      </button>
    </>
  );

  return (
    <>
      {modal}

      {/* Phones: stacked cards so the buttons are always visible */}
      <ul className="grid gap-4 md:hidden">
        {books.map((book) => (
          <li key={book._id} className="card border border-base-300 bg-base-100 p-4 shadow-sm">
            <div className="flex gap-4">
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md bg-base-200">
                <Image src={book.image} alt={`Cover of ${book.title}`} fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 font-serif text-lg font-semibold leading-snug">{book.title}</p>
                <p className="truncate text-sm text-base-content/60">by {book.author}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-base-content/70">
                  <span className="badge badge-accent badge-outline">{book.category}</span>
                  <span>
                    {book.totalCopies} {book.totalCopies === 1 ? "copy" : "copies"}
                  </span>
                  <span>Added {formatDate(book.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2 border-t border-base-300 pt-3">{actions(book)}</div>
          </li>
        ))}
      </ul>

      {/* Tablets and up: table */}
      <div className="hidden overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm md:block">
        <table className="table">
          <thead className="bg-base-200 text-sm text-base-content">
            <tr>
              <th>Book</th>
              <th>Category</th>
              <th className="text-center">Copies</th>
              <th>Added</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-base-200/50">
                <td>
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md bg-base-200">
                      <Image src={book.image} alt={`Cover of ${book.title}`} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 font-serif text-lg font-semibold leading-snug">{book.title}</p>
                      <p className="truncate text-sm text-base-content/60">by {book.author}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-accent badge-outline whitespace-nowrap">{book.category}</span>
                </td>
                <td className="text-center font-medium">{book.totalCopies}</td>
                <td className="whitespace-nowrap text-base-content/70">{formatDate(book.createdAt)}</td>
                <td>
                  <div className="flex justify-end gap-2">{actions(book)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
