import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import { buttonStyles, ButtonSize, ButtonVariant } from "./buttonStyles";

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function LinkButton({ href, variant = "primary", size = "md", className, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
