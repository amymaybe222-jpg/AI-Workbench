"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { PromptCard } from "./PromptCard";
import { promptCategories } from "@/data/promptCategories";
import { supabase, DEMO_USER_ID } from "@/lib/supabase";
import { PromptRow } from "@/types";

export function PromptLibrary() {
  const [prompts, setPrompts] = useState<PromptRow[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [savedOnly, setSavedOnly] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [promptsRes, likesRes, savesRes] = await Promise.all([
        supabase.from("prompts_with_like_counts").select("*").order("created_at", { ascending: true }),
        supabase.from("prompt_likes").select("prompt_id").eq("user_id", DEMO_USER_ID),
        supabase.from("saved_prompts").select("prompt_id").eq("user_id", DEMO_USER_ID),
      ]);

      if (cancelled) return;
      if (promptsRes.data) setPrompts(promptsRes.data as PromptRow[]);
      if (likesRes.data) setLikedIds(likesRes.data.map((r) => r.prompt_id));
      if (savesRes.data) setSavedIds(savesRes.data.map((r) => r.prompt_id));
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function toggleLike(promptId: string) {
    const isLiked = likedIds.includes(promptId);
    setLikedIds((prev) => (isLiked ? prev.filter((id) => id !== promptId) : [...prev, promptId]));
    setPrompts((prev) =>
      prev.map((p) => (p.id === promptId ? { ...p, like_count: p.like_count + (isLiked ? -1 : 1) } : p))
    );
    if (isLiked) {
      await supabase.from("prompt_likes").delete().eq("user_id", DEMO_USER_ID).eq("prompt_id", promptId);
    } else {
      await supabase.from("prompt_likes").insert({ user_id: DEMO_USER_ID, prompt_id: promptId });
    }
  }

  async function toggleSave(promptId: string) {
    const isSaved = savedIds.includes(promptId);
    setSavedIds((prev) => (isSaved ? prev.filter((id) => id !== promptId) : [...prev, promptId]));
    if (isSaved) {
      await supabase.from("saved_prompts").delete().eq("user_id", DEMO_USER_ID).eq("prompt_id", promptId);
    } else {
      await supabase.from("saved_prompts").insert({ user_id: DEMO_USER_ID, prompt_id: promptId });
    }
  }

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of prompts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return counts;
  }, [prompts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return prompts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (savedOnly && !savedIds.includes(p.id)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.prompt_text.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [prompts, search, category, savedOnly, savedIds]);

  return (
    <div>
      <SearchInput
        placeholder="Search prompts by keyword, tag, or use case…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search prompts"
        className="max-w-xl"
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          className="focus-ring rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-text focus:border-primary"
        >
          <option value="All">All categories ({prompts.length})</option>
          {promptCategories.map((c) => (
            <option key={c} value={c}>
              {c} ({categoryCounts.get(c) ?? 0})
            </option>
          ))}
        </select>
        <Chip active={savedOnly} onClick={() => setSavedOnly((s) => !s)}>
          Saved only {savedIds.length > 0 && `(${savedIds.length})`}
        </Chip>
      </div>

      <p className="mt-4 text-sm text-text-muted">
        {loading ? "Loading prompts…" : `Showing ${filtered.length} of ${prompts.length} prompts`}
      </p>

      {!loading && filtered.length === 0 ? (
        <Card className="mt-6 flex flex-col items-center gap-3 py-14 text-center">
          <SearchX className="h-8 w-8 text-text-muted" aria-hidden="true" />
          <p className="text-sm font-medium text-text">No prompts match those filters.</p>
          <p className="max-w-sm text-sm text-text-muted">Try a different keyword, category, or clear the saved-only filter.</p>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <PromptCard
              key={p.id}
              prompt={p}
              isLiked={likedIds.includes(p.id)}
              isSaved={savedIds.includes(p.id)}
              onToggleLike={() => toggleLike(p.id)}
              onToggleSave={() => toggleSave(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
