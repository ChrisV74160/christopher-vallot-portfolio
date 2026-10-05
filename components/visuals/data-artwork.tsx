import type { Locale } from "@/i18n/config";

/** Generated vectors share the original SVG dimensions and layout classes. */
export function DashboardArtwork({ className = "", variant = "hero" }: { className?: string; variant?: "hero" | "contact" }) {
  const [width, height] = variant === "hero" ? [600, 560] : [560, 380];
  return <svg className={["data-artwork", className].join(" ")} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
    <image href={`/artwork/${variant}.svg`} width={width} height={height} />
  </svg>;
}

export function ConversationArtwork({ className = "", variant = "default" }: { className?: string; variant?: "default" | "similar" }) {
  const source = variant === "similar" ? "conversation-similar" : "conversation";
  return <svg className={["data-artwork", className].join(" ")} viewBox="0 0 500 320" aria-hidden="true" focusable="false">
    <image href={`/artwork/${source}.svg`} width="500" height="320" />
  </svg>;
}

const pipelineLabels = {
  fr: ["Sources", "Intégration", "Transformation", "Data Quality", "Modèle", "Reporting"],
  en: ["Sources", "Integration", "Transformation", "Data Quality", "Model", "Reporting"],
} as const;

/** The translated labels remain HTML so the existing responsive grid is shared. */
export function ServicesArtwork({ locale }: { locale: Locale }) {
  return <div className="services-artwork" aria-hidden="true">
    {pipelineLabels[locale].map((label, stage) => <div className="pipeline-tile" key={label}>
      <span>{label}</span>
      <svg viewBox="0 0 112 72" focusable="false">
        <image href={`/artwork/pipeline-${stage}.svg`} width="112" height="72" />
      </svg>
    </div>)}
  </div>;
}

/** Text keeps its inherited font and context colour on both locale pages. */
export function AlignmentArtwork({ locale }: { locale: Locale }) {
  const labels = locale === "fr" ? ["Donnée", "Technique", "Métier"] : ["Data", "Technology", "Business"];
  return <svg className="alignment-artwork" viewBox="0 0 480 96" aria-hidden="true" focusable="false">
    <image href="/artwork/alignment.svg" width="480" height="96" />
    {labels.map((label, index) => <text key={label} x={70 + index * 170} y="87" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="inherit">{label}</text>)}
  </svg>;
}
