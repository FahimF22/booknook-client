import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

// Quick check: is there a login cookie? Pages still verify the session itself on the server.
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname + search);
  return NextResponse.redirect(loginUrl);
}

// Private routes. "/books/:id" is private, but "/books" (All Books) stays public.
export const config = {
  matcher: ["/add-book", "/my-books/:path*", "/my-borrows", "/profile", "/books/:id"],
};
