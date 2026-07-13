import Link from "next/link";
import { Logo } from "./Logo";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/SocialIcons";
import { AdminFooterColumn } from "./AdminFooterColumn";

const productLinks = [
  { href: "/learn", label: "Learn AI" },
  { href: "/tools", label: "Tool Picker" },
  { href: "/prompts", label: "Prompt Library" },
  { href: "/assessments", label: "Assessments" },
  { href: "/community", label: "Community" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Meet the team" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socialLinks = [
  { href: "https://github.com/amymaybe222-jpg/AI-Workbench", label: "GitHub", Icon: GitHubIcon },
  { href: "#", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "#", label: "X (Twitter)", Icon: XIcon },
];

export function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-text">{title}</h3>
      <ul className="mt-4 space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="focus-ring -mx-1 -my-3 inline-block min-w-11 px-1 py-3 text-sm text-text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Logo />
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
            <FooterColumn title="Product" links={productLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
            <AdminFooterColumn />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} AI Workbench.</p>
          <p className="font-mono">v1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
