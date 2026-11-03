import type { Book } from "@/lib/types";
import BookCard from "./BookCard";

// 1 per row on phones, 2 on tablets, 3 on desktop
export default function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
