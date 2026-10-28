"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

// A button that switches between light and dark mode.
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      className="rounded-full border border-slate-300 p-2 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
    >
      {/* Light mode shows the moon, dark mode shows the sun */}
      <FiMoon className="h-5 w-5 dark:hidden" />
      <FiSun className="hidden h-5 w-5 dark:block" />
    </button>
  );
}
