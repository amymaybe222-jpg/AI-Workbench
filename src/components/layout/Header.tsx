"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navItems } from "./navItems";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS, DEFAULT_PROFILE } from "@/lib/storageKeys";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { HeaderSearch } from "./HeaderSearch";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [profile] = useLocalStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const drawerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, drawerRef, () => setOpen(false));

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="focus-ring -ml-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:bg-text/5 hover:text-text xl:hidden"
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <Logo />
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "focus-ring whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-text/5 hover:text-text"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <HeaderSearch />
            <ThemeToggle />
            <Link
              href="/profile"
              aria-label={`View profile (${profile.name})`}
              className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-primary transition-colors hover:border-primary/40"
            >
              {initials(profile.name)}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        inert={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          ref={drawerRef}
          tabIndex={-1}
          className={cn(
            "absolute inset-y-0 left-0 flex w-72 max-w-[80%] flex-col border-r border-border bg-surface transition-transform duration-200 ease-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:bg-text/5 hover:text-text"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-text/5 hover:text-text"
                  )}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
