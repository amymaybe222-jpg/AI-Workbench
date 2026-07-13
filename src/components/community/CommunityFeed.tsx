"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, CheckCircle2 } from "lucide-react";
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
          placeholder="Search here"
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
          <NewPostForm
            onCancel={() => setShowForm(false)}
            onSubmit={(data) => {
              addPost(data);
              setShowForm(false);
              setJustPosted(true);
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
        <Card className="mt-8 py-14 text-center text-sm text-text-muted">
          No posts match yet — be the first to share something.
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
