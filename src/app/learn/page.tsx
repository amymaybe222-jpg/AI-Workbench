import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";
import { LearnTopic } from "@/types";

export const metadata: Metadata = {
  title: "Learn AI",
  description:
    "Browse practical, no-fluff lessons on generative AI fundamentals, prompt engineering, and tools like Claude, ChatGPT, and Copilot for professional use.",
  openGraph: {
    title: "Learn AI — AI Workbench",
    description:
      "Browse practical, no-fluff lessons on generative AI fundamentals, prompt engineering, and tools like Claude, ChatGPT, and Copilot for professional use.",
    type: "website",
    siteName: "AI Workbench",
  },
};

function TopicGrid({ topics, category }: { topics: LearnTopic[]; category: "Foundations" | "Tools" }) {
  const filtered = topics.filter((t) => t.category === category);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((topic) => (
        <Card key={topic.slug} hoverable className="group flex flex-col">
          <Link href={`/learn/${topic.slug}`} className="focus-ring flex flex-1 flex-col rounded-lg">
            <div className="mb-3 flex items-center justify-between">
              <Badge tone={category === "Foundations" ? "primary" : "secondary"}>{category}</Badge>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {topic.read_time}
              </span>
            </div>
            <h3 className="text-base font-semibold text-text">{topic.title}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text-muted">{topic.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {topic.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100">
              Read lesson <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default async function LearnPage() {
  const { data } = await supabase.from("learn_topics").select("*");
  const topics = (data as LearnTopic[]) ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Learn AI"
        title="Understand AI before you rely on it"
        description="Short, practical lessons — no fluff. Start with the foundations, then read up on the specific tools your team uses."
      />

      <section className="mb-14">
        <h2 className="mb-1 text-lg font-semibold text-text">Foundations</h2>
        <p className="mb-6 text-sm text-text-muted">Core concepts behind generative AI and how to work with it well.</p>
        <TopicGrid topics={topics} category="Foundations" />
      </section>

      <section>
        <h2 className="mb-1 text-lg font-semibold text-text">Tools</h2>
        <p className="mb-6 text-sm text-text-muted">What each major AI tool is actually good at, and when to reach for it.</p>
        <TopicGrid topics={topics} category="Tools" />
      </section>
    </div>
  );
}
