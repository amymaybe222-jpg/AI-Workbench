import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-7 w-2/3" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-1.5 h-4 w-5/6" />
        <Skeleton className="mt-8 h-11 w-40 rounded-full" />
      </div>
    </div>
  );
}
