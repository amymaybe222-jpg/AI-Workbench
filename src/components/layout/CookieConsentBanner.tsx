"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCookieConsent } from "@/lib/useCookieConsent";

export function CookieConsentBanner() {
  // `hydrated` gates against a flash of the banner on every load for users
  // who already made a choice.
  const { consent, setConsent, hydrated } = useCookieConsent();

  if (!hydrated || consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-text-muted">
            We use cookies and local storage to keep you signed in and remember your preferences. See our{" "}
            <Link href="/privacy" className="font-medium text-primary hover:text-primary-hover">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex w-full shrink-0 gap-3 sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => setConsent("declined")}>
            Decline
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none" onClick={() => setConsent("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
