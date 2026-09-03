import type {
  Education,
  Experience,
  Language,
  Profile,
  SkillGroup,
  SoftSkill,
} from "@/types/content";

/**
 * Professional content mirrors the supplied CV and the positioning explicitly
 * provided for LinkedIn. Keeping it centralised prevents pages and metadata
 * from drifting away from those reference sources.
 */
export const experiences = [
  {
    id: "cnav-data-analyst",
    company: "CNAV",
    role: "Data Analyst",
    period: "Depuis juillet 2025",
    location: "Tours",
    summary:
      "Migration, préparation, intégration et fiabilisation de données multi-sources.",
    highlights: [
      "Migration, préparation et intégration de données vers Cloudera et Teradata.",
      "Développement et optimisation de traitements analytiques en Python, PySpark et SQL.",
      "Mise en place de contrôles de Data Quality et de règles de détection d’anomalies.",
      "Croisement, consolidation et fiabilisation de données multi-sources pour les besoins métier.",
    ],
    technologies: [
      "Python",
      "PySpark",
      "SQL",
      "Cloudera",
      "Teradata",
      "Jenkins",
      "GitLab",
    ],
    caseStudySlug: "migration-integration-donnees",
  },
  {
    id: "apside-ingenieur-etudes",
    company: "Apside",
    role: "Ingénieur d’études et de développement",
    period: "Avril 2025 — juillet 2025",
    location: "Saint-Pierre-des-Corps",
    summary:
      "Développement de solutions d’automatisation, de collecte et de structuration de données.",
    highlights: [
      "Développement de solutions d’automatisation et de collecte de données avec Python, Playwright et Web Scraping.",
      "Structuration et transformation de données issues de sources hétérogènes, notamment CRM et contenus non structurés, vers JSON.",
      "Conception d’un système de comparaison sémantique basé sur des LLM et d’une architecture modulaire et évolutive.",
    ],
    technologies: [
      "Python",
      "Playwright",
      "Web Scraping",
      "LLaMA",
      "JSON",
      "GitLab",
    ],
    caseStudySlug: "automatisation-collecte-donnees",
  },
  {
    id: "harmonie-mutuelle-data-analyst-2024",
    company: "Harmonie Mutuelle",
    role: "Data Analyst",
    period: "Février 2024 — mars 2025",
    location: "Angers",
    summary:
      "Intégration, automatisation, consolidation et contrôle de flux de données métier.",
    highlights: [
      "Développement et automatisation de traitements d’intégration de données en SAS, Python et PowerShell.",
      "Extraction, transformation, consolidation et reconstitution de données issues de plusieurs flux métier.",
      "Mise en place de contrôles de Data Quality et de rapprochements de données avec Power BI.",
      "Automatisation des processus d’extraction et d’alimentation afin de fiabiliser et structurer les flux décisionnels.",
    ],
    technologies: ["SAS", "Python", "SQL", "PowerShell", "Power BI"],
    caseStudySlug: "integration-fiabilisation-flux-metier",
  },
  {
    id: "harmonie-mutuelle-data-analyst-datalab",
    company: "Harmonie Mutuelle",
    role: "Data Analyst",
    period: "Mars 2022 — juillet 2023",
    location: "Saint-Pierre-des-Corps",
    summary:
      "Analyse, préparation, intégration et restitution de données métier dans un Datalab.",
    highlights: [
      "Analyse, préparation et intégration de données métier dans un Datalab.",
      "Création de datasets, analyse d’anomalies et fiabilisation des données.",
      "Conception de rapports et dashboards Power BI avec DAX et Power Query.",
      "Automatisation de reportings et amélioration de processus avec Power Automate et RPA.",
    ],
    technologies: [
      "Power BI",
      "DAX",
      "Power Query",
      "Power Automate",
      "SQL",
      "Python",
    ],
    caseStudySlug: "reporting-power-bi-datalab",
  },
  {
    id: "banque-de-france-ingenieur-etudes",
    company: "Banque de France",
    role: "Ingénieur d’études et développement",
    period: "Novembre 2019 — juin 2021",
    location: "Poitiers",
    summary:
      "Industrialisation et évolution d’un modèle de cotation d’entreprises appliqué au risque de crédit.",
    highlights: [
      "Contribution à l’industrialisation et à l’évolution d’un modèle de cotation d’entreprises appliqué à l’évaluation du risque de crédit.",
      "Analyse, préparation et modélisation de données avec Python, Pandas, NumPy et Scikit-learn.",
      "Développement de solutions de restitution et d’exploitation des modèles : webservice, visualisation et collecte automatisée de données.",
    ],
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "ONNX",
      "Web Scraping",
    ],
    caseStudySlug: "industrialisation-modele-cotation",
  },
] as const satisfies readonly Experience[];

