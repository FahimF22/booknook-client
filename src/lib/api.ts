import type { Book } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Public book list from the Express server (always fresh)
export async function fetchBooks(params: { limit?: number; email?: string; category?: string } = {}) {
  const query = new URLSearchParams();
  if (params.limit) query.set("limit", String(params.limit));
  if (params.email) query.set("email", params.email);
  if (params.category) query.set("category", params.category);

  const res = await fetch(`${API_URL}/books${query.size ? `?${query}` : ""}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load books (${res.status})`);
  return (await res.json()) as Book[];
}
