import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import type { Book } from "@/lib/types";

// Same size for every card: fixed cover ratio, clamped title, button pinned to the bottom
export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="card group h-full overflow-hidden border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="relative aspect-[3/4] w-full bg-base-200">
        <Image
          src={book.image}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="badge badge-accent absolute left-3 top-3 font-medium shadow">{book.category}</span>
      </figure>
      <div className="card-body flex-1 gap-1 p-5">
        <h3 className="line-clamp-2 min-h-[3.5rem] font-serif text-xl font-semibold leading-7">{book.title}</h3>
        <p className="truncate text-base-content/70">by {book.author}</p>
        <div className="mt-auto pt-4">
          <Link href={`/books/${book._id}`} className="btn btn-primary w-full">
            View Details <LuArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
