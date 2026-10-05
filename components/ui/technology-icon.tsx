import Image from "next/image";
import type { CSSProperties } from "react";
import catalogue from "@/data/technology-icons.json";

type TechnologyIconDefinition = { slug: string; color: string };

interface TechnologyIconProps {
  className?: string;
  name: string;
  size?: number;
}

/**
 * Shared by the hero, expertise and case studies in both languages.
 * Every local SVG is generated from its native master or a locked icon library.
 * PySpark uses Apache Spark's mark; LLaMA is identified by its publisher Meta.
 * Logo attribution is recorded in public/technologies/LICENSE.txt.
 */
const TECHNOLOGY_ICONS: Record<string, TechnologyIconDefinition> = catalogue.icons;

export function TechnologyIcon({
  className,
  name,
  size = 18,
}: TechnologyIconProps) {
  const definition = Object.hasOwn(TECHNOLOGY_ICONS, name)
    ? TECHNOLOGY_ICONS[name]
    : catalogue.fallback;
  const classes = ["technology-icon", className].filter(Boolean).join(" ");

  return (
    <span
      aria-hidden="true"
      className={classes}
      style={{ "--technology-color": definition.color } as CSSProperties}
    >
      <Image
        src={`/technologies/${definition.slug}.svg`}
        alt=""
        width={size}
        height={size}
        unoptimized
        draggable={false}
      />
    </span>
  );
}
