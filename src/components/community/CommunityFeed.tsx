"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PostCard } from "./PostCard";
import { NewPostForm } from "./NewPostForm";
import { useCommunityPosts } from "@/lib/useCommunityPosts";

export function CommunityFeed() {
  const { posts, likedIds, addPost, toggleLike } = useCommunityPosts();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [posts]
  );

  const filtered = sorted.filter((p) => {
    if (tag && !p.tags.includes(tag)) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          placeholder="Search posts by topic or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search community posts"
          className="max-w-md"
        />
        <Button onClick={() => setShowForm((s) => !s)} variant={showForm ? "outline" : "primary"}>
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
            }}
          />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={tag === null} onClick={() => setTag(null)}>
          All topics
        </Chip>
        {allTags.map((t) => (
          <Chip key={t} active={tag === t} onClick={() => setTag(tag === t ? null : t)}>
            #{t}
          </Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="mt-8 py-14 text-center text-sm text-text-muted">
          No posts match yet — be the first to share something in this topic.
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} isLiked={likedIds.includes(post.id)} onToggleLike={toggleLike} />
          ))}
        </div>
      )}
    </div>
  );
}