export const education = [
  {
    institution: "Université de Tours",
    degree: "Licence Informatique",
    period: "2015 — 2018",
    location: "Tours",
    description:
      "Formation généraliste en informatique avec développement, bases de données, algorithmique et systèmes.",
  },
] as const satisfies readonly Education[];

export const skillGroups = [
  {
    title: "Analyse & traitement",
    skills: ["Python", "SQL", "SAS", "PySpark", "Pandas", "NumPy"],
  },
  {
    title: "BI & reporting",
    skills: ["Power BI", "DAX", "Power Query", "Power Automate", "RPA"],
  },
  {
    title: "Plateformes & qualité",
    skills: [
      "Cloudera",
      "Teradata",
      "Data Quality",
      "Consolidation",
      "Détection d’anomalies",
    ],
  },
  {
    title: "Automatisation & collecte",
    skills: ["Playwright", "PowerShell", "Web Scraping", "JSON"],
  },
  {
    title: "Modélisation & outillage",
    skills: [
      "Scikit-learn",
      "Matplotlib",
      "ONNX",
      "LLaMA",
      "GitLab",
      "GitHub",
      "Jenkins",
    ],
  },
] as const satisfies readonly SkillGroup[];

export const softSkills = [
  {
    name: "Esprit analytique",
    description:
      "Comprendre, structurer et résoudre des problématiques complexes.",
  },
  {
    name: "Rigueur",
    description:
      "Veiller à la qualité, à la cohérence et à la fiabilité des données.",
  },
  {
    name: "Autonomie",
    description:
      "Prendre en charge un sujet de l’analyse du besoin jusqu’à sa réalisation.",
  },
  {
    name: "Adaptabilité",
    description:
      "Évoluer dans des environnements, outils et contextes métier variés.",
  },
  {
    name: "Esprit de synthèse",
    description:
      "Transformer des données complexes en informations claires et exploitables.",
  },
  {
    name: "Communication",
    description:
      "Échanger avec aisance avec les équipes techniques et métier.",
  },
] as const satisfies readonly SoftSkill[];

export const languages = [
  {
    name: "Anglais",
    description:
      "Excellente compréhension écrite et orale, avec une expression orale de niveau intermédiaire.",
  },
] as const satisfies readonly Language[];

export const profile = {
  firstName: "Christopher",
  lastName: "VALLOT",
  fullName: "Christopher VALLOT",
  role: "Consultant Data & BI Freelance",
  headline: "Python • SQL • Power BI • Data Quality • Automatisation",
  summary:
    "Consultant Data & BI Freelance, j’aide les entreprises à fiabiliser leurs données, automatiser leurs traitements et construire des reportings exploitables. J’interviens de l’intégration et la consolidation des sources jusqu’à Power BI, avec Python, SQL et la Data Quality comme fil rouge.",
  shortSummary:
    "Consultant Data & BI Freelance à Tours. Je fiabilise les données, automatise les traitements et rends l’information exploitable avec Python, SQL et Power BI.",
  location: "Tours",
  workModes: ["À distance", "Hybride", "Sur site"],
  contact: {
    email: "christopher.vallot@outlook.com",
    linkedinUrl: "https://www.linkedin.com/in/christopher-vallot/",
    cvUrl: "/cv-christopher-vallot.pdf",
  },
  experiences,
  education,
  languages,
  skillGroups,
  softSkills,
} as const satisfies Profile;
