import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LuArrowLeft, LuBookCopy, LuCalendar, LuCircleCheck, LuUser } from "react-icons/lu";
import BorrowButton from "@/components/books/BorrowButton";
import LoadError from "@/components/ui/LoadError";
import Spinner from "@/components/ui/Spinner";
import { ApiError, serverApi } from "@/lib/server-api";
import { requireUser } from "@/lib/session";
import type { Book, Borrow } from "@/lib/types";

export const metadata: Metadata = { title: "Book Details" };

export default function BookDetailsPage(props: PageProps<"/books/[id]">) {
  return (
    <section className="section page-container">
      <Link href="/books" className="btn btn-ghost btn-sm mb-8 gap-2">
        <LuArrowLeft /> Back to All Books
      </Link>
      <Suspense fallback={<Spinner label="Loading book..." />}>
        <BookDetails params={props.params} />
      </Suspense>
    </section>
  );
}

async function BookDetails({ params }: { params: PageProps<"/books/[id]">["params"] }) {
  const { id } = await params;
  const user = await requireUser(`/books/${id}`);

  let book: Book;
  let myBorrows: Borrow[];
  try {
    [book, myBorrows] = await Promise.all([serverApi<Book>(`/books/${id}`), serverApi<Borrow[]>("/borrows")]);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 400)) notFound();
    return <LoadError message="We couldn't load this book right now. Please try again in a moment." />;
  }

  const myBorrow = myBorrows.find((b) => b.bookId === book._id);
  const available = book.totalCopies > 0;
  const added = new Date(book.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
      <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-box border border-base-300 bg-base-200 shadow-xl md:max-w-none">
        <Image
          src={book.image}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-cover"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      <div className="flex flex-col">
        <span className="badge badge-accent badge-lg font-medium">{book.category}</span>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">{book.title}</h1>
        <p className="mt-2 text-xl text-base-content/70">by {book.author}</p>

        <p className="mt-6 text-lg leading-relaxed text-base-content/80">{book.description}</p>

        <dl className="mt-8 grid gap-4 rounded-box border border-base-300 bg-base-200/60 p-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <LuUser className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <dt className="text-sm text-base-content/60">Added by</dt>
              <dd className="font-medium">{book.addedBy.name}</dd>
              <dd className="text-sm text-base-content/60">{book.addedBy.email}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <LuCalendar className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <dt className="text-sm text-base-content/60">Added on</dt>
              <dd className="font-medium">{added}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <LuBookCopy className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <dt className="text-sm text-base-content/60">Available copies</dt>
              <dd className={`font-medium ${available ? "text-success" : "text-error"}`}>
                {available ? `${book.totalCopies} available` : "None left right now"}
              </dd>
            </div>
          </div>
        </dl>

        {myBorrow && (
          <p className="mt-6 flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3 text-success">
            <LuCircleCheck className="h-5 w-5 shrink-0" />
            You have borrowed this book. Return it from My Borrows when you&apos;re done.
          </p>
        )}

        <div className="mt-8">
          <BorrowButton
            book={{ _id: book._id, title: book.title }}
            user={{ name: user.name, email: user.email }}
            available={available}
          />
        </div>
      </div>
    </article>
  );
}
