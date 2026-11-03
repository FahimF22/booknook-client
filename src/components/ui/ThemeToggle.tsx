"use client";

import { useSyncExternalStore } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export const LIGHT = "booknook";
export const DARK = "booknook-dark";

// The theme lives on <html data-theme>, set by the script in layout.tsx.
// Watch that attribute so the icon always matches.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = () => document.documentElement.dataset.theme ?? LIGHT;
const getServerTheme = () => null;

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const toggle = () => {
    const next = theme === DARK ? LIGHT : DARK;
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label={theme === DARK ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === null ? (
        <span className="h-5 w-5" />
      ) : theme === DARK ? (
        <LuSun className="h-5 w-5" />
      ) : (
        <LuMoon className="h-5 w-5" />
      )}
    </button>
  );
}
