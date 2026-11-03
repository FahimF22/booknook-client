import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LuBookPlus, LuCalendar, LuLibrary, LuMail } from "react-icons/lu";
import Avatar from "@/components/ui/Avatar";
import Spinner from "@/components/ui/Spinner";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <Suspense fallback={<Spinner label="Loading your profile..." />}>
      <ProfileContent />
    </Suspense>
  );
}

async function ProfileContent() {
  const user = await requireUser("/profile");
  const joined = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="section page-container">
      <div className="mx-auto max-w-2xl">
        <h1 className="section-title text-center">My Profile</h1>
        <p className="section-subtitle mx-auto text-center">Your BookNook account at a glance.</p>

        <div className="card mt-10 border border-base-300 bg-base-100 shadow-xl shadow-base-300/40">
          <div className="card-body items-center gap-6 p-8 text-center">
            <div className="rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-100">
              <Avatar name={user.name} image={user.image} className="w-28" textClassName="text-4xl" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold">{user.name}</h2>
              <p className="mt-1 flex items-center justify-center gap-2 text-base-content/70">
                <LuMail className="h-4 w-4" /> {user.email}
              </p>
              <p className="mt-1 flex items-center justify-center gap-2 text-sm text-base-content/60">
                <LuCalendar className="h-4 w-4" /> Member since {joined}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/my-books" className="btn btn-primary">
                <LuLibrary /> My Books
              </Link>
              <Link href="/add-book" className="btn btn-outline btn-primary">
                <LuBookPlus /> Add a Book
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
