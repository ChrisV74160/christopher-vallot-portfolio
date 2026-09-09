import type { Locale } from "@/i18n/config";
import { DecisionPipeline } from "@/components/visuals/decision-pipeline";

export function DecisionSection({ locale = "fr" }: { locale?: Locale }) {
  return <DecisionPipeline locale={locale} />;
}
