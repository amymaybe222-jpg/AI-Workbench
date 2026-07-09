import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { aiTools } from "@/data/tools";

export function ToolCatalog() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {aiTools.map((tool) => (
        <Card key={tool.id} hoverable>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-text">{tool.name}</h3>
              <p className="text-xs text-text-muted">by {tool.maker}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{tool.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tool.bestFor.slice(0, 3).map((item) => (
              <Badge key={item} tone="primary">
                {item}
              </Badge>
            ))}
          </div>
          {tool.learnSlug && (
            <Link
              href={`/learn/${tool.learnSlug}`}
              className="focus-ring mt-4 inline-block text-sm font-medium text-primary hover:text-primary-hover"
            >
              Read the full guide →
            </Link>
          )}
        </Card>
      ))}
    </div>
  );
}
