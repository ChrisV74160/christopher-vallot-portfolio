import type { ComponentPropsWithoutRef } from "react";

export type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className, ...props }: ContainerProps) {
  const classes = ["container-shell", className].filter(Boolean).join(" ");

  return <div className={classes} {...props} />;
}
