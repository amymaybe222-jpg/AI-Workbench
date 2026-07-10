import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  tone?: "primary" | "secondary" | "accent";
  label?: string;
}

const toneColors = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

export function ProgressBar({ value, className, tone = "primary", label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1.5 flex justify-between text-xs text-text-muted">
          <span>{label}</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-raised"
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", toneColors[tone])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
