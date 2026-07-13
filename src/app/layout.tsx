import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { AppShell } from "@/components/layout/AppShell";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-2FTSFWHJSD";

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
    template: "%s — AI Workbench",
  },
  description:
    "AI Workbench helps professionals learn core AI concepts, pick the right AI tool, use ready-made prompts, and prove their progress with scored assessments.",
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
      "AI Workbench helps professionals learn core AI concepts, pick the right AI tool, use ready-made prompts, and prove their progress with scored assessments.",
    type: "website",
    siteName: "AI Workbench",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workbench — Learn AI Skills & Track Your Progress",
    description:
      "AI Workbench helps professionals learn core AI concepts, pick the right AI tool, use ready-made prompts, and prove their progress with scored assessments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#131220" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Sets the .dark class before first paint (stored preference, falling back
// to OS preference) so there is no flash of the wrong theme on load.
const themeInitScript = `(function(){try{var s=localStorage.getItem('aiw:theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </head>
      <body className="min-h-full antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
