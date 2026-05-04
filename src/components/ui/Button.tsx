import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles =
    variant === "primary" ? "btn-primary" : "btn-secondary-outline";

  return (
    <button
      {...props}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-[4px] px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-input-focus-border)] disabled:opacity-60 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
