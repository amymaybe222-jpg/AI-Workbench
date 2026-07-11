"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS, DEFAULT_PROFILE } from "@/lib/storageKeys";
import { aiTools } from "@/data/tools";

const MIN_BODY_LENGTH = 30;

export function NewPostForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: {
    title: string;
    body: string;
    tags: string[];
    tool: string;
    author: string;
    role: string;
    team: string;
  }) => void;
  onCancel: () => void;
}) {
  const [profile] = useLocalStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const [title, setTitle] = useState("");
  const [tool, setTool] = useState("");
  const [body, setBody] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const bodyLength = body.trim().length;
  const bodyTooShort = bodyLength < MIN_BODY_LENGTH;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!title.trim() || !tool || bodyTooShort) return;
    onSubmit({
      title: title.trim(),
      body: body.trim(),
      tags: [],
      tool,
      author: profile.name,
      role: profile.role,
      team: profile.team,
    });
    setTitle("");
    setTool("");
    setBody("");
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
            aria-invalid={submitAttempted && !title.trim()}
            aria-describedby="post-title-hint"
            className={`focus-ring mt-1.5 w-full rounded-lg border bg-surface-raised px-3 py-2.5 text-base text-text placeholder:text-text-muted focus:border-primary ${
              submitAttempted && !title.trim() ? "border-accent" : "border-border"
            }`}
          />
          {submitAttempted && !title.trim() && (
            <p id="post-title-hint" role="alert" className="mt-1.5 text-xs text-accent">
              Add a title before posting.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="post-tool" className="text-xs font-medium text-text-muted">
            Tool used
          </label>
          <select
            id="post-tool"
            required
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            aria-invalid={submitAttempted && !tool}
            aria-describedby="post-tool-hint"
            className={`focus-ring mt-1.5 w-full rounded-lg border bg-surface-raised px-3 py-2.5 text-base text-text focus:border-primary ${
              submitAttempted && !tool ? "border-accent" : "border-border"
            }`}
          >
            <option value="" disabled>
              Select a tool…
            </option>
            {aiTools.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {submitAttempted && !tool && (
            <p id="post-tool-hint" role="alert" className="mt-1.5 text-xs text-accent">
              Select which tool you used.
            </p>
          )}
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
            className={`focus-ring mt-1.5 w-full resize-y rounded-lg border bg-surface-raised px-3 py-2.5 text-base text-text placeholder:text-text-muted focus:border-primary ${
              submitAttempted && bodyTooShort ? "border-accent" : "border-border"
            }`}
          />
          {submitAttempted && bodyTooShort && (
            <p id="post-body-hint" role="alert" className="mt-1.5 text-xs text-accent">
              Add a bit more detail — at least {MIN_BODY_LENGTH} characters ({bodyLength}/{MIN_BODY_LENGTH} so far).
            </p>
          )}
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
