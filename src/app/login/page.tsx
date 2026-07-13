import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Log in to AI Workbench to access your profile, saved prompts, community posts, assessment history, and downloadable certificates for completed AI training.",
  openGraph: {
    title: "Log in — AI Workbench",
    description:
      "Log in to AI Workbench to access your profile, saved prompts, community posts, assessment history, and downloadable certificates for completed AI training.",
    type: "website",
    siteName: "AI Workbench",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
