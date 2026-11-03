import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";
import MyBooksTable from "@/components/books/MyBooksTable";
import LoadError from "@/components/ui/LoadError";
import Spinner from "@/components/ui/Spinner";
import { fetchBooks } from "@/lib/api";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "My Books" };

export default function MyBooksPage() {
  return (
    <section className="section page-container">
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <p className="font-semibold uppercase tracking-widest text-secondary">Your shelf</p>
          <h1 className="section-title mt-2">My Books</h1>
          <p className="section-subtitle">The books you&apos;ve shared with BookNook. Edit or remove them any time.</p>
        </div>
        <Link href="/add-book" className="btn btn-primary">
          <LuPlus /> Add Book
        </Link>
      </div>
      <div className="mt-10">
        <Suspense fallback={<Spinner label="Loading your books..." />}>
          <MyBooksContent />
        </Suspense>
      </div>
    </section>
  );
}

async function MyBooksContent() {
  const user = await requireUser("/my-books");
  const books = await fetchBooks({ email: user.email }).catch(() => null);
  if (!books) return <LoadError message="We couldn't load your books right now. Please try again in a moment." />;
  return <MyBooksTable initialBooks={books} />;
}
