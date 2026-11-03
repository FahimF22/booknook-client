import { cacheLife } from "next/cache";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import Logo from "@/components/ui/Logo";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/add-book", label: "Add a Book" },
  { href: "/my-borrows", label: "My Borrows" },
];

const socials = [
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://x.com", label: "X", icon: FaXTwitter },
  { href: "https://instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://github.com", label: "GitHub", icon: FaGithub },
];

// Cached for a day so the page can still be prebuilt (Next.js 16 cache components)
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-200">
      <div className="page-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm leading-relaxed text-base-content/70">
            A small community library where readers share the books on their shelves. Add a book, borrow a
            book, return a book.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn btn-circle btn-sm border-base-300 bg-base-100 hover:border-primary hover:bg-primary hover:text-primary-content"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-base-content/70 transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-base-content/70">
            <li className="flex items-start gap-3">
              <LuMail className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:hello@booknook.app" className="hover:text-primary">
                hello@booknook.app
              </a>
            </li>
            <li className="flex items-start gap-3">
              <LuPhone className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <a href="tel:+8801712345678" className="hover:text-primary">
                +880 1712-345678
              </a>
            </li>
            <li className="flex items-start gap-3">
              <LuMapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span>House 12, Road 5, Dhanmondi, Dhaka 1205</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-300">
        <p className="page-container py-5 text-center text-sm text-base-content/60">
          © <CurrentYear /> BookNook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
