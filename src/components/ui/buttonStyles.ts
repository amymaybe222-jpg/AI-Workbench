import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-ring whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-[#8b6cf6] dark:to-secondary text-white shadow-[0_8px_24px_-8px_rgba(91,75,214,0.55)] dark:shadow-[0_8px_24px_-8px_rgba(139,124,247,0.45)] hover:shadow-[0_12px_28px_-6px_rgba(91,75,214,0.65)] dark:hover:shadow-[0_12px_28px_-6px_rgba(139,124,247,0.55)] hover:brightness-[1.04] active:scale-[0.98]",
  secondary:
    "bg-secondary text-white shadow-[0_8px_24px_-8px_rgba(3,105,161,0.5)] hover:brightness-105 hover:shadow-[0_12px_28px_-6px_rgba(3,105,161,0.6)] active:scale-[0.98]",
  outline:
    "border border-border text-text hover:border-primary hover:text-primary bg-surface hover:bg-primary/5",
  ghost: "text-text-muted hover:text-text hover:bg-text/5",
  danger:
    "bg-accent/10 text-accent border border-accent/25 hover:bg-accent/15",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 text-sm px-3 py-1.5",
  md: "min-h-11 text-sm px-4 py-2.5",
  lg: "min-h-11 text-base px-6 py-3",
};

export function buttonStyles(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
