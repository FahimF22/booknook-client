"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import toast from "react-hot-toast";
import { LuMenu } from "react-icons/lu";
import { logoutAction } from "@/app/actions/auth";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { authClient, useSession } from "@/lib/auth-client";
import UserMenu from "./UserMenu";

const links = [
  { href: "/", label: "Home", private: false },
  { href: "/books", label: "All Books", private: false },
  { href: "/add-book", label: "Add Book", private: true },
  { href: "/my-books", label: "My Books", private: true },
  { href: "/my-borrows", label: "My Borrows", private: true },
];

// Reading the current URL needs a Suspense boundary on pages with dynamic parts (Next.js 16).
// The placeholder only shows the logo, for the brief moment before the real navbar is ready.
export default function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
          <nav className="navbar page-container min-h-16">
            <Logo />
          </nav>
        </header>
      }
    >
      <NavbarContent />
    </Suspense>
  );
}

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  const handleLogout = async () => {
    await logoutAction(); // also clears pages cached while logged in
    authClient.$store.notify("$sessionSignal");
    toast.success("You have been logged out. See you soon!");
    router.push("/");
  };

  const visibleLinks = links.filter((l) => !l.private || user);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const navItems = visibleLinks.map((l) => (
    <li key={l.href}>
      <Link
        href={l.href}
        className={isActive(l.href) ? "bg-primary/10 font-semibold text-primary" : "font-medium"}
      >
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="navbar page-container min-h-16 gap-2">
        <div className="navbar-start gap-1">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
              <LuMenu className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-56 gap-1 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
            >
              {navItems}
              {!user && !isPending && (
                <li className="sm:hidden">
                  <Link href="/register" className="font-medium">
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navItems}</ul>
        </div>

        <div className="navbar-end gap-2">
          <ThemeToggle />
          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full" aria-label="Loading account" />
          ) : user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <>
              <Link href="/login" className="btn btn-primary btn-sm sm:btn-md">
                Login
              </Link>
              <Link href="/register" className="btn btn-outline btn-primary hidden sm:inline-flex">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
