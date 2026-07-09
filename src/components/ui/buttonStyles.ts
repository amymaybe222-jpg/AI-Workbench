import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-ring whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-slate-950 hover:bg-primary-hover active:scale-[0.98] shadow-[0_0_0_1px_rgba(129,140,248,0.4)] hover:shadow-[0_0_20px_-2px_rgba(129,140,248,0.55)]",
  secondary:
    "bg-secondary text-slate-950 hover:brightness-110 active:scale-[0.98] shadow-[0_0_0_1px_rgba(52,211,153,0.4)] hover:shadow-[0_0_20px_-2px_rgba(52,211,153,0.5)]",
  outline:
    "border border-border text-text hover:border-primary hover:text-primary bg-transparent hover:bg-primary/5",
  ghost: "text-text-muted hover:text-text hover:bg-white/5",
  danger:
    "bg-accent/15 text-accent border border-accent/30 hover:bg-accent/25",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-6 py-3",
};

export function buttonStyles(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
