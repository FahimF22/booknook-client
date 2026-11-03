"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// Login and logout run as Server Actions. Setting the session cookie here makes Next.js
// clear its page cache, so pages prefetched while logged out (which redirected to Login)
// are fetched again with the new login state.

export async function loginAction(email: string, password: string) {
  try {
    await auth.api.signInEmail({ body: { email, password }, headers: await headers() });
    return { ok: true as const };
  } catch (err) {
    if (err instanceof APIError) {
      return { ok: false as const, code: err.body?.code as string | undefined, message: err.body?.message ?? err.message };
    }
    return { ok: false as const, code: undefined, message: "Login failed. Please try again." };
  }
}

export async function logoutAction() {
  await auth.api.signOut({ headers: await headers() });
}
