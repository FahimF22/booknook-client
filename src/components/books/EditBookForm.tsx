"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiRequest, uploadImage } from "@/lib/client-api";
import type { Book } from "@/lib/types";
import BookForm from "./BookForm";

export default function EditBookForm({ book, user }: { book: Book; user: { name: string; email: string } }) {
  const router = useRouter();

  return (
    <BookForm
      // Keyed on the saved values, so the form always starts from the latest data
      key={[book._id, book.title, book.author, book.category, book.totalCopies, book.image, book.description].join("|")}
      user={user}
      initial={book}
      submitLabel="Save Changes"
      onSubmit={async (values, newImage) => {
        try {
          // Keep the current cover unless a new one was chosen
          const image = newImage ? await uploadImage(newImage) : book.image;
          await apiRequest<Book>(`/books/${book._id}`, { method: "PATCH", body: { ...values, image } });
          toast.success(`"${values.title}" was updated.`);
          router.push("/my-books");
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "Could not save your changes.");
          throw err;
        }
      }}
    />
  );
}
