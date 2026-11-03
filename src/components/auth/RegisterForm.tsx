"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { LuCheck, LuEye, LuEyeOff, LuX } from "react-icons/lu";
import { signUp } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import GoogleButton, { OrDivider } from "./GoogleButton";

const passwordRules = [
  { label: "At least one uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "At least one lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
];

export default function RegisterForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"), "");

  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const failedRules = passwordRules.filter((r) => !r.test(form.password));
  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError("");

    if (failedRules.length) {
      const message = `Password needs: ${failedRules.map((r) => r.label.toLowerCase()).join(", ")}`;
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      image: form.image.trim(),
      password: form.password,
    });
    setLoading(false);

    if (error) {
      const message =
        error.code === "USER_ALREADY_EXISTS" || error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
          ? "An account with this email already exists. Please log in."
          : error.message || "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
      return;
    }

    // Next.js keeps visited pages alive in the background, so clear the password
    setForm({ name: "", email: "", image: "", password: "" });
    setTouched(false);
    toast.success("Account created! Please log in.");
    router.push(redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="form-control w-full">
          <span className="label-text mb-1.5 block font-medium">Name</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Your full name"
            className="input input-bordered w-full"
            autoComplete="name"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1.5 block font-medium">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className="input input-bordered w-full"
            autoComplete="email"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1.5 block font-medium">Photo URL</span>
          <input
            type="url"
            required
            value={form.image}
            onChange={update("image")}
            placeholder="https://example.com/your-photo.jpg"
            className="input input-bordered w-full"
          />
        </label>

        <div className="w-full">
          <label htmlFor="register-password" className="label-text mb-1.5 block font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={update("password")}
              onBlur={() => form.password && setTouched(true)}
              placeholder="Create a password"
              className={`input input-bordered w-full pr-12 ${touched && failedRules.length ? "input-error" : ""}`}
              autoComplete="new-password"
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
          <ul className="mt-2.5 space-y-1 text-sm">
            {passwordRules.map((rule) => {
              const ok = rule.test(form.password);
              const color = ok ? "text-success" : touched ? "text-error" : "text-base-content/60";
              return (
                <li key={rule.label} className={`flex items-center gap-2 ${color}`}>
                  {ok ? <LuCheck className="h-4 w-4" /> : <LuX className="h-4 w-4" />}
                  {rule.label}
                </li>
              );
            })}
          </ul>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary mt-1 w-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          Register
        </button>
      </form>

      <OrDivider />
      <GoogleButton callbackURL={redirect || "/"} />

      <p className="text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link
          href={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login"}
          className="link link-primary font-semibold"
        >
          Login
        </Link>
      </p>
    </>
  );
}
