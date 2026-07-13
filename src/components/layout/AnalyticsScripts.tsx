"use client";

import Script from "next/script";
import { useCookieConsent } from "@/lib/useCookieConsent";

// Only loads Google Analytics once the user has accepted the cookie banner —
// matches the disclosure in the Privacy Policy. next/script works correctly
// wherever it's rendered in the tree, so this doesn't need to live in <head>.
export function AnalyticsScripts({ measurementId }: { measurementId: string }) {
  const { consent } = useCookieConsent();

  if (consent !== "accepted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
