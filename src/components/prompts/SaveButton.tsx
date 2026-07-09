"use client";

import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storageKeys";

export function SaveButton({ promptId }: { promptId: string }) {
  const [saved, setSaved] = useLocalStorage<string[]>(STORAGE_KEYS.savedPrompts, []);
  const isSaved = saved.includes(promptId);

  function toggle() {
    setSaved((prev) => (prev.includes(promptId) ? prev.filter((id) => id !== promptId) : [...prev, promptId]));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove prompt from saved" : "Save prompt"}
      className={cn(
        "focus-ring inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-150",
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
