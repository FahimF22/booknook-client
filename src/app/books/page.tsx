import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BookGrid from "@/components/books/BookGrid";
import LoadError from "@/components/ui/LoadError";
import Spinner from "@/components/ui/Spinner";
import { fetchBooks } from "@/lib/api";
import { CATEGORIES, type Category } from "@/lib/types";

export const metadata: Metadata = { title: "All Books" };

export default function AllBooksPage(props: PageProps<"/books">) {
  return (
    <section className="section page-container">
      <div className="text-center">
        <p className="font-semibold uppercase tracking-widest text-secondary">The whole shelf</p>
        <h1 className="section-title mt-2">All Books</h1>
        <p className="section-subtitle mx-auto">
          Every book shared by the BookNook community. Open one to see the details and borrow it.
        </p>
      </div>

      <Suspense fallback={<Spinner label="Loading books..." />}>
        <BookList searchParams={props.searchParams} />
      </Suspense>
    </section>
  );
}

async function BookList({ searchParams }: { searchParams: PageProps<"/books">["searchParams"] }) {
  const param = (await searchParams).category;
  const category = CATEGORIES.find((c) => c === param) as Category | undefined;
  const books = await fetchBooks({ category }).catch(() => null);

  return (
    <>
      <nav aria-label="Filter by category" className="mt-10 flex flex-wrap justify-center gap-2">
        {[undefined, ...CATEGORIES].map((c) => {
          const active = c === category;
          return (
            <Link
              key={c ?? "all"}
              href={c ? `/books?category=${c}` : "/books"}
              aria-current={active ? "page" : undefined}
              className={`btn btn-sm rounded-full ${active ? "btn-primary" : "btn-ghost border-base-300"}`}
            >
              {c ?? "All"}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10">
        {!books ? (
          <LoadError message="We couldn't load the books right now. Please try again in a moment." />
        ) : books.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-base-content/70">
              {category ? `No ${category} books yet.` : "No books yet."} Be the first to share one!
            </p>
            <Link href="/add-book" className="btn btn-primary mt-6">
              Add a Book
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-base-content/60">
              Showing {books.length} {books.length === 1 ? "book" : "books"}
              {category ? ` in ${category}` : ""}
            </p>
            <BookGrid books={books} />
          </>
        )}
      </div>
    </>
  );
}
