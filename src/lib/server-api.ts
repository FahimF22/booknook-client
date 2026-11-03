import "server-only";
import { headers } from "next/headers";
import { API_URL } from "./api";
import { auth } from "./auth";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// Calls a protected Express route from a Server Component, using the logged-in user's JWT
export async function serverApi<T>(path: string): Promise<T> {
  const { token } = await auth.api.getToken({ headers: await headers() });
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, json?.message || `Request failed (${res.status})`);
  return json as T;
}
