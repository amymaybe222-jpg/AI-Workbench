import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("focus-ring flex items-center gap-2.5 rounded-lg", className)}
      aria-label="AI Workbench home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-mono text-sm font-bold text-white shadow-[0_4px_14px_-4px_rgba(109,93,245,0.6)] dark:shadow-[0_4px_14px_-4px_rgba(139,124,247,0.55)]">
        {"</>"}
      </span>
      <span className="font-mono text-[15px] font-semibold tracking-tight text-text">
        AI<span className="text-primary">Workbench</span>
      </span>
    </Link>
  );
}
