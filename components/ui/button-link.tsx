import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonLinkVariant = "primary" | "accent" | "secondary";

export interface ButtonLinkProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className"> {
  variant?: ButtonLinkVariant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = ["button-link", `button-link--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
}
