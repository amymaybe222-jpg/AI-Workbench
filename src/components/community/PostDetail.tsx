"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Send } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { useCommunityPosts } from "@/lib/useCommunityPosts";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS, DEFAULT_PROFILE } from "@/lib/storageKeys";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export function PostDetail({ postId }: { postId: string }) {
  const { getPost, hydrated, likedIds, toggleLike, addComment } = useCommunityPosts();
  const [profile] = useLocalStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const [comment, setComment] = useState("");

  const post = getPost(postId);

  if (!hydrated) {
    return <div className="h-40 animate-pulse rounded-xl border border-border bg-surface" />;
  }

  if (!post) {
    return (
      <Card className="py-14 text-center">
        <p className="text-sm font-medium text-text">This post could not be found.</p>
        <LinkButton href="/community" variant="outline" className="mt-4">
          Back to Community
        </LinkButton>
      </Card>
    );
  }

  const isLiked = likedIds.includes(post.id);

  function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(post!.id, { author: profile.name, role: profile.role, body: comment.trim() });
    setComment("");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/community"
        className="focus-ring mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Community
      </Link>

      <Card>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
            {initials(post.author)}
          </span>
          <div>
            <p className="text-sm font-medium text-text">{post.author}</p>
            <p className="text-xs text-text-muted">
              {post.role} · {post.team} · {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        <span className="mt-5 inline-flex w-fit items-center rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
          {post.tool}
        </span>

        <h1 className="mt-2 text-xl font-semibold text-text sm:text-2xl">{post.title}</h1>
        <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-text-muted sm:text-lg">{post.body}</p>

        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => toggleLike(post.id)}
            aria-pressed={isLiked}
            className={cn(
              "focus-ring flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm transition-colors",
              isLiked ? "text-accent" : "text-text-muted hover:text-accent"
            )}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} aria-hidden="true" />
            {post.likes} {post.likes === 1 ? "like" : "likes"}
          </button>
          <span className="text-sm text-text-muted">
            {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
          </span>
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-muted">
          Comments ({post.comments.length})
        </h2>
        <div className="space-y-4">
          {post.comments.map((c) => (
            <Card key={c.id} className="bg-surface-raised">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {initials(c.author)}
                </span>
                <p className="text-sm font-medium text-text">{c.author}</p>
                <p className="text-xs text-text-muted">{c.role}</p>
                <span className="ml-auto text-xs text-text-muted">{formatDate(c.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{c.body}</p>
            </Card>
          ))}
          {post.comments.length === 0 && (
            <p className="text-sm text-text-muted">No comments yet — be the first to give feedback.</p>
          )}
        </div>

        <form onSubmit={handleComment} className="mt-6">
          <label htmlFor="comment-body" className="text-xs font-medium text-text-muted">
            Add a comment as {profile.name}
          </label>
          <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
            <textarea
              id="comment-body"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share feedback or a related tip…"
              className="focus-ring w-full resize-y rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text placeholder:text-text-muted/70 focus:border-primary"
            />
            <Button type="submit" className="shrink-0 sm:self-end" disabled={!comment.trim()}>
              <Send className="h-4 w-4" aria-hidden="true" />
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
