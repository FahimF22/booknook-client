import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { LuArrowRight } from "react-icons/lu";
import BookGrid from "@/components/books/BookGrid";
import LoadError from "@/components/ui/LoadError";
import Reveal from "@/components/ui/Reveal";
import Spinner from "@/components/ui/Spinner";
import { fetchBooks } from "@/lib/api";

export default function NewArrivals() {
  return (
    <section className="section page-container">
      <Reveal className="text-center">
        <p className="font-semibold uppercase tracking-widest text-secondary">Fresh on the shelf</p>
        <h2 className="section-title mt-2">New Arrivals</h2>
        <p className="section-subtitle mx-auto">The latest books our readers have added to the BookNook library.</p>
      </Reveal>

      <div className="mt-12">
        <Suspense fallback={<Spinner label="Loading new arrivals..." />}>
          <LatestBooks />
        </Suspense>
      </div>

      <div className="mt-12 text-center">
        <Link href="/books" className="btn btn-outline btn-primary btn-lg">
          See All Books <LuArrowRight />
        </Link>
      </div>
    </section>
  );
}

async function LatestBooks() {
  await connection(); // load fresh on every visit
  const books = await fetchBooks({ limit: 6 }).catch(() => null);

  if (!books) return <LoadError message="We couldn't load the latest books right now. Please try again in a moment." />;
  if (!books.length) {
    return <p className="text-center text-base-content/70">No books yet. Be the first to add one!</p>;
  }
  return <BookGrid books={books} />;
}
