import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "primary" | "secondary" | "accent" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary border-primary/25",
  secondary: "bg-secondary/10 text-secondary border-secondary/25",
  accent: "bg-accent/10 text-accent border-accent/25",
  neutral: "bg-white/5 text-text-muted border-border",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
