import {
  Braces,
  BrainCircuit,
  ChartColumnBig,
  ChartNoAxesCombined,
  Code2,
  Combine,
  Database,
  Globe2,
  MousePointerClick,
  ScanSearch,
  ShieldCheck,
  Sigma,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiApachespark,
  SiCloudera,
  SiGithub,
  SiGitlab,
  SiJenkins,
  SiJson,
  SiNumpy,
  SiOnnx,
  SiPandas,
  SiPython,
  SiScikitlearn,
  SiTeradata,
} from "react-icons/si";
import { TbBrandPowershell } from "react-icons/tb";

type TechnologyGlyph = IconType | LucideIcon;

interface TechnologyIconDefinition {
  color: string;
  glyph: TechnologyGlyph;
}

interface TechnologyIconProps {
  className?: string;
  name: string;
  size?: number;
}

/**
 * Central icon registry for every technology label used by the portfolio.
 * Brand marks are used when the installed icon set provides one; concepts and
 * proprietary tools deliberately receive a semantic glyph instead of a fake logo.
 */
const TECHNOLOGY_ICONS: Record<string, TechnologyIconDefinition> = {
  Python: { glyph: SiPython, color: "#3776ab" },
  PySpark: { glyph: SiApachespark, color: "#e25a1c" },
  Pandas: { glyph: SiPandas, color: "#150458" },
  NumPy: { glyph: SiNumpy, color: "#4dabcf" },
  SQL: { glyph: Database, color: "#007f73" },
  SAS: { glyph: Sigma, color: "#0066a1" },
  "Power BI": { glyph: ChartColumnBig, color: "#c68b00" },
  DAX: { glyph: Braces, color: "#b47700" },
  "Power Query": { glyph: Waypoints, color: "#16896f" },
  "Power Automate": { glyph: Workflow, color: "#0066ff" },
  Cloudera: { glyph: SiCloudera, color: "#f06424" },
  Teradata: { glyph: SiTeradata, color: "#f37440" },
  "Data Quality": { glyph: ShieldCheck, color: "#008d80" },
  Consolidation: { glyph: Combine, color: "#6656d9" },
  "Détection d’anomalies": { glyph: ScanSearch, color: "#c44d82" },
  "Anomaly detection": { glyph: ScanSearch, color: "#c44d82" },
  Playwright: { glyph: MousePointerClick, color: "#2ead33" },
  PowerShell: { glyph: TbBrandPowershell, color: "#2671be" },
  "Web Scraping": { glyph: Globe2, color: "#008d80" },
  JSON: { glyph: SiJson, color: "#52616b" },
  "Scikit-learn": { glyph: SiScikitlearn, color: "#f7931e" },
  Matplotlib: { glyph: ChartNoAxesCombined, color: "#245b8f" },
  ONNX: { glyph: SiOnnx, color: "#005ced" },
  LLaMA: { glyph: BrainCircuit, color: "#7c52c9" },
  GitLab: { glyph: SiGitlab, color: "#e24329" },
  GitHub: { glyph: SiGithub, color: "#d8e2eb" },
  Jenkins: { glyph: SiJenkins, color: "#a43d3d" },
};

const DEFAULT_ICON: TechnologyIconDefinition = {
  glyph: Code2,
  color: "#435966",
};

export function TechnologyIcon({
  className,
  name,
  size = 18,
}: TechnologyIconProps) {
  const definition = TECHNOLOGY_ICONS[name] ?? DEFAULT_ICON;
  const Glyph = definition.glyph;
  const classes = ["technology-icon", className].filter(Boolean).join(" ");

  return (
    <span
      aria-hidden="true"
      className={classes}
      style={
        { "--technology-color": definition.color } as CSSProperties
      }
    >
      <Glyph focusable="false" size={size} />
    </span>
  );
}
