"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function LikeButton({
  isLiked,
  likeCount,
  onToggle,
}: {
  isLiked: boolean;
  likeCount: number;
  onToggle: () => void;
}) {
  const [pulse, setPulse] = useState(false);

  function toggle() {
    if (!isLiked) {
      setPulse(true);
      setTimeout(() => setPulse(false), 350);
    }
    onToggle();
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
      <Heart
        className={cn("h-3.5 w-3.5", isLiked && "fill-current", pulse && "animate-heart-pop")}
        aria-hidden="true"
      />
      {likeCount}
    </button>
  );
}
