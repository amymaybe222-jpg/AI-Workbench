"use client";

import { useEffect } from "react";
import "./globals.css";

// Only fires when the ROOT layout itself throws, so this replaces the whole
// <html>/<body> and can't assume AppShell/AuthProvider/ToastProvider (or
// even the Header/Footer) are safe to render — kept deliberately minimal
// and self-contained, styled with the same design tokens via globals.css.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-full bg-bg text-text antialiased">
        <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 py-8 text-center">
          <div className="w-full rounded-2xl border border-border bg-surface p-6 shadow-[0_2px_12px_-4px_rgba(21,19,31,0.06)] sm:p-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-wider text-accent">Error</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              Something went wrong
            </h1>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              AI Workbench hit an unexpected error and couldn&rsquo;t load. Try again, or head back to the homepage.
            </p>
            {error.digest && (
              <p className="mt-3 font-mono text-xs text-text-muted">Error reference: {error.digest}</p>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-all hover:brightness-[1.04] active:scale-[0.98]"
              >
                Try again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-base font-medium text-text hover:border-primary hover:text-primary"
              >
                Back to home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
