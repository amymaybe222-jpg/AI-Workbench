"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, SearchX } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { matchTasks } from "@/data/toolTasks";
import { getToolById } from "@/data/tools";

const quickPrompts = [
  "Write and reply to customer emails",
  "Summarize a 40-page report",
  "Generate unit tests for my code",
];

export function ToolPicker() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");

  const matches = useMemo(() => matchTasks(submitted, 2), [submitted]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(query);
  }

  function handleQuickPick(text: string) {
    setQuery(text);
    setSubmitted(text);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="tool-picker-input" className="sr-only">
          Describe the task you want help with
        </label>
        <input
          id="tool-picker-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. “I need to analyse a customer feedback spreadsheet”"
          className="focus-ring w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-text placeholder:text-text-muted transition-colors focus:border-primary"
        />
        <button
          type="submit"
          className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-all hover:bg-primary-hover active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Recommend a tool
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="py-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">Try:</span>
        {quickPrompts.map((p) => (
          <Chip key={p} active={submitted === p} onClick={() => handleQuickPick(p)}>
            {p}
          </Chip>
        ))}
      </div>

      {submitted && (
        <div className="mt-8 animate-fade-in space-y-6">
          {matches.length === 0 ? (
            <Card className="flex flex-col items-center gap-3 py-10 text-center">
              <SearchX className="h-8 w-8 text-text-muted" aria-hidden="true" />
              <p className="text-sm font-medium text-text">No confident match for that description yet.</p>
              <p className="max-w-sm text-sm text-text-muted">
                Try rephrasing with a concrete task (e.g. &ldquo;write emails&rdquo;, &ldquo;analyse data&rdquo;,
                &ldquo;generate code&rdquo;), or pick one of the suggestions above.
              </p>
            </Card>
          ) : (
            matches.map((task) => (
              <Card key={task.id} className="border-primary/20">
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="primary">Matched task</Badge>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-text">{task.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{task.reasoning}</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {task.recommendedToolIds.map((toolId, i) => {
                    const tool = getToolById(toolId);
                    if (!tool) return null;
                    return (
                      <div key={toolId} className="rounded-lg border border-border bg-surface-raised p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-text">{tool.name}</h4>
                          {i === 0 && <Badge tone="secondary">Top pick</Badge>}
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{tool.description}</p>
                        {tool.learnSlug && (
                          <Link
                            href={`/learn/${tool.learnSlug}`}
                            className="focus-ring mt-3 inline-block text-sm font-medium text-primary hover:text-primary-hover"
                          >
                            See how {tool.name} works →
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
