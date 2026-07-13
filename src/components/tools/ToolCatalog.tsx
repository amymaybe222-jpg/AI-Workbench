"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";
import { AiTool } from "@/types";

export function ToolCatalog() {
  const [tools, setTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("tools")
      .select("*")
      .order("name")
      .then(({ data }) => {
        setTools((data as AiTool[]) ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-sm text-text-muted">Loading tools…</p>;
  }

  if (tools.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-3 py-14 text-center">
        <PackageSearch className="h-8 w-8 text-text-muted" aria-hidden="true" />
        <p className="text-sm font-medium text-text">No tools available yet.</p>
        <p className="max-w-sm text-sm text-text-muted">Check back soon — new tools are added regularly.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <Card key={tool.id} hoverable>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-text">{tool.name}</h3>
              <p className="text-xs text-text-muted">by {tool.maker}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{tool.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tool.best_for.slice(0, 3).map((item) => (
              <Badge key={item} tone="primary">
                {item}
              </Badge>
            ))}
          </div>
          {tool.learn_slug && (
            <Link
              href={`/learn/${tool.learn_slug}`}
              className="focus-ring mt-1 inline-flex min-h-11 items-center py-3 text-sm font-medium text-primary hover:text-primary-hover"
            >
              Read the full guide →
            </Link>
          )}
        </Card>
      ))}
    </div>
  );
}
