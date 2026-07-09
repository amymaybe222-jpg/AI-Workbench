import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ className, hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-5 sm:p-6",
        hoverable &&
          "transition-all duration-200 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_rgba(129,140,248,0.35)]",
        className
      )}
      {...props}
    />
  );
}
