import { BookOpen, Compass, Library, ClipboardCheck, MessagesSquare, UserCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { aiTools } from "@/data/tools";
import { prompts } from "@/data/prompts";
import { quizzes } from "@/data/quizzes";

const features = [
  {
    href: "/learn",
    icon: BookOpen,
    title: "Learn AI",
    description: "Concise, practical explanations of core AI concepts and the tools your team already uses.",
  },
  {
    href: "/tools",
    icon: Compass,
    title: "Tool Picker",
    description: "Describe a task in plain language and get a ranked shortlist of the right AI tool for the job.",
  },
  {
    href: "/prompts",
    icon: Library,
    title: "Prompt Library",
    description: "Categorized, copy-ready prompts for engineering, support, sales, leadership, and more.",
  },
  {
    href: "/assessments",
    icon: ClipboardCheck,
    title: "Assessments",
    description: "Short scored quizzes that check your understanding and award a certificate at 80% or above.",
  },
  {
    href: "/community",
    icon: MessagesSquare,
    title: "Community",
    description: "See how colleagues are applying AI day to day, and get feedback on your own approach.",
  },
  {
    href: "/profile",
    icon: UserCircle,
    title: "Profile & Portfolio",
    description: "Track completed assessments, certificates earned, and prompts you have saved over time.",
  },
];

const steps = [
  {
    title: "Learn the fundamentals",
    body: "Start with short, practical lessons on how generative AI works and what each major tool does well.",
  },
  {
    title: "Apply it to real work",
    body: "Use the Tool Picker and Prompt Library to move from theory to a first draft in your actual role.",
  },
  {
    title: "Prove your understanding",
    body: "Take a scored assessment and download a certificate once you consistently score 80% or higher.",
  },
  {
    title: "Build your portfolio",
    body: "Your profile tracks completed assessments, certificates, and prompts you have saved — visible progress over time.",
  },
];

export default function Home() {
  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Hero */}
      <section className="pt-2 sm:pt-6">
        <Badge tone="primary" className="mb-5">
          For professionals who use AI at work
        </Badge>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-text sm:text-5xl sm:leading-[1.1]">
          Understand AI. Apply it well.{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Prove your progress.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
          AI Workbench is a structured, practical platform for learning AI concepts, choosing the right tool for a
          task, using ready-made prompts, and tracking your growth with scored assessments — built for people who
          need AI to work in their actual job, not just in theory.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/learn" size="lg">
            Start learning
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
          <LinkButton href="/tools" size="lg" variant="outline">
            Try the Tool Picker
          </LinkButton>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Prompts ready to use</dt>
            <dd className="mt-1 font-mono text-2xl font-semibold text-text">{prompts.length}+</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Tools compared</dt>
            <dd className="mt-1 font-mono text-2xl font-semibold text-text">{aiTools.length}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Scored assessments</dt>
            <dd className="mt-1 font-mono text-2xl font-semibold text-text">{quizzes.length}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Certificate threshold</dt>
            <dd className="mt-1 font-mono text-2xl font-semibold text-secondary">80%</dd>
          </div>
        </dl>
      </section>

      {/* Feature grid */}
      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          Everything in one workbench
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-text-muted sm:text-base">
          Six focused sections that take you from first concept to demonstrated, on-the-job capability.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.href} hoverable className="group">
              <a href={feature.href} className="focus-ring block rounded-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{feature.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading" className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          How it works
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-primary">
                {i + 1}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-text">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section>
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-surface to-surface-raised p-8 sm:p-10">
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                Ready to see where you stand?
              </h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-text-muted sm:text-base">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                Take a short assessment, score 80% or higher, and download a certificate for your portfolio.
              </p>
            </div>
            <LinkButton href="/assessments" size="lg" variant="secondary" className="shrink-0">
              Take an assessment
            </LinkButton>
          </div>
        </Card>
      </section>
    </div>
  );
}
