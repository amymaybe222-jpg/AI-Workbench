import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Plain pulsing placeholder block — deliberately not the animated `Card`
// (which uses an intersection-observer fade-in meant for real content, not
// a loading.tsx route boundary that's already visible on first paint).
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-lg bg-surface-raised", className)} {...props} />;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-4 shadow-[0_2px_12px_-4px_rgba(21,19,31,0.06)] dark:shadow-[0_2px_14px_-4px_rgba(0,0,0,0.4)] sm:p-6",
        className
      )}
    >
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-5 w-3/4" />
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
    </div>
  );
}
