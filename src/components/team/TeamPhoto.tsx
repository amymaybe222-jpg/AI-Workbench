"use client";

import { useState } from "react";
import { Users } from "lucide-react";

// Renders /team-photo.avif from /public. Falls back to a styled placeholder
// instead of a broken image icon if it's ever missing or fails to load.
export function TeamPhoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface-raised text-text-muted">
        <Users className="h-10 w-10" aria-hidden="true" />
        <p className="text-sm">The AI Workbench team</p>
      </div>
    );
  }

  return (
    <img
      src="/team-photo.avif"
      alt="The AI Workbench team"
      onError={() => setFailed(true)}
      className="aspect-[16/9] w-full rounded-2xl border border-border object-cover"
    />
  );
}
