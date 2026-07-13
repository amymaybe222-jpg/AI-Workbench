import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="mt-3 h-8 w-80 max-w-full" />
          <Skeleton className="mt-3 h-5 w-full max-w-xl" />
        </div>
      </div>

      <section className="mb-14">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="mb-6 mt-2 h-4 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} className="h-44" />
          ))}
        </div>
      </section>

      <section>
        <Skeleton className="h-6 w-24" />
        <Skeleton className="mb-6 mt-2 h-4 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} className="h-44" />
          ))}
        </div>
      </section>
    </div>
  );
}
