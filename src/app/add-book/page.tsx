import type { Metadata } from "next";
import { Suspense } from "react";
import AddBookForm from "@/components/books/AddBookForm";
import Spinner from "@/components/ui/Spinner";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Add Book" };

export default function AddBookPage() {
  return (
    <section className="section page-container">
      <div className="text-center">
        <p className="font-semibold uppercase tracking-widest text-secondary">Share your shelf</p>
        <h1 className="section-title mt-2">Add a Book</h1>
        <p className="section-subtitle mx-auto">Add a book you own so another reader can borrow it.</p>
      </div>
      <div className="card mx-auto mt-10 max-w-3xl border border-base-300 bg-base-100 shadow-xl shadow-base-300/40">
        <div className="card-body p-6 sm:p-8">
          <Suspense fallback={<Spinner label="Loading form..." />}>
            <AddBookContent />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function AddBookContent() {
  const user = await requireUser("/add-book");
  return <AddBookForm user={{ name: user.name, email: user.email }} />;
}
