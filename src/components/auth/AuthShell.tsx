import type { ReactNode } from "react";
import { LogoMark } from "@/components/ui/Logo";

// Shared frame for the Login and Register pages
export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="section page-container">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <LogoMark className="mx-auto h-12 w-12" />
          <h1 className="section-title mt-5">{title}</h1>
          <p className="mt-2 text-base-content/70">{subtitle}</p>
        </div>
        <div className="card mt-8 border border-base-300 bg-base-100 shadow-xl shadow-base-300/40">
          <div className="card-body gap-5 p-6 sm:p-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
