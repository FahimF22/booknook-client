import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <AuthShell title="Create your account" subtitle="Join BookNook to add, borrow and return books.">
      <Suspense fallback={<span className="loading loading-spinner loading-lg mx-auto text-primary" />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
