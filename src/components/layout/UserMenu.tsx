"use client";

import Link from "next/link";
import { LuLogOut, LuUser } from "react-icons/lu";
import Avatar from "@/components/ui/Avatar";

export interface NavUser {
  name: string;
  email: string;
  image?: string | null;
}

export default function UserMenu({ user, onLogout }: { user: NavUser; onLogout: () => void }) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Open user menu">
        <div className="rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
          <Avatar name={user.name} image={user.image} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <li className="menu-title px-3 py-2">
          <span className="block truncate text-base font-semibold text-base-content">{user.name}</span>
          <span className="block truncate text-xs font-normal text-base-content/70">{user.email}</span>
        </li>
        <li>
          <Link href="/profile">
            <LuUser /> My Profile
          </Link>
        </li>
        <li>
          <button onClick={onLogout} className="text-error">
            <LuLogOut /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
