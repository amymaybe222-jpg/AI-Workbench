"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ className, hoverable = false, ...props }: CardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-surface p-4 shadow-[0_2px_12px_-4px_rgba(21,19,31,0.06)] dark:shadow-[0_2px_14px_-4px_rgba(0,0,0,0.4)] sm:p-6",
        "transition-[opacity,transform] duration-700 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        hoverable &&
          "hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(91,75,214,0.35)] dark:hover:shadow-[0_16px_36px_-14px_rgba(139,124,247,0.4)]",
        className
      )}
      {...props}
    />
  );
}
