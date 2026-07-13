"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Pencil, Send, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useCommunityPosts } from "@/lib/useCommunityPosts";
import { useProfile } from "@/lib/useProfile";
import { useAuth } from "@/lib/useAuth";
import { useToast } from "@/components/providers/ToastProvider";
import { NewPostForm } from "./NewPostForm";
import { cn } from "@/lib/utils";
import { CommunityComment } from "@/types";
import type { CommunityPostsInitialData } from "@/lib/community/loadCommunityPosts";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function CommentItem({
  comment,
  canEdit,
  onUpdate,
  onDelete,
}: {
  comment: CommunityComment;
  canEdit: boolean;
  onUpdate: (body: string) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment.body);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function save() {
    if (!draft.trim()) return;
    onUpdate(draft.trim());
    setEditing(false);
  }

  return (
    <Card className="bg-surface-raised">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
          {initials(comment.author)}
        </span>
        <p className="text-sm font-medium text-text">{comment.author}</p>
        <p className="text-xs text-text-muted">{comment.role}</p>
        <span className="ml-auto text-xs text-text-muted">{formatDate(comment.created_at)}</span>
        {canEdit && !editing && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setDraft(comment.body);
                setEditing(true);
              }}
              aria-label="Edit comment"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg text-text-muted hover:bg-text/5 hover:text-primary"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              aria-label="Delete comment"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg text-text-muted hover:bg-accent/10 hover:text-accent"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="mt-2 space-y-2">
          <textarea
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="focus-ring w-full resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:border-primary"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={save} disabled={!draft.trim()}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{comment.body}</p>
      )}

      <ConfirmModal
        open={confirmingDelete}
        title="Delete this comment?"
        description="This can't be undone."
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          setConfirmingDelete(false);
          onDelete();
        }}
      />
    </Card>
  );
}

export function PostDetail({
  postId,
  initialData,
}: {
  postId: string;
  initialData: CommunityPostsInitialData;
}) {
  const router = useRouter();
  const toast = useToast();
  const {
    getPost,
    hydrated,
    likedIds,
    currentUserId,
    toggleLike,
    addComment,
    updateComment,
    deleteComment,
    updatePost,
    deletePost,
  } = useCommunityPosts(initialData);
  const { profile } = useProfile();
  const { isLoggedIn, hydrated: authHydrated } = useAuth();
  const [comment, setComment] = useState("");
  const [pulse, setPulse] = useState(false);
  const [editingPost, setEditingPost] = useState(false);
  const [confirmingDeletePost, setConfirmingDeletePost] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

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
  const canEditPost = !!currentUserId && post.owner_id === currentUserId;

  function handleLike() {
    if (authHydrated && !isLoggedIn) {
      router.push(`/login?redirect=/community/${postId}`);
      return;
    }
    if (!isLiked) {
      setPulse(true);
      setTimeout(() => setPulse(false), 350);
    }
    toggleLike(post!.id);
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    setActionError(null);
    try {
      await addComment(post!.id, { author: profile.name, role: profile.role, body: comment.trim() });
      setComment("");
      toast.success("Comment posted.");
    } catch {
      setActionError("Couldn't post your comment. Please try again.");
    }
  }

  if (editingPost) {
    return (
      <div className="mx-auto max-w-2xl">
        <NewPostForm
          initial={{ title: post.title, tool: post.tool ?? "", body: post.body }}
          submitLabel="Save"
          onCancel={() => setEditingPost(false)}
          onSubmit={async (data) => {
            setActionError(null);
            try {
              await updatePost(post.id, { title: data.title, body: data.body, tags: data.tags, tool: data.tool });
              setEditingPost(false);
              toast.success("Post updated.");
            } catch {
              setActionError("Couldn't save your changes. Please try again.");
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/community"
        className="focus-ring mb-3 inline-flex min-h-11 items-center gap-1.5 py-3 text-sm font-medium text-text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Community
      </Link>

      {actionError && (
        <p role="alert" className="mb-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">
          {actionError}
        </p>
      )}

      <Card>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
            {initials(post.author)}
          </span>
          <div>
            <p className="text-sm font-medium text-text">{post.author}</p>
            <p className="text-xs text-text-muted">
              {post.role} · {post.team} · {formatDate(post.created_at)}
            </p>
          </div>
          {canEditPost && (
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => setEditingPost(true)}
                aria-label="Edit post"
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg text-text-muted hover:bg-text/5 hover:text-primary"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDeletePost(true)}
                aria-label="Delete post"
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg text-text-muted hover:bg-accent/10 hover:text-accent"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <span className="mt-5 inline-flex w-fit items-center rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
          {post.tool}
        </span>

        <h1 className="mt-2 text-xl font-semibold text-text sm:text-2xl">{post.title}</h1>
        <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-text-muted sm:text-lg">{post.body}</p>

        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
          <button
            type="button"
            onClick={handleLike}
            aria-pressed={isLiked}
            className={cn(
              "focus-ring flex min-h-11 items-center gap-1.5 rounded-lg px-2 py-1 text-sm transition-colors",
              isLiked ? "text-accent" : "text-text-muted hover:text-accent"
            )}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current", pulse && "animate-heart-pop")} aria-hidden="true" />
            {post.like_count} {post.like_count === 1 ? "like" : "likes"}
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
            <CommentItem
              key={c.id}
              comment={c}
              canEdit={!!currentUserId && c.owner_id === currentUserId}
              onUpdate={(body) =>
                updateComment(c.id, body)
                  .then(() => toast.success("Comment updated."))
                  .catch(() => setActionError("Couldn't save your comment. Please try again."))
              }
              onDelete={() =>
                deleteComment(c.id)
                  .then(() => toast.success("Comment deleted."))
                  .catch(() => setActionError("Couldn't delete your comment. Please try again."))
              }
            />
          ))}
          {post.comments.length === 0 && (
            <p className="text-sm text-text-muted">No comments yet — be the first to give feedback.</p>
          )}
        </div>

        {authHydrated && !isLoggedIn ? (
          <Card className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              <Link
                href={`/login?redirect=/community/${postId}`}
                className="inline-flex min-h-11 items-center py-3 font-medium text-primary hover:text-primary-hover"
              >
                Sign in
              </Link>{" "}
              to add a comment.
            </p>
          </Card>
        ) : (
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
                className="focus-ring w-full resize-y rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text placeholder:text-text-muted focus:border-primary"
              />
              <Button type="submit" className="shrink-0 sm:self-end" disabled={!comment.trim()}>
                <Send className="h-4 w-4" aria-hidden="true" />
                Post
              </Button>
            </div>
          </form>
        )}
      </div>

      <ConfirmModal
        open={confirmingDeletePost}
        title="Delete this post?"
        description="This will remove the post and its comments. This can't be undone."
        onCancel={() => setConfirmingDeletePost(false)}
        onConfirm={async () => {
          setConfirmingDeletePost(false);
          try {
            await deletePost(post.id);
            toast.success("Post deleted.");
            router.push("/community");
          } catch {
            setActionError("Couldn't delete your post. Please try again.");
          }
        }}
      />
    </div>
  );
}
