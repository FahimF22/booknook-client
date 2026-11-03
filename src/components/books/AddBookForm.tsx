"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiRequest, uploadImage } from "@/lib/client-api";
import type { Book } from "@/lib/types";
import BookForm from "./BookForm";

export default function AddBookForm({ user }: { user: { name: string; email: string } }) {
  const router = useRouter();
  // Changing the key gives a fresh, empty form after each successful add
  // (Next.js keeps visited pages alive, so the old values would otherwise stay).
  const [formKey, setFormKey] = useState(0);

  return (
    <BookForm
      key={formKey}
      user={user}
      submitLabel="Add Book"
      onSubmit={async (values, newImage) => {
        try {
          const image = await uploadImage(newImage!);
          const book = await apiRequest<Book>("/books", { method: "POST", body: { ...values, image } });
          toast.success(`"${book.title}" was added to the library!`);
          setFormKey((k) => k + 1);
          router.push("/my-books");
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "Could not add the book.");
          throw err; // the form shows the message too
        }
      }}
    />
  );
}
