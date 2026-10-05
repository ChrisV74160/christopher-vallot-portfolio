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
    "summary": "La mission au sein de la Data Factory de la CNAV porte sur l’intégration et la migration de données issues de plusieurs sources, entre différents environnements.",
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
    "summary": "Contribution à des projets exploratoires de collecte de données, d’automatisation et d’intelligence artificielle au sein du pôle Innovation d’Apside.",
    "interventions": [
      "Collecte de documents sur des plateformes de marchés publics et structuration de leur contenu.",
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
    "summary": "Au sein du pôle décisionnel d’Harmonie Mutuelle, la mission portait sur la fiabilité des flux de données liés à la santé et à la prévoyance.",
    "interventions": [
      "Évolution des traitements d’intégration, d’extraction, de transformation et de consolidation de données issues de plusieurs sources.",
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
    "summary": "La mission au sein du Datalab d’Harmonie Mutuelle portait sur les besoins métier en analyse, en reporting et en qualité des données.",
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
    "role": "Ingénieur d’études et de développement",
    "location": "Poitiers",
    "summary": "Contribution à l’industrialisation d’un modèle de cotation d’entreprises pour l’évaluation du risque de crédit, au sein du pôle Intelligence Artificielle de la Banque de France.",
    "interventions": [
      "Adaptation du modèle aux contraintes techniques et évolution des traitements associés.",
      "Préparation et analyse des données nécessaires au fonctionnement du modèle.",
      "Développement d’un service web rendant le modèle accessible à d’autres composants."
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
    "summary": "Chez Dstny, la mission portait sur la centralisation, le traitement et le contrôle de données provenant de plusieurs sources.",
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
    "description": "Formation généraliste en informatique couvrant le développement, les bases de données, l’algorithmique et les systèmes."
  }
] as const satisfies readonly Education[];
export const workPrinciples = [
  {
    "name": "Cadrer avant de construire",
    "description": "Le besoin métier, les sources disponibles et le résultat attendu définissent le périmètre de l’intervention."
  },
  {
    "name": "Construire pour durer",
    "description": "Des traitements lisibles, reproductibles et simples à maintenir facilitent la reprise par les équipes."
  },
  {
    "name": "Rendre la donnée compréhensible",
    "description": "La documentation des traitements et la clarté des restitutions permettent aux équipes de comprendre la solution et de la reprendre."
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
  summary: "Des données fiables et exploitables, de l’intégration à l’automatisation de vos traitements.",
  shortSummary: "Consultant Data & BI freelance à Tours. Intégration et qualité des données, automatisation des traitements et reporting Power BI avec SQL et Python.",
  workModes: ["À distance", "Hybride", "Sur site"],
  experiences, education, languages, workPrinciples,
} as const satisfies Profile;
