import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsentBanner } from "./CookieConsentBanner";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid-glow flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-6xl animate-fade-in">{children}</div>
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
