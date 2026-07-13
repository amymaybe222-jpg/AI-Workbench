"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, CheckCircle2, MessagesSquare } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { PostCard } from "./PostCard";
import { NewPostForm } from "./NewPostForm";
import { useCommunityPosts } from "@/lib/useCommunityPosts";
import { useAuth } from "@/lib/useAuth";

export function CommunityFeed() {
  const { posts, likedIds, addPost, toggleLike } = useCommunityPosts();
  const { isLoggedIn, hydrated: authHydrated } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [justPosted, setJustPosted] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [posts]
  );

  const filtered = sorted.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
  });

  function handleToggleLike(postId: string) {
    if (authHydrated && !isLoggedIn) {
      router.push("/login?redirect=/community");
      return;
    }
    toggleLike(postId);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          placeholder="Search posts by title, content, or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search community posts"
          className="max-w-md"
        />
        <Button
          onClick={() => {
            if (authHydrated && !isLoggedIn) {
              router.push("/login?redirect=/community");
              return;
            }
            setShowForm((s) => !s);
          }}
          variant={showForm ? "outline" : "primary"}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Share your work
        </Button>
      </div>

      {showForm && (
        <div className="mt-6">
          {postError && (
            <p role="alert" className="mb-3 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">
              {postError}
            </p>
          )}
          <NewPostForm
            onCancel={() => setShowForm(false)}
            onSubmit={async (data) => {
              setPostError(null);
              try {
                await addPost(data);
                setShowForm(false);
                setJustPosted(true);
              } catch {
                setPostError("Couldn't publish your post. Please try again.");
              }
            }}
          />
        </div>
      )}

      <Modal open={justPosted} onClose={() => setJustPosted(false)} title="Thanks for your contribution">
        <CheckCircle2 className="mx-auto h-10 w-10 text-secondary" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold text-text">Thanks for your contribution!</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
          Your post is live in the Community feed for others to learn from.
        </p>
        <Button className="mt-6 w-full" onClick={() => setJustPosted(false)}>
          Done
        </Button>
      </Modal>

      {filtered.length === 0 ? (
        <Card className="mt-6 flex flex-col items-center gap-3 py-14 text-center">
          <MessagesSquare className="h-8 w-8 text-text-muted" aria-hidden="true" />
          <p className="text-sm font-medium text-text">
            {search.trim() ? "No posts match your search." : "No posts yet."}
          </p>
          <p className="max-w-sm text-sm text-text-muted">
            {search.trim() ? "Try a different keyword or clear the search." : "Be the first to share something with the team."}
          </p>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} isLiked={likedIds.includes(post.id)} onToggleLike={handleToggleLike} />
          ))}
        </div>
      )}
    </div>
  );
}
