import type { ComponentPropsWithoutRef } from "react";

export type BadgeVariant = "default" | "accent";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({
  variant = "default",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const classes = [
    "badge",
    variant === "accent" ? "badge--accent" : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {dot ? <span aria-hidden="true" className="badge-dot" /> : null}
      {children}
    </span>
  );
}
