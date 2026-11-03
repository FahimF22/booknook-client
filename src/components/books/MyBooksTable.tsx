"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuEye, LuPencil } from "react-icons/lu";
import type { Book } from "@/lib/types";

const formatDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function MyBooksTable({ initialBooks }: { initialBooks: Book[] }) {
  // Always show the latest list from the server; only remember deletions made on this page
  const [deletedIds] = useState<string[]>([]);
  const books = initialBooks.filter((b) => !deletedIds.includes(b._id));

  if (!books.length) {
    return (
      <div className="rounded-box border border-dashed border-base-300 py-16 text-center">
        <p className="text-lg text-base-content/70">You haven&apos;t added any books yet.</p>
        <Link href="/add-book" className="btn btn-primary mt-6">
          Add Your First Book
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm">
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
                <div className="flex justify-end gap-2">
                  <Link href={`/books/${book._id}`} className="btn btn-ghost btn-sm btn-square" aria-label={`View ${book.title}`}>
                    <LuEye />
                  </Link>
                  <Link href={`/my-books/${book._id}/edit`} className="btn btn-outline btn-primary btn-sm">
                    <LuPencil /> Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
