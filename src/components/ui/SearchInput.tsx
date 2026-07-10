import { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        type="search"
        className="focus-ring w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-base text-text placeholder:text-text-muted/70 transition-colors focus:border-primary"
        {...props}
      />
    </div>
  );
}
