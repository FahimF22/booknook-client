import type { Metadata } from "next";
import { Suspense } from "react";
import MyBorrowsTable from "@/components/borrows/MyBorrowsTable";
import LoadError from "@/components/ui/LoadError";
import Spinner from "@/components/ui/Spinner";
import { serverApi } from "@/lib/server-api";
import { requireUser } from "@/lib/session";
import type { Borrow } from "@/lib/types";

export const metadata: Metadata = { title: "My Borrows" };

export default function MyBorrowsPage() {
  return (
    <section className="section page-container">
      <div className="text-center md:text-left">
        <p className="font-semibold uppercase tracking-widest text-secondary">On your nightstand</p>
        <h1 className="section-title mt-2">My Borrows</h1>
        <p className="section-subtitle">Books you&apos;ve borrowed and when they&apos;re due back. Return them when you&apos;re done.</p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<Spinner label="Loading your borrowed books..." />}>
          <MyBorrowsContent />
        </Suspense>
      </div>
    </section>
  );
}

async function MyBorrowsContent() {
  await requireUser("/my-borrows");
  const borrows = await serverApi<Borrow[]>("/borrows").catch(() => null);
  if (!borrows) return <LoadError message="We couldn't load your borrowed books right now. Please try again in a moment." />;
  return <MyBorrowsTable initialBorrows={borrows} />;
}
