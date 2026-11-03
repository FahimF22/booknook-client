"use client";

import Link from "next/link";
import { LuRefreshCw } from "react-icons/lu";

// Shown if something unexpected breaks while loading a page
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="section page-container">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="section-title">Something went wrong</h1>
        <p className="section-subtitle mx-auto">
          We hit a snag loading this page. Please try again. If it keeps happening, come back in a little while.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn btn-primary btn-lg">
            <LuRefreshCw /> Try Again
          </button>
          <Link href="/" className="btn btn-outline btn-primary btn-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
