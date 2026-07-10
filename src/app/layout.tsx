import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-workbench.example.com"),
  title: {
    default: "AI Workbench — Learn AI Skills & Track Your Progress",
    template: "%s · AI Workbench",
  },
  description:
    "AI Workbench helps professionals learn AI, pick the right AI tools, use ready-made prompts, and track progress with assessments and certificates.",
  keywords: [
    "AI training",
    "AI tools",
    "prompt library",
    "AI assessments",
    "Claude",
    "ChatGPT",
    "professional development",
  ],
  openGraph: {
    title: "AI Workbench — Learn AI Skills & Track Your Progress",
    description:
      "AI Workbench helps professionals learn AI, pick the right AI tools, use ready-made prompts, and track progress with assessments and certificates.",
    type: "website",
    siteName: "AI Workbench",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workbench — Learn AI Skills & Track Your Progress",
    description:
      "AI Workbench helps professionals learn AI, pick the right AI tools, use ready-made prompts, and track progress with assessments and certificates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-950"
        >
          Skip to content
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
