import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Log in to borrow books and manage your shelf.">
      <Suspense fallback={<span className="loading loading-spinner loading-lg mx-auto text-primary" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
