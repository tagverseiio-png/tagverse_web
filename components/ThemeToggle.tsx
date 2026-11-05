"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  lightText?: boolean;
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  lightText = true,
  className = "",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 rounded-full opacity-0 pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
        showLabel ? "px-3.5 py-2 text-xs font-medium" : "h-9 w-9"
      } ${
        lightText || isDark
          ? "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
          : "border border-black/15 bg-black/5 text-black hover:border-black/30 hover:bg-black/10"
      } ${className}`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {/* Sun Icon (shown when dark, click to switch to light) */}
        <svg
          className={`h-4 w-4 transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-amber-300"
              : "-rotate-90 scale-0 opacity-0 absolute"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon Icon (shown when light, click to switch to dark) */}
        <svg
          className={`h-4 w-4 transition-all duration-500 ${
            !isDark
              ? "rotate-0 scale-100 opacity-100 text-purple-600"
              : "rotate-90 scale-0 opacity-0 absolute"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>

      {showLabel && (
        <span className="font-mono-g text-[11px] uppercase tracking-wider">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
