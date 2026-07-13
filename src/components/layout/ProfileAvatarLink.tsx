"use client";

import Link from "next/link";
import { useProfile } from "@/lib/useProfile";
import { Avatar } from "@/components/ui/Avatar";

export function ProfileAvatarLink() {
  const { profile } = useProfile();
  const displayName = profile.name || "Profile";

  return (
    <Link
      href="/profile"
      aria-label={`View profile (${displayName})`}
      className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-primary transition-colors hover:border-primary/40"
    >
      <Avatar name={displayName} avatarDataUrl={profile.avatarDataUrl} className="h-11 w-11 text-xs" />
    </Link>
  );
}
