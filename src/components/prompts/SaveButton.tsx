"use client";

import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export function SaveButton({ isSaved, onToggle }: { isSaved: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove prompt from saved" : "Save prompt"}
      className={cn(
        "focus-ring inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-150",
        isSaved
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-border bg-surface-raised text-text-muted hover:border-accent/40 hover:text-accent"
      )}
    >
      <Bookmark className={cn("h-3.5 w-3.5", isSaved && "fill-current")} aria-hidden="true" />
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
