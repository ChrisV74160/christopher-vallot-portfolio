import type { Education, Experience, Language, Profile, WorkPrinciple } from "@/types/content";
import { identity } from "./identity";
import { formatExperiencePeriod } from "@/i18n/format-period";

/** Facts checked against the supplied two-page CV. Organisations are professional assignments, not freelance client references. */
const experienceFacts = [
  {
    "id": "cnav-data-analyst",
    "company": "CNAV",
    "employer": "Apside",
    "startDate": "2025-07",
    "endDate": null,
    "role": "Data Analyst",
    "location": "Tours",
    "summary": "Au sein de la Data Factory de la CNAV, j’interviens sur des données multi-sources à intégrer et à migrer entre différents environnements.",
    "interventions": [
      "Traduction des règles métier et adaptation des traitements lors des migrations.",
      "Développement d’un traitement de pseudonymisation et de rapprochement de données.",
      "Création d’un outil de collecte automatisée de données publiques."
    ],
    "technologies": [
      "Python",
      "PySpark",
      "SQL",
      "Shell",
      "Cloudera",
      "Teradata",
      "Jenkins",
      "GitLab"
    ],
    "caseStudySlug": "migration-integration-donnees"
  },
  {
    "id": "apside-ingenieur-etudes",
    "company": "Apside",
    "employer": "Apside",
    "startDate": "2025-04",
    "endDate": "2025-06",
    "role": "Ingénieur d’études et de développement",
    "location": "Saint-Pierre-des-Corps",
    "summary": "Au Pôle Innovation d’Apside, j’ai participé à des projets exploratoires autour de la collecte de données, de l’automatisation et de l’intelligence artificielle.",
    "interventions": [
      "Collecte documentaire sur des plateformes de marchés publics et structuration de contenus non structurés.",
      "Exploitation de données CRM pour automatiser certaines affectations.",
      "Développement d’un système de comparaison sémantique et d’une architecture modulaire pour faciliter les évolutions."
    ],
    "technologies": [
      "Python",
      "Playwright",
      "LLaMA",
      "JSON",
      "GitLab"
    ],
    "caseStudySlug": "automatisation-collecte-donnees"
  },
  {
    "id": "harmonie-mutuelle-data-analyst-2024",
    "company": "Harmonie Mutuelle",
    "employer": "Apside",
    "startDate": "2024-02",
    "endDate": "2025-03",
    "role": "Data Analyst",
    "location": "Angers",
    "summary": "Au pôle décisionnel d’Harmonie Mutuelle, j’intervenais sur la fiabilité des flux de données liés à la santé et à la prévoyance.",
    "interventions": [
      "Évolution des traitements d’intégration, extraction, transformation et consolidation de plusieurs sources.",
      "Contrôles de cohérence et rapprochement des données traitées.",
      "Automatisation de la reconstitution de données et de l’alimentation du système décisionnel."
    ],
    "technologies": [
      "SAS",
      "Python",
      "SQL",
      "PowerShell",
      "Power BI"
    ],
    "caseStudySlug": "integration-fiabilisation-flux-metier"
  },
  {
    "id": "harmonie-mutuelle-data-analyst-datalab",
    "company": "Harmonie Mutuelle",
    "employer": "Apside",
    "startDate": "2022-03",
    "endDate": "2023-07",
    "role": "Data Analyst",
    "location": "Saint-Pierre-des-Corps",
    "summary": "Chez Harmonie Mutuelle, j’intervenais dans un Datalab sur les besoins métier d’analyse, de reporting et de qualité des données.",
    "interventions": [
      "Analyse, intégration et structuration de jeux de données adaptés aux besoins métier.",
      "Identification et correction d’anomalies dans les données.",
      "Création de rapports et de tableaux de bord, puis automatisation de leur diffusion."
    ],
    "technologies": [
      "Power BI",
      "DAX",
      "Power Query",
      "Power Automate",
      "SQL",
      "Python"
    ],
    "caseStudySlug": "reporting-power-bi-datalab"
  },
  {
    "id": "banque-de-france-ingenieur-etudes",
    "company": "Banque de France",
    "employer": "Apside",
    "startDate": "2019-11",
    "endDate": "2021-06",
    "role": "Ingénieur d’études et développement",
    "location": "Poitiers",
    "summary": "Au pôle Intelligence Artificielle de la Banque de France, j’ai contribué à l’industrialisation d’un modèle de cotation d’entreprises pour l’évaluation du risque de crédit.",
    "interventions": [
      "Adaptation du modèle aux contraintes techniques et évolution des traitements associés.",
      "Préparation et analyse des données nécessaires au fonctionnement du modèle.",
      "Développement d’un webservice pour exposer le modèle."
    ],
    "technologies": [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "ONNX"
    ],
    "caseStudySlug": "industrialisation-modele-cotation"
  },
  {
    "id": "dstny-developpeur-python",
    "company": "Dstny",
    "employer": "Dstny",
    "startDate": "2018-11",
    "endDate": "2019-03",
    "role": "Développeur Python",
    "location": "Saint-Avertin",
    "summary": "Chez Dstny, j’intervenais sur la centralisation, le traitement et le contrôle de données provenant de plusieurs sources.",
    "interventions": [
      "Échanges avec les bases de données, récupération automatisée d’informations externes et génération de PDF.",
      "Contrôles de cohérence et alertes sur les modifications de données.",
      "Optimisation de certains traitements par exécution parallèle."
    ],
    "technologies": [
      "Python",
      "API",
      "SQL",
      "JSON"
    ],
    "caseStudySlug": "developpement-api-python-automatisation"
  }
] as const satisfies readonly Omit<Experience, "period">[];
export type ExperienceId = (typeof experienceFacts)[number]["id"];
export const experiences = experienceFacts.map((experience) => ({
  ...experience, period: formatExperiencePeriod(experience.startDate, experience.endDate, "fr"),
})) satisfies readonly Experience[];

