import type { Book } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import BookCard from "./BookCard";

// 1 per row on phones, 2 on tablets, 3 on desktop
export default function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {books.map((book, i) => (
        // h-full keeps every card the same height inside the animated wrapper
        <Reveal key={book._id} delay={(i % 3) * 0.08} className="h-full">
          <BookCard book={book} />
        </Reveal>
      ))}
    </div>
  );
}
