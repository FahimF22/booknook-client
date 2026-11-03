import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LuArrowLeft } from "react-icons/lu";
import EditBookForm from "@/components/books/EditBookForm";
import LoadError from "@/components/ui/LoadError";
import Spinner from "@/components/ui/Spinner";
import { ApiError, serverApi } from "@/lib/server-api";
import { requireUser } from "@/lib/session";
import type { Book } from "@/lib/types";

export const metadata: Metadata = { title: "Edit Book" };

export default function EditBookPage(props: PageProps<"/my-books/[id]/edit">) {
  return (
    <section className="section page-container">
      <Link href="/my-books" className="btn btn-ghost btn-sm mb-6 gap-2">
        <LuArrowLeft /> Back to My Books
      </Link>
      <div className="text-center">
        <h1 className="section-title">Edit Book</h1>
        <p className="section-subtitle mx-auto">Update the details below and save your changes.</p>
      </div>
      <div className="card mx-auto mt-10 max-w-3xl border border-base-300 bg-base-100 shadow-xl shadow-base-300/40">
        <div className="card-body p-6 sm:p-8">
          <Suspense fallback={<Spinner label="Loading book..." />}>
            <EditContent params={props.params} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function EditContent({ params }: { params: PageProps<"/my-books/[id]/edit">["params"] }) {
  const { id } = await params;
  const user = await requireUser(`/my-books/${id}/edit`);

  let book: Book;
  try {
    book = await serverApi<Book>(`/books/${id}`);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 400)) notFound();
    return <LoadError message="We couldn't load this book right now. Please try again in a moment." />;
  }

  if (book.addedBy.email !== user.email) {
    return <LoadError message="You can only edit books you added." />;
  }
  return <EditBookForm book={book} user={{ name: user.name, email: user.email }} />;
}
