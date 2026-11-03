"use client";

import { API_URL } from "./api";
import { authClient } from "./auth-client";

// Calls the Express API from the browser with the user's JWT attached.
// Throws an Error with the server's message so forms can show it in a toast.
export async function apiRequest<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  const { data } = await authClient.token();
  if (!data?.token) throw new Error("Your session has expired. Please log in again.");

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${data.token}`,
      ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  }).catch(() => {
    throw new Error("Can't reach the BookNook server. Please try again in a moment.");
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Something went wrong. Please try again.");
  return json as T;
}

// Uploads a cover image to imgbb (through our own /api/upload route) and returns its URL
export async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("image", file);
  const res = await fetch("/api/upload", { method: "POST", body });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.url) throw new Error(json?.message || "Image upload failed. Please try again.");
  return json.url;
}
