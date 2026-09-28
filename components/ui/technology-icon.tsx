import {
  Braces,
  Code2,
  Database,
  Plug,
  ShieldCheck,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiCloudera,
  SiJson,
  SiMeta,
  SiOnnx,
  SiTeradata,
} from "react-icons/si";

type TechnologyGlyph = IconType | LucideIcon;
type TechnologyIconDefinition = { color: string } & (
  | { glyph: TechnologyGlyph }
  | { src: string }
);

interface TechnologyIconProps {
  className?: string;
  name: string;
  size?: number;
}

/**
 * Shared by the hero, expertise and case studies in both languages.
 * Product logos retain their original colours. SQL and generic
 * practices retain semantic symbols: they are not individual software brands.
 * Local logo attribution is recorded in public/technologies/LICENSE.txt.
 */
const TECHNOLOGY_ICONS: Record<string, TechnologyIconDefinition> = {
  Python: { src: "/technologies/python.svg", color: "var(--brand-secondary)" },
  PySpark: { src: "/technologies/apachespark.svg", color: "var(--brand-secondary)" },
  Pandas: { src: "/technologies/pandas.svg", color: "var(--brand-secondary)" },
  NumPy: { src: "/technologies/numpy.svg", color: "var(--brand-secondary)" },
  SQL: { glyph: Database, color: "var(--brand-secondary)" },
  Shell: { glyph: Terminal, color: "var(--brand-secondary)" },
  API: { glyph: Plug, color: "var(--brand-secondary)" },
  SAS: { src: "/technologies/sas.ico", color: "var(--brand-secondary)" },
  "Power BI": { src: "/technologies/power-bi.svg", color: "var(--brand-secondary)" },
  DAX: { glyph: Braces, color: "var(--brand-primary)" },
  "Power Query": { src: "/technologies/power-query.svg", color: "var(--brand-secondary)" },
  "Power Automate": { src: "/technologies/power-automate.svg", color: "var(--brand-secondary)" },
  Cloudera: { glyph: SiCloudera, color: "#F96702" },
  Teradata: { glyph: SiTeradata, color: "#F37440" },
  "Data Quality": { glyph: ShieldCheck, color: "var(--brand-quality)" },
  Playwright: { src: "/technologies/playwright.svg", color: "var(--brand-secondary)" },
  PowerShell: { src: "/technologies/powershell.svg", color: "var(--brand-secondary)" },
  JSON: { glyph: SiJson, color: "var(--brand-primary)" },
  "Scikit-learn": { src: "/technologies/scikitlearn.svg", color: "var(--brand-secondary)" },
  Matplotlib: { src: "/technologies/matplotlib.svg", color: "var(--brand-secondary)" },
  ONNX: { glyph: SiOnnx, color: "#005CED" },
  // PySpark uses Apache Spark's mark; LLaMA is identified by its publisher Meta.
  LLaMA: { glyph: SiMeta, color: "#0866FF" },
  GitLab: { src: "/technologies/gitlab.svg", color: "var(--brand-secondary)" },
  Jenkins: { src: "/technologies/jenkins.svg", color: "var(--brand-secondary)" },
};

const DEFAULT_ICON: TechnologyIconDefinition = {
  glyph: Code2,
  color: "var(--brand-primary)",
};

export function TechnologyIcon({
  className,
  name,
  size = 18,
}: TechnologyIconProps) {
  const definition = Object.hasOwn(TECHNOLOGY_ICONS, name)
    ? TECHNOLOGY_ICONS[name]
    : DEFAULT_ICON;
  const classes = ["technology-icon", className].filter(Boolean).join(" ");

  return (
    <span
      aria-hidden="true"
      className={classes}
      style={{ "--technology-color": definition.color } as CSSProperties}
    >
      {"src" in definition ? (
        <Image
          src={definition.src}
          alt=""
          width={size}
          height={size}
          unoptimized
          draggable={false}
        />
      ) : (
        <definition.glyph focusable="false" size={size} />
      )}
    </span>
  );
}
