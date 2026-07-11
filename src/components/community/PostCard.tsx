"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { CommunityPost } from "@/types";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function PostCard({
  post,
  isLiked,
  onToggleLike,
}: {
  post: CommunityPost;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}) {
  const [pulse, setPulse] = useState(false);

  function handleLike() {
    if (!isLiked) {
      setPulse(true);
      setTimeout(() => setPulse(false), 350);
    }
    onToggleLike(post.id);
  }

  return (
    <Card hoverable className="flex flex-col">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
          {initials(post.author)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text">{post.author}</p>
          <p className="truncate text-xs text-text-muted">
            {post.role} · {post.team}
          </p>
        </div>
        <span className="ml-auto shrink-0 text-xs text-text-muted">{timeAgo(post.createdAt)}</span>
      </div>

      <span className="mt-4 inline-flex w-fit items-center rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
        {post.tool}
      </span>

      <Link href={`/community/${post.id}`} className="focus-ring mt-2 block rounded-lg">
        <h3 className="text-base font-semibold text-text hover:text-primary">{post.title}</h3>
        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-text-muted">{post.body}</p>
      </Link>

      <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-text-muted">
        <button
          type="button"
          onClick={handleLike}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Unlike this post" : "Like this post"}
          className={cn(
            "focus-ring flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors",
            isLiked ? "text-accent" : "hover:text-accent"
          )}
        >
          <Heart className={cn("h-4 w-4", isLiked && "fill-current", pulse && "animate-heart-pop")} aria-hidden="true" />
          {post.likes}
        </button>
        <Link
          href={`/community/${post.id}`}
          className="focus-ring flex items-center gap-1.5 rounded-lg px-2 py-1 hover:text-primary"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {post.comments.length}
        </Link>
      </div>
    </Card>
  );
}
