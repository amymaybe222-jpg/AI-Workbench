"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { PromptCard } from "./PromptCard";
import { prompts, promptCategories } from "@/data/prompts";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storageKeys";

export function PromptLibrary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved] = useLocalStorage<string[]>(STORAGE_KEYS.savedPrompts, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return prompts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (savedOnly && !saved.includes(p.id)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [search, category, savedOnly, saved]);

  return (
    <div>
      <SearchInput
        placeholder="Search prompts by keyword, tag, or use case…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search prompts"
        className="max-w-xl"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip active={category === "All"} onClick={() => setCategory("All")}>
          All ({prompts.length})
        </Chip>
        {promptCategories.map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
          </Chip>
        ))}
        <span className="mx-1 my-auto h-5 w-px bg-border" aria-hidden="true" />
        <Chip active={savedOnly} onClick={() => setSavedOnly((s) => !s)}>
          Saved only {saved.length > 0 && `(${saved.length})`}
        </Chip>
      </div>

      <p className="mt-4 text-sm text-text-muted">
        Showing {filtered.length} of {prompts.length} prompts
      </p>

      {filtered.length === 0 ? (
        <Card className="mt-6 flex flex-col items-center gap-3 py-14 text-center">
          <SearchX className="h-8 w-8 text-text-muted" aria-hidden="true" />
          <p className="text-sm font-medium text-text">No prompts match those filters.</p>
          <p className="max-w-sm text-sm text-text-muted">Try a different keyword, category, or clear the saved-only filter.</p>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      )}
    </div>
  );
}
