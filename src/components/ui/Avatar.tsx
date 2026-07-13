import { cn } from "@/lib/utils";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

interface AvatarProps {
  name: string;
  avatarDataUrl?: string;
  className?: string;
}

export function Avatar({ name, avatarDataUrl, className }: AvatarProps) {
  if (avatarDataUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={avatarDataUrl} alt={name} className={cn("rounded-full object-cover", className)} />;
  }
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/15 font-semibold text-primary",
        className
      )}
    >
      {initials(name)}
    </span>
  );
}
