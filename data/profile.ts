import type { Education, Experience, Language, Profile, WorkPrinciple } from "@/types/content";
import { identity } from "./identity";
import { formatExperiencePeriod } from "@/i18n/format-period";

/** Facts checked against the supplied CV and LinkedIn export. Organisations are professional assignments, not freelance client references. */
const experienceFacts = [
  {
    "id": "cnav-data-analyst",
    "company": "CNAV",
    "employer": "Apside",
    "startDate": "2025-07",
    "endDate": null,
    "role": "Data Analyst",
    "location": "Tours",
    "summary": "Au sein de la Data Factory de la CNAV, j’interviens sur l’intégration de données et la migration de traitements de Cloudera vers Teradata.",
    "interventions": [
      "Développer les traitements PySpark sur Cloudera et les adapter à Teradata avec SQL et Shell, en appliquant les règles métier.",
      "Pseudonymiser et rapprocher des données avec Python.",
      "Développer un outil de collecte automatisée de données publiques."
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
    "summary": "Au pôle Innovation d’Apside, j’ai développé des prototypes de collecte de documents, d’automatisation et de comparaison sémantique.",
    "interventions": [
      "Automatiser la collecte de documents sur des plateformes de marchés publics avec Python et Playwright.",
      "Structurer des données CRM, automatiser certaines affectations et transformer des contenus non structurés en JSON.",
      "Expérimenter la comparaison sémantique avec des mesures de similarité et des modèles de langage, dans une architecture modulaire."
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
    "summary": "Au pôle décisionnel d’Harmonie Mutuelle, j’ai travaillé sur l’intégration, l’automatisation et la fiabilité des flux de données santé et prévoyance.",
    "interventions": [
      "Développer et faire évoluer des traitements SAS pour intégrer, transformer et consolider des données issues de plusieurs sources.",
      "Mettre en place des contrôles de cohérence et des rapprochements avec Power BI.",
      "Automatiser la reconstitution de données avec Python et leur chargement avec PowerShell."
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
    "summary": "Au Datalab d’Harmonie Mutuelle, j’ai préparé des données métier et créé des rapports Power BI. J’ai également maintenu et fait évoluer un robot de gestion des contrats.",
    "interventions": [
      "Analyser, intégrer et structurer les jeux de données nécessaires au reporting.",
      "Identifier et corriger les anomalies pour améliorer la qualité des données.",
      "Créer des rapports et des tableaux de bord avec Power BI, DAX et Power Query, puis automatiser leur diffusion avec Power Automate."
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
    "summary": "Au pôle Intelligence Artificielle de la Banque de France, j’ai contribué à l’industrialisation et à l’évolution d’un modèle de cotation d’entreprises utilisé pour évaluer le risque de crédit.",
    "interventions": [
      "Adapter le modèle aux contraintes techniques et maintenir les traitements associés.",
      "Préparer et analyser les données nécessaires au modèle.",
      "Développer un service web exposant le modèle et un prototype de prédiction de prix immobiliers au mètre carré."
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
    "summary": "Chez Dstny, j’ai développé des solutions Python pour centraliser et contrôler des données issues de bases de données et d’API externes.",
    "interventions": [
      "Développer une API Python avec génération automatique de PDF et échanges avec les bases de données et les API externes.",
      "Créer des contrôles de cohérence et des alertes sur les modifications de données.",
      "Optimiser certains traitements par multithreading."
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
    "description": "Je pars du besoin métier et des données disponibles pour traduire les attentes en traitements, contrôles et rapports."
  },
  {
    "name": "Construire pour durer",
    "description": "Je privilégie un code lisible et une architecture modulaire pour faciliter la maintenance et les évolutions."
  },
  {
    "name": "Rendre la donnée compréhensible",
    "description": "Je structure les données et les indicateurs pour produire des rapports clairs, que les équipes métier peuvent utiliser."
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
  summary: "J’intègre et fiabilise vos données, automatise vos traitements et conçois vos rapports Power BI.",
  shortSummary: "Consultant Data & BI freelance à Tours, j’accompagne les entreprises en intégration et qualité des données, automatisation et reporting Power BI, avec SQL et Python.",
  workModes: ["À distance", "Hybride", "Sur site"],
  experiences, education, languages, workPrinciples,
} as const satisfies Profile;
