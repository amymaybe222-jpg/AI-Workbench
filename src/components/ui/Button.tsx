import { ButtonHTMLAttributes, forwardRef } from "react";
import { buttonStyles, ButtonSize, ButtonVariant } from "./buttonStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    return <button ref={ref} className={buttonStyles(variant, size, className)} {...props} />;
  }
);

Button.displayName = "Button";
