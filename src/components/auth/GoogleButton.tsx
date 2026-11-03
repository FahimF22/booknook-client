"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL }: { callbackURL: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    // On success the browser leaves for Google, then returns to callbackURL
    const { error } = await signIn.social({ provider: "google", callbackURL });
    if (error) {
      toast.error(error.message || "Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={handleClick} disabled={loading} className="btn btn-outline w-full border-base-300">
      {loading ? <span className="loading loading-spinner loading-sm" /> : <FcGoogle className="h-5 w-5" />}
      Continue with Google
    </button>
  );
}

export function OrDivider() {
  return <div className="divider my-0 text-sm text-base-content/60">or</div>;
}
