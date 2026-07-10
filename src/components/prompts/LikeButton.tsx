"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storageKeys";

export function LikeButton({ promptId, baseLikes }: { promptId: string; baseLikes: number }) {
  const [likedIds, setLikedIds] = useLocalStorage<string[]>(STORAGE_KEYS.likedPrompts, []);
  const isLiked = likedIds.includes(promptId);
  const displayLikes = baseLikes + (isLiked ? 1 : 0);

  function toggle() {
    setLikedIds((prev) => (prev.includes(promptId) ? prev.filter((id) => id !== promptId) : [...prev, promptId]));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isLiked}
      aria-label={isLiked ? "Remove your like from this prompt" : "Like this prompt — I've used or approve of it"}
      className={cn(
        "focus-ring inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-150",
        isLiked
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-border bg-surface-raised text-text-muted hover:border-accent/40 hover:text-accent"
      )}
    >
      <Heart className={cn("h-3.5 w-3.5", isLiked && "fill-current")} aria-hidden="true" />
      {displayLikes}
    </button>
  );
}
