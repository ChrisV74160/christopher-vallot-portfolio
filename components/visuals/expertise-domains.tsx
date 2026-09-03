import {
  ChartNoAxesCombined,
  ShieldCheck,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { TechnologyIcon } from "@/components/ui/technology-icon";

interface ExpertiseDomain {
  description: string;
  icon: LucideIcon;
  id: string;
  label: string;
  outcome: string;
  technologies: readonly string[];
  title: string;
}

const EXPERTISE_DOMAINS: readonly ExpertiseDomain[] = [
  {
    id: "integrer",
    label: "Sources & flux",
    title: "Intégrer & transformer",
    description:
      "Réunir les bases, fichiers et flux métier, puis harmoniser leurs formats pour construire une donnée cohérente.",
    outcome: "Des flux structurés et prêts à être contrôlés.",
    technologies: ["Python", "SQL", "PySpark", "SAS", "Cloudera", "Teradata"],
    icon: Waypoints,
  },
  {
    id: "fiabiliser",
    label: "Qualité des données",
    title: "Fiabiliser & contrôler",
    description:
      "Définir les règles de qualité, détecter les anomalies et sécuriser les rapprochements entre sources.",
    outcome: "Des données traçables et dignes de confiance.",
    technologies: [
      "Data Quality",
      "SQL",
      "Consolidation",
      "Détection d’anomalies",
    ],
    icon: ShieldCheck,
  },
  {
    id: "automatiser",
    label: "Traitements & exploitation",
    title: "Automatiser & industrialiser",
    description:
      "Remplacer les opérations manuelles par des traitements relançables, supervisés et simples à maintenir.",
    outcome: "Des processus robustes, reproductibles et moins chronophages.",
    technologies: [
      "Python",
      "PowerShell",
      "Playwright",
      "Power Automate",
      "GitLab",
      "Jenkins",
    ],
    icon: Workflow,
  },
  {
    id: "piloter",
    label: "Analyse & Business Intelligence",
    title: "Analyser & piloter",
    description:
      "Construire les modèles, KPI et tableaux de bord qui rendent l’information lisible par les équipes métier.",
    outcome: "Une information directement exploitable pour décider.",
    technologies: ["Power BI", "DAX", "Power Query", "Pandas", "Matplotlib"],
    icon: ChartNoAxesCombined,
  },
];

/**
 * Presents the portfolio's expertise as four operational domains. This replaces
 * the former technology-frequency chart: tools are now contextualised by the
 * work they support instead of being scored or repeated in a separate stack.
 */
export function ExpertiseDomains() {
  return (
    <div
      className="expertise-map"
      role="group"
      aria-label="Quatre domaines d’intervention Data et BI"
    >
      <div className="expertise-map__bar" aria-hidden="true">
        <span>
          <i /> Capacités Data &amp; BI / 04 domaines
        </span>
        <span>De la source au pilotage</span>
      </div>

      <ol className="expertise-domains">
        {EXPERTISE_DOMAINS.map((domain, index) => {
          const Icon = domain.icon;

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
                  <span>Résultat visé</span>
                  <strong>{domain.outcome}</strong>
                </p>

                <div className="expertise-domain__tools">
                  <span>Technologies principales</span>
                  <ul aria-label={`Technologies pour ${domain.title}`}>
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
