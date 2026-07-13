"use client";

import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";
import { promptCategories } from "@/data/promptCategories";
import { supabase } from "@/lib/supabase";
import { PromptRow } from "@/types";

type AdminPrompt = Omit<PromptRow, "like_count">;

type PromptDraft = {
  title: string;
  category: string;
  tool: string;
  description: string;
  prompt_text: string;
  tags: string;
};

const emptyDraft: PromptDraft = {
  title: "",
  category: promptCategories[0],
  tool: "",
  description: "",
  prompt_text: "",
  tags: "",
};

function toDraft(prompt: AdminPrompt): PromptDraft {
  return {
    title: prompt.title,
    category: prompt.category,
    tool: prompt.tool,
    description: prompt.description,
    prompt_text: prompt.prompt_text,
    tags: prompt.tags.join(", "),
  };
}

export function PromptAdmin() {
  const [prompts, setPrompts] = useState<AdminPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<PromptDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadPrompts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("prompts")
      .select("id, title, category, tool, description, prompt_text, tags, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setPrompts(data as AdminPrompt[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadPrompts();
  }, []);

  function openCreate() {
    setEditingId(null);
    setDraft(emptyDraft);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(prompt: AdminPrompt) {
    setEditingId(prompt.id);
    setDraft(toDraft(prompt));
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: draft.title.trim(),
      category: draft.category,
      tool: draft.tool.trim(),
      description: draft.description.trim(),
      prompt_text: draft.prompt_text.trim(),
      tags: draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const result = editingId
      ? await supabase.from("prompts").update(payload).eq("id", editingId)
      : await supabase.from("prompts").insert(payload);

    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setModalOpen(false);
    await loadPrompts();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from("prompts").delete().eq("id", id);
    setDeletingId(null);
    if (error) {
      setError(error.message);
      return;
    }
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  }

  const filtered = prompts.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tool.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          placeholder="Search by title, category, or tool…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search prompts"
          className="max-w-sm"
        />
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          New prompt
        </Button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">{error}</p>
      )}

      <p className="mt-4 text-sm text-text-muted">
        {loading ? "Loading prompts…" : `${filtered.length} of ${prompts.length} prompts`}
      </p>

      <Card className="mt-4 overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-text-muted">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Tool</th>
              <th className="px-4 py-3 font-medium">Tags</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="max-w-xs px-4 py-3 font-medium text-text">{p.title}</td>
                <td className="px-4 py-3 text-text-muted">{p.category}</td>
                <td className="px-4 py-3 text-text-muted">{p.tool}</td>
                <td className="px-4 py-3 text-text-muted">
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-text/5 px-2 py-0.5 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-text/5 hover:text-text"
                      aria-label={`Edit ${p.title}`}
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      disabled={deletingId === p.id}
                      className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-accent/10 hover:text-accent disabled:opacity-50"
                      aria-label={`Delete ${p.title}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-text-muted">
                  No prompts match that search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit prompt" : "New prompt"}
        className="max-w-lg max-h-[85vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit} className="w-full text-left">
          <h2 className="mb-4 text-lg font-semibold text-text">{editingId ? "Edit prompt" : "New prompt"}</h2>

          <div className="grid gap-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-text">Title</span>
              <input
                required
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="focus-ring w-full rounded-lg border border-border bg-surface px-3 py-2 text-text"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-text">Category</span>
                <select
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  className="focus-ring w-full rounded-lg border border-border bg-surface px-3 py-2 text-text"
                >
                  {promptCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-text">Tool</span>
                <input
                  required
                  value={draft.tool}
                  onChange={(e) => setDraft({ ...draft, tool: e.target.value })}
                  placeholder="e.g. Claude or ChatGPT"
                  className="focus-ring w-full rounded-lg border border-border bg-surface px-3 py-2 text-text"
                />
              </label>
            </div>

            <label className="block text-sm">
              <span className="mb-1 block font-medium text-text">Description</span>
              <textarea
                required
                rows={2}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                className="focus-ring w-full rounded-lg border border-border bg-surface px-3 py-2 text-text"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block font-medium text-text">Prompt text</span>
              <textarea
                required
                rows={6}
                value={draft.prompt_text}
                onChange={(e) => setDraft({ ...draft, prompt_text: e.target.value })}
                className="focus-ring w-full rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs text-text"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block font-medium text-text">Tags (comma separated)</span>
              <input
                value={draft.tags}
                onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
                placeholder="e.g. summarization, meetings"
                className="focus-ring w-full rounded-lg border border-border bg-surface px-3 py-2 text-text"
              />
            </label>
          </div>

          {error && <p className="mt-3 text-sm text-accent">{error}</p>}

          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Create prompt"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
