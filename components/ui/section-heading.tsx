import type { ComponentPropsWithoutRef, ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3;

export interface SectionHeadingProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children" | "title"> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Alias for `description`, useful when matching editorial content models. */
  intro?: ReactNode;
  level?: HeadingLevel;
  headingId?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  intro,
  level = 2,
  headingId,
  children,
  className,
  ...props
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : level === 3 ? "h3" : "h2";
  const supportingContent = children ?? description ?? intro;
  const classes = ["section-heading", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Heading className="section-title" id={headingId}>
          {title}
        </Heading>
      </div>
      {supportingContent ? (
        typeof supportingContent === "string" ? (
          <p className="section-intro">{supportingContent}</p>
        ) : (
          supportingContent
        )
      ) : null}
    </div>
  );
}
