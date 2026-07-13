import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read AI Workbench's privacy policy to learn what profile, prompt, and assessment data is stored locally in your browser, and how that data is handled.",
  openGraph: {
    title: "Privacy Policy — AI Workbench",
    description:
      "Read AI Workbench's privacy policy to learn what profile, prompt, and assessment data is stored locally in your browser, and how that data is handled.",
    type: "website",
    siteName: "AI Workbench",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated 2026." />
      <Card className="space-y-8 text-sm leading-relaxed text-text-muted">
        <section>
          <h2 className="mb-2 text-base font-semibold text-text">What data we collect</h2>
          <p>We collect the information needed to run the platform's features:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-medium text-text">Profile information</span> — your name, role, team, an
              optional avatar image, and an optional website link.
            </li>
            <li>
              <span className="font-medium text-text">Activity data</span> — assessment results and certificates,
              prompts you save or like, and posts and comments you publish in the Community section.
            </li>
            <li>
              <span className="font-medium text-text">Analytics data</span> — aggregated, anonymized usage data
              (pages visited, general location, device/browser type) collected via Google Analytics, but only if you
              accept cookies in the banner shown on your first visit.
            </li>
          </ul>
          <p className="mt-2">
            Sign-in on this demo platform does not collect or verify a real password. Do not enter real credentials
            you use elsewhere.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text">How we use your data</h2>
          <p>Your data is used to:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Display your profile, saved prompts, and assessment history back to you across sessions.</li>
            <li>Show your posts and comments to other users in the Community section, alongside your name and role.</li>
            <li>Generate downloadable assessment certificates using the name you provide.</li>
            <li>Understand overall traffic and feature usage (via analytics, if accepted) so we can improve the product.</li>
          </ul>
          <p className="mt-2">We do not sell your data, and we do not share it with third parties for advertising.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text">Cookies and local storage</h2>
          <p>We use two kinds of client-side storage:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-medium text-text">Essential storage</span> — your theme preference, session
              state, and cookie consent choice, kept in your browser&apos;s{" "}
              <code className="font-mono text-xs">localStorage</code>. This is required for the site to function and
              isn&apos;t affected by declining cookies.
            </li>
            <li>
              <span className="font-medium text-text">Analytics cookies</span> — set by Google Analytics only if you
              click &ldquo;Accept&rdquo; on the cookie banner. You can decline these at any time by clearing the
              banner choice from your browser&apos;s site data settings, or by declining on your next visit after
              clearing cookies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text">Contact us</h2>
          <p>
            For questions about this policy, or to request access to or deletion of your data, contact us at{" "}
            <a href="mailto:privacy@ai-workbench.example.com" className="font-medium text-primary hover:text-primary-hover">
              privacy@ai-workbench.example.com
            </a>
            .
          </p>
        </section>

        <p className="border-t border-border pt-4 text-xs">
          If AI Workbench moves beyond this demo — with real user accounts, payments, or additional third-party
          services — this policy will be updated to reflect exactly what is collected, how long it is retained, and
          how to request deletion.
        </p>
      </Card>
    </div>
  );
}
