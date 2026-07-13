import type { Metadata } from "next";
import { Compass, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or may have moved.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-8 text-center">
      <Card className="w-full">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Compass className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-wider text-primary">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <LinkButton href="/" size="lg">
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
          <LinkButton href="/learn" size="lg" variant="outline">
            Start learning
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
