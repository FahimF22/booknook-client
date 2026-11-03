"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu } from "react-icons/lu";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import UserMenu, { type NavUser } from "./UserMenu";

const links = [
  { href: "/", label: "Home", private: false },
  { href: "/books", label: "All Books", private: false },
  { href: "/add-book", label: "Add Book", private: true },
  { href: "/my-books", label: "My Books", private: true },
  { href: "/my-borrows", label: "My Borrows", private: true },
];

export default function Navbar() {
  const pathname = usePathname();
  // Connected to BetterAuth in the authentication step
  const user = null as NavUser | null;
  const handleLogout = () => {};

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
              {!user && (
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
          {user ? (
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
