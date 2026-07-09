import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { SaveButton } from "./SaveButton";
import { Prompt } from "@/types";

export function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <Badge tone="primary">{prompt.category}</Badge>
            <Badge tone="neutral">{prompt.tool}</Badge>
          </div>
          <h3 className="text-base font-semibold text-text">{prompt.title}</h3>
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{prompt.description}</p>

      <pre className="mt-4 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-lg border border-border bg-bg p-3 font-mono text-xs leading-relaxed text-text-muted">
        {prompt.prompt}
      </pre>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {prompt.tags.map((tag) => (
          <Badge key={tag} tone="neutral">
            #{tag}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
        <CopyButton text={prompt.prompt} />
        <SaveButton promptId={prompt.id} />
      </div>
    </Card>
  );
}
