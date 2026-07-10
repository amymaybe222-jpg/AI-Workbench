import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { learnTopics, getLearnTopic } from "@/data/learn";
import { getToolById } from "@/data/tools";

export function generateStaticParams() {
  return learnTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getLearnTopic(slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.summary,
  };
}

export default async function LearnTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getLearnTopic(slug);
  if (!topic) notFound();

  const relatedTool = topic.relatedTools?.[0] ? getToolById(topic.relatedTools[0]) : undefined;

  return (
    <div>
      <Link
        href="/learn"
        className="focus-ring mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Learn AI
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <article>
          <div className="mb-3 flex items-center gap-2">
            <Badge tone={topic.category === "Foundations" ? "primary" : "secondary"}>{topic.category}</Badge>
            <span className="text-xs text-text-muted">{topic.readTime} read</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">{topic.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-text-muted">{topic.summary}</p>

          <div className="mt-8 space-y-8">
            {topic.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-semibold text-text">{section.heading}</h2>
                <div className="mt-2 space-y-3">
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="text-base leading-relaxed text-text-muted sm:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <Card className="mt-10 border-secondary/25 bg-secondary/[0.04]">
            <h2 className="text-sm font-semibold text-text">Key takeaways</h2>
            <ul className="mt-3 space-y-2.5">
              {topic.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {relatedTool && (
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Quick facts</p>
              <h3 className="mt-2 text-base font-semibold text-text">{relatedTool.name}</h3>
              <p className="text-xs text-text-muted">by {relatedTool.maker}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{relatedTool.pricingNote}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {relatedTool.bestFor.map((item) => (
                  <Badge key={item} tone="primary">
                    {item}
                  </Badge>
                ))}
              </div>
              <LinkButton href="/tools" size="sm" variant="outline" className="mt-4 w-full">
                Find tasks it fits
              </LinkButton>
            </Card>
          )}
          <Card>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Keep going</p>
            <div className="mt-3 space-y-2">
              <LinkButton href="/prompts" size="sm" variant="ghost" className="w-full justify-start px-0">
                Browse related prompts →
              </LinkButton>
              <LinkButton href="/assessments" size="sm" variant="ghost" className="w-full justify-start px-0">
                Test your understanding →
              </LinkButton>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
