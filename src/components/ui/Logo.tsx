import Link from "next/link";

// BookNook mark: an open book with a small bookmark ribbon
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-primary" />
      <path
        d="M20 13c-2.6-1.8-6-2.6-10-2.4v17.2c4-.2 7.4.6 10 2.4 2.6-1.8 6-2.6 10-2.4V10.6c-4-.2-7.4.6-10 2.4Z"
        className="fill-primary-content"
      />
      <path d="M20 13v17.2" className="stroke-primary" strokeWidth="1.6" />
      <path d="M24.5 11.4v7l1.8-1.4 1.8 1.4v-7.6" className="fill-accent" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="BookNook home">
      <LogoMark />
      <span className="font-serif text-2xl font-semibold tracking-tight">
        Book<span className="text-primary">Nook</span>
      </span>
    </Link>
  );
}