/** Case studies reuse the technical environment of their documented experience. */
export function getExperienceById(id: ExperienceId): Experience {
  const experience = experiences.find((item) => item.id === id);
  if (!experience) throw new Error(`Unknown professional experience: ${id}`);
  return experience;
}

export const education = [
  {
    "institution": "Université de Tours",
    "degree": "Licence Informatique",
    "period": "2015 — 2018",
    "location": "Tours",
    "description": "Formation généraliste en informatique avec développement, bases de données, algorithmique et systèmes."
  }
] as const satisfies readonly Education[];
export const workPrinciples = [
  {
    "name": "Cadrer avant de construire",
    "description": "Je pars du besoin métier, des sources disponibles et du résultat attendu pour définir ce qui est utile."
  },
  {
    "name": "Construire pour durer",
    "description": "Je privilégie des traitements lisibles, reproductibles et simples à maintenir."
  },
  {
    "name": "Rendre la donnée compréhensible",
    "description": "Je documente les traitements et restitue l’information pour que les équipes puissent la comprendre et la reprendre."
  }
] as const satisfies readonly WorkPrinciple[];
export const languages = [
  {
    "name": "Anglais",
    "description": "Très bonne compréhension écrite, expression orale intermédiaire."
  }
] as const satisfies readonly Language[];
export const profile = {
  ...identity,
  role: "Consultant Data & BI freelance",
  experienceLabel: "Plus de 6 ans d’expérience",
  summary: "J’intègre, fiabilise et automatise vos données pour les rendre réellement exploitables.",
  shortSummary: "Consultant Data & BI freelance à Tours. Intégration, Data Quality, automatisation et reporting Power BI, avec SQL et Python.",
  workModes: ["À distance", "Hybride", "Sur site"],
  experiences, education, languages, workPrinciples,
} as const satisfies Profile;
