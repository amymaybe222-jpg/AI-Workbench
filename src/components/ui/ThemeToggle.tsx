"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { STORAGE_KEYS } from "@/lib/storageKeys";

type Theme = "light" | "dark";

export function ThemeToggle({ className }: { className?: string }) {
  // Starts unresolved so the first client render matches the server render
  // (see the blocking init script in layout.tsx, which already set the real
  // class on <html> before paint) — avoids a hydration mismatch.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(STORAGE_KEYS.theme, next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:border-primary/40 hover:text-primary",
        className
      )}
    >
      <span className="relative h-[18px] w-[18px]">
        <Sun
          className={cn(
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-300 ease-out",
            isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
          )}
          aria-hidden="true"
        />
        <Moon
          className={cn(
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-300 ease-out",
            isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
