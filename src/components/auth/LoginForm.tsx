"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { signIn } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import GoogleButton, { OrDivider } from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const redirectParam = safeRedirect(useSearchParams().get("redirect"), "");
  const destination = redirectParam || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn.email({ email: email.trim(), password });
    setLoading(false);

    if (error) {
      const message =
        error.code === "INVALID_EMAIL_OR_PASSWORD"
          ? "Wrong email or password. Please try again."
          : error.message || "Login failed. Please try again.";
      setError(message);
      toast.error(message);
      return;
    }

    setPassword("");
    toast.success("Welcome back to BookNook!");
    router.push(destination);
    router.refresh();
  };

  // Password reset is intentionally not built (assignment note)
  const handleForgotPassword = () => {
    toast("Password reset is coming soon. For now, please contact hello@booknook.app.", { icon: "📮" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="form-control w-full">
          <span className="label-text mb-1.5 block font-medium">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input input-bordered w-full"
            autoComplete="email"
          />
        </label>

        <div className="w-full">
          <label htmlFor="login-password" className="label-text mb-1.5 block font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="input input-bordered w-full pr-12"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="btn btn-ghost btn-sm btn-circle absolute right-2 top-1/2 -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <LuEyeOff /> : <LuEye />}
            </button>
          </div>
          <div className="mt-2 text-right">
            <button type="button" onClick={handleForgotPassword} className="link link-hover text-sm text-primary">
              Forget Password?
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          Login
        </button>
      </form>

      <OrDivider />
      <GoogleButton callbackURL={destination} />

      <p className="text-center text-sm text-base-content/70">
        New to BookNook?{" "}
        <Link
          href={redirectParam ? `/register?redirect=${encodeURIComponent(redirectParam)}` : "/register"}
          className="link link-primary font-semibold"
        >
          Register
        </Link>
      </p>
    </>
  );
}
