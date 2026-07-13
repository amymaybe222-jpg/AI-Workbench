"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface LearnResult {
  slug: string;
  title: string;
  category: string;
  summary: string;
}

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LearnResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from("learn_topics")
        .select("slug, title, category, summary")
        .textSearch("search_vector", q, { type: "websearch", config: "english" })
        .limit(8);
      setResults(data ?? []);
      setLoading(false);
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative hidden w-full max-w-xs lg:block">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search Learn AI…"
        aria-label="Search Learn AI topics"
        className="focus-ring w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-muted transition-colors focus:border-primary"
      />

      <div
        className={cn(
          "absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_12px_32px_-12px_rgba(21,19,31,0.25)] transition-all duration-150 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)]",
          showDropdown ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        {loading && <p className="px-4 py-3 text-sm text-text-muted">Searching…</p>}

        {!loading && results.length === 0 && (
          <p className="px-4 py-3 text-sm text-text-muted">No Learn AI topics match &ldquo;{query.trim()}&rdquo;.</p>
        )}

        {!loading &&
          results.map((r) => (
            <Link
              key={r.slug}
              href={`/learn/${r.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 border-b border-border px-4 py-3 text-sm last:border-0 hover:bg-text/5"
            >
              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
              <span>
                <span className="block font-medium text-text">{r.title}</span>
                <span className="mt-0.5 block text-xs text-text-muted">{r.category}</span>
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
