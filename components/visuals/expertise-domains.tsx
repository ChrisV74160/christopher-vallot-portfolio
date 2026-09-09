import {
  ChartNoAxesCombined,
  ShieldCheck,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { TechnologyIcon } from "@/components/ui/technology-icon";
import type { Locale } from "@/i18n/config";
import { visualMessages } from "@/i18n/messages/visuals";

const domainIcons: Record<string, LucideIcon> = {
  integrer: Waypoints, fiabiliser: ShieldCheck, automatiser: Workflow, piloter: ChartNoAxesCombined,
};

/**
 * Presents the portfolio's expertise as four operational domains. This replaces
 * the former technology-frequency chart: tools are now contextualised by the
 * work they support instead of being scored or repeated in a separate stack.
 */
export function ExpertiseDomains({ locale = "fr" }: { locale?: Locale }) {
  const messages = visualMessages[locale].expertise;
  return (
    <div
      className="expertise-map"
      role="group"
      aria-label={messages.description}
    >
      <div className="expertise-map__bar" aria-hidden="true">
        <span>
          <i /> {messages.title}
        </span>
        <span>{messages.subtitle}</span>
      </div>

      <ol className="expertise-domains">
        {messages.domains.map((domain, index) => {
          const Icon = domainIcons[domain.id];

          return (
            <li key={domain.id}>
              <article
                className={`expertise-domain expertise-domain--${domain.id}`}
              >
                <header className="expertise-domain__header">
                  <span className="expertise-domain__signal" aria-hidden="true">
                    <Icon focusable="false" size={22} strokeWidth={1.65} />
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </span>
                  <div>
                    <p className="expertise-domain__label">{domain.label}</p>
                    <h3>{domain.title}</h3>
                  </div>
                </header>

                <p className="expertise-domain__description">
                  {domain.description}
                </p>

                <p className="expertise-domain__outcome">
                  <span>{messages.outcome}</span>
                  <strong>{domain.outcome}</strong>
                </p>

                <div className="expertise-domain__tools">
                  <span>{messages.technologies}</span>
                  <ul aria-label={`${messages.technologiesFor} ${domain.title}`}>
                    {domain.technologies.map((technology) => (
                      <li key={technology}>
                        <TechnologyIcon name={technology} size={16} />
                        <span>{technology}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
