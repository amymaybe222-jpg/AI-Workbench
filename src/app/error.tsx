"use client";

import { useEffect } from "react";
import { AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";

// Route-segment error boundary — Next.js requires this to be a Client
// Component, which means it can't export `metadata` like not-found.tsx does.
// It's still rendered inside the root layout, so Header/Footer/AppShell
// wrap it automatically.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-8 text-center">
      <Card className="w-full">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-wider text-accent">Error</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">Something went wrong</h1>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          An unexpected error occurred while loading this page. You can try again, or head back to the homepage.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-text-muted">Error reference: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={reset}>
            Try again
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </Button>
          <LinkButton href="/" size="lg" variant="outline">
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
