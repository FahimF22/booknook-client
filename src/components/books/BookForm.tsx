"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { LuImagePlus } from "react-icons/lu";
import { CATEGORIES, type Book } from "@/lib/types";

export type BookFormValues = Pick<Book, "title" | "author" | "category" | "image" | "description" | "totalCopies">;

const MAX_SIZE = 5 * 1024 * 1024;

// Shared by Add Book and Edit Book. The parent decides what happens on submit.
export default function BookForm({
  user,
  initial,
  submitLabel,
  onSubmit,
}: {
  user: { name: string; email: string };
  initial?: BookFormValues;
  submitLabel: string;
  onSubmit: (values: Omit<BookFormValues, "image">, newImage: File | null) => Promise<void>;
}) {
  const [values, setValues] = useState({
    title: initial?.title ?? "",
    author: initial?.author ?? "",
    category: initial?.category ?? "",
    description: initial?.description ?? "",
    totalCopies: String(initial?.totalCopies ?? 1),
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initial?.image ?? null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (key: keyof typeof values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0] ?? null;
    setError("");
    if (!chosen) return;
    if (!chosen.type.startsWith("image/")) return setError("Please choose an image file (JPG, PNG or WebP).");
    if (chosen.size > MAX_SIZE) return setError("Image must be 5 MB or smaller.");
    setFile(chosen);
    setPreview(URL.createObjectURL(chosen));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const copies = Number(values.totalCopies);
    if (!Number.isInteger(copies) || copies < 1) return setError("Total copies must be a whole number of at least 1.");
    if (!values.category) return setError("Please choose a category.");
    if (!file && !initial?.image) return setError("Please choose a cover image.");

    setSaving(true);
    try {
      await onSubmit(
        {
          title: values.title.trim(),
          author: values.author.trim(),
          category: values.category as BookFormValues["category"],
          description: values.description.trim(),
          totalCopies: copies,
        },
        file
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      <label className="md:col-span-2">
        <span className="mb-1.5 block font-medium">Book Title</span>
        <input required value={values.title} onChange={set("title")} placeholder="e.g. The Little Prince" className="input input-bordered w-full" />
      </label>

      <label>
        <span className="mb-1.5 block font-medium">Author Name</span>
        <input required value={values.author} onChange={set("author")} placeholder="e.g. Antoine de Saint-Exupéry" className="input input-bordered w-full" />
      </label>

      <label>
        <span className="mb-1.5 block font-medium">Category</span>
        <select required value={values.category} onChange={set("category")} className="select select-bordered w-full">
          <option value="" disabled>
            Choose a category
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="mb-1.5 block font-medium">Total Copies</span>
        <input required type="number" min={1} step={1} value={values.totalCopies} onChange={set("totalCopies")} className="input input-bordered w-full" />
      </label>

      <div>
        <span className="mb-1.5 block font-medium">Book Image</span>
        <label className="flex cursor-pointer items-center gap-4 rounded-field border border-dashed border-base-300 bg-base-200/50 p-3 transition-colors hover:border-primary">
          <div className="grid h-20 w-16 shrink-0 place-items-center overflow-hidden rounded-md bg-base-300 text-base-content/50">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Cover preview" className="h-full w-full object-cover" />
            ) : (
              <LuImagePlus className="h-7 w-7" />
            )}
          </div>
          <div className="min-w-0 text-sm">
            <p className="font-medium text-primary">{preview ? "Change image" : "Choose an image"}</p>
            <p className="truncate text-base-content/60">{file ? file.name : "JPG, PNG or WebP, up to 5 MB"}</p>
          </div>
          <input type="file" accept="image/*" onChange={handleFile} className="sr-only" />
        </label>
      </div>

      <label className="md:col-span-2">
        <span className="mb-1.5 block font-medium">Short Description</span>
        <textarea
          required
          rows={4}
          value={values.description}
          onChange={set("description")}
          placeholder="What is this book about? A few lines help readers decide."
          className="textarea textarea-bordered w-full"
        />
      </label>

      <label>
        <span className="mb-1.5 block font-medium">Your Name</span>
        <input readOnly value={user.name} className="input input-bordered w-full bg-base-200 text-base-content/70" />
      </label>

      <label>
        <span className="mb-1.5 block font-medium">Your Email</span>
        <input readOnly value={user.email} className="input input-bordered w-full bg-base-200 text-base-content/70" />
      </label>

      {error && (
        <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error md:col-span-2">
          {error}
        </p>
      )}

      <button type="submit" disabled={saving} className="btn btn-primary md:col-span-2">
        {saving && <span className="loading loading-spinner loading-sm" />}
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
