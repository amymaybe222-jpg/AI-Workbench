"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS, DEFAULT_PROFILE } from "@/lib/storageKeys";

const suggestedTags = ["engineering", "productivity", "prompt-engineering", "support", "sales", "learning"];
const MIN_BODY_LENGTH = 30;

export function NewPostForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: { title: string; body: string; tags: string[]; author: string; role: string; team: string }) => void;
  onCancel: () => void;
}) {
  const [profile] = useLocalStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const bodyLength = body.trim().length;
  const bodyTooShort = bodyLength < MIN_BODY_LENGTH;

  function toggleTag(tag: string) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!title.trim() || bodyTooShort) return;
    onSubmit({
      title: title.trim(),
      body: body.trim(),
      tags: selectedTags,
      author: profile.name,
      role: profile.role,
      team: profile.team,
    });
    setTitle("");
    setBody("");
    setSelectedTags([]);
    setSubmitAttempted(false);
  }

  return (
    <Card className="border-primary/25">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="post-title" className="text-xs font-medium text-text-muted">
            Title
          </label>
          <input
            id="post-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What did you build, learn, or try?"
            className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-sm text-text placeholder:text-text-muted/70 focus:border-primary"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="post-body" className="text-xs font-medium text-text-muted">
              Details
            </label>
            <span className={`text-xs ${bodyTooShort ? "text-accent" : "text-secondary"}`}>
              {bodyLength}/{MIN_BODY_LENGTH} min
            </span>
          </div>
          <textarea
            id="post-body"
            required
            minLength={MIN_BODY_LENGTH}
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share context, what worked, and what feedback you're looking for… (min. 30 characters)"
            aria-invalid={submitAttempted && bodyTooShort}
            aria-describedby="post-body-hint"
            className={`focus-ring mt-1.5 w-full resize-y rounded-lg border bg-surface-raised px-3 py-2.5 text-sm text-text placeholder:text-text-muted/70 focus:border-primary ${
              submitAttempted && bodyTooShort ? "border-accent" : "border-border"
            }`}
          />
          {submitAttempted && bodyTooShort && (
            <p id="post-body-hint" className="mt-1.5 text-xs text-accent">
              Add a bit more detail — at least {MIN_BODY_LENGTH} characters ({bodyLength}/{MIN_BODY_LENGTH} so far).
            </p>
          )}
        </div>
        <div>
          <p className="text-xs font-medium text-text-muted">Tags</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {suggestedTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={selectedTags.includes(tag)}
                className={`focus-ring rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-text-muted hover:border-primary/40"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Send className="h-4 w-4" aria-hidden="true" />
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
}
