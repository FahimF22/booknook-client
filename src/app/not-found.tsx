import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowLeft, LuLibrary } from "react-icons/lu";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="section page-container">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-serif text-8xl font-semibold leading-none text-primary sm:text-9xl">404</p>
        <h1 className="section-title mt-6">This page is off the shelf</h1>
        <p className="section-subtitle mx-auto">
          We looked in every aisle but couldn&apos;t find the page you wanted. It may have been moved, or the link might
          be wrong.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary btn-lg">
            <LuArrowLeft /> Back to Home
          </Link>
          <Link href="/books" className="btn btn-outline btn-primary btn-lg">
            <LuLibrary /> Browse Books
          </Link>
        </div>
      </div>
    </section>
  );
}
