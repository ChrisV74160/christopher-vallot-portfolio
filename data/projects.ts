import type { ProjectCaseStudy } from "@/types/content";

/**
 * Five professional case studies derived from the supplied CV. Content remains
 * qualitative: no internal or confidential data, metric or undocumented
 * architecture is introduced. The detail route renders every entry through one
 * shared template.
 */
export const projects = [
  {
    slug: "migration-integration-donnees",
    title: "Migration et fiabilisation de données multi-sources",
    status: "Expérience professionnelle",
    shortSummary:
      "Consolider et contrôler des données multi-sources dans un environnement Cloudera / Teradata.",
    seoDescription:
      "Étude de cas Data & BI : migration, intégration et fiabilisation de données multi-sources avec Python, PySpark, SQL, Cloudera et Teradata.",
    heroMeta: [
      { label: "Mission", value: "Migration & fiabilisation" },
      { label: "Environnement", value: "Cloudera · Teradata" },
      { label: "Focus", value: "Intégration · Data Quality" },
    ],
    context:
      "Migration et préparation de données dans un environnement Cloudera / Teradata.",
    problem:
      "L’intégration nécessitait des traitements analytiques fiables ainsi que des contrôles de qualité, de cohérence et d’anomalies.",
    objectives: [
      "Migrer et intégrer les données vers Cloudera et Teradata.",
      "Préparer et croiser les données multi-sources.",
      "Renforcer les contrôles de Data Quality.",
      "Optimiser les traitements analytiques.",
    ],
    data: [
      "Données multi-sources",
      "Données métier",
      "Données intégrées dans Teradata",
      "Résultats de contrôles et anomalies",
    ],
    dataGroups: [
      { label: "Sources", items: ["Données multi-sources", "Données métier"] },
      {
        label: "Environnement cible",
        items: ["Données intégrées dans Teradata"],
      },
      {
        label: "Contrôles",
        items: ["Résultats de contrôles et anomalies"],
      },
    ],
    method: [
      "Préparation et intégration des données dans l’environnement cible.",
      "Croisement et consolidation des différentes sources.",
      "Mise en œuvre de contrôles de cohérence.",
      "Définition de règles de détection d’anomalies.",
      "Optimisation des traitements analytiques.",
    ],
    intervention:
      "Développement et optimisation de la chaîne de préparation et d’intégration des données avec Python, PySpark et SQL.",
    result:
      "Un socle de données consolidé et contrôlé dans l’environnement cible, avec des traitements reproductibles et des règles permettant d’identifier les anomalies avant exploitation métier.",
    resultHighlights: [
      {
        title: "Données consolidées",
        description: "Croisement des différentes sources avant exploitation.",
      },
      {
        title: "Contrôles intégrés",
        description: "Identification des incohérences et anomalies.",
      },
      {
        title: "Traitements reproductibles",
        description:
          "Préparation et intégration structurées dans l’environnement cible.",
      },
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
    sector: "Données décisionnelles",
    featured: true,
    visualVariant: "data-pipeline",
    diagram: {
      label: "Sources → intégration → données contrôlées",
      stages: [
        { label: "Sources multi-sources", detail: "Données métier" },
        { label: "Préparation & contrôles", detail: "Python · PySpark · SQL" },
        { label: "Environnement cible", detail: "Cloudera · Teradata" },
        { label: "Données intégrées", detail: "Consolidées · contrôlées" },
      ],
    },
  },
  {
    slug: "automatisation-collecte-donnees",
    title: "Automatisation et structuration de données hétérogènes",
    status: "Expérience professionnelle",
    shortSummary:
      "Automatiser la collecte et structurer des contenus hétérogènes en données homogènes et exploitables.",
    seoDescription:
      "Étude de cas Data & BI : automatisation de la collecte et structuration de données hétérogènes avec Python, Playwright, JSON et LLaMA.",
    heroMeta: [
      { label: "Mission", value: "Collecte & automatisation" },
      { label: "Sources", value: "CRM · Web · Contenus" },
      { label: "Focus", value: "JSON · Sémantique" },
    ],
    context:
      "Collecter des informations provenant notamment d’un CRM et de contenus non structurés.",
    problem:
      "Le processus devait réunir collecte automatisée, transformation des contenus et comparaison sémantique dans une architecture évolutive.",
    objectives: [
      "Automatiser la collecte de données.",
      "Structurer les informations récupérées.",
      "Transformer les contenus non structurés vers JSON.",
      "Comparer sémantiquement les données collectées.",
    ],
    data: [
      "Données CRM",
      "Contenus non structurés",
      "Données collectées sur le web",
      "Données structurées en JSON",
    ],
    method: [
      "Automatisation de la collecte avec Python et Playwright.",
      "Structuration des données issues de sources hétérogènes.",
      "Transformation des contenus vers JSON.",
      "Conception d’un système de comparaison sémantique basé sur un LLM.",
    ],
    intervention:
      "Automatisation de la collecte avec Python, Playwright et Web Scraping, transformation des contenus en données JSON et mise en place d’un mécanisme de comparaison sémantique avec un LLM.",
    result:
      "Une chaîne automatisée permettant de collecter, structurer et homogénéiser des informations issues de sources hétérogènes avant leur exploitation et leur comparaison.",
    resultHighlights: [
      {
        title: "Collecte automatisée",
        description:
          "Automatisation de la récupération des informations avec Python et Playwright.",
      },
      {
        title: "Données structurées",
        description:
          "Transformation des contenus hétérogènes vers un format JSON exploitable.",
      },
      {
        title: "Comparaison sémantique",
        description:
          "Mise en place d’un mécanisme permettant de rapprocher les contenus collectés.",
      },
    ],
    technologies: ["Python", "Playwright", "Web Scraping", "LLaMA", "JSON", "GitLab"],
    sector: "Automatisation et collecte de données",
    featured: true,
    visualVariant: "document-automation",
    diagram: {
      label: "Collecte → structuration → comparaison",
      stages: [
        { label: "Sources", detail: "CRM · Web · Contenus" },
        { label: "Collecte automatisée", detail: "Python · Playwright" },
        { label: "Structuration", detail: "JSON" },
        { label: "Comparaison sémantique", detail: "LLM" },
      ],
    },
  },
  {
    slug: "integration-fiabilisation-flux-metier",
    title: "Automatisation et fiabilisation de flux décisionnels",
    status: "Expérience professionnelle",
    shortSummary:
      "Automatiser, consolider et contrôler des flux métier avant leur utilisation décisionnelle.",
    seoDescription:
      "Étude de cas Data & BI : automatisation et fiabilisation de flux décisionnels avec SAS, Python, SQL, PowerShell et Power BI.",
    heroMeta: [
      { label: "Mission", value: "Automatisation & Data Quality" },
      { label: "Traitements", value: "SAS · Python · SQL" },
      { label: "Focus", value: "Consolidation · Contrôles" },
    ],
    context:
      "Plusieurs flux métier devaient être extraits, transformés, consolidés et rapprochés.",
    problem:
      "Les données devaient être rapprochées et contrôlées malgré la diversité des flux et des traitements d’intégration.",
    objectives: [
      "Automatiser les traitements d’intégration.",
      "Extraire, transformer et consolider les données.",
      "Contrôler la Data Quality et rapprocher les sources.",
      "Fiabiliser l’extraction et l’alimentation des flux décisionnels.",
    ],
    data: [
      "Flux de données métier",
      "Données extraites de plusieurs sources",
      "Données consolidées et reconstituées",
      "Résultats de contrôles et de rapprochements",
    ],
    method: [
      "Développement de traitements d’intégration en SAS.",
      "Automatisation avec Python et PowerShell.",
      "Contrôles de Data Quality et rapprochements avec Power BI.",
      "Consolidation et reconstitution des données.",
    ],
    intervention:
      "Développement et automatisation de traitements avec SAS, Python, SQL et PowerShell, avec contrôles de Data Quality et rapprochements via Power BI.",
    result:
      "Des traitements d’intégration plus reproductibles, avec des données consolidées et contrôlées avant leur alimentation dans les flux décisionnels.",
    resultHighlights: [
      {
        title: "Traitements reproductibles",
        description: "Automatisation des étapes d’extraction et d’intégration.",
      },
      {
        title: "Données consolidées",
        description:
          "Reconstitution et rapprochement des informations issues de plusieurs flux.",
      },
      {
        title: "Contrôles avant utilisation",
        description:
          "Vérification de la cohérence des données avant leur exploitation décisionnelle.",
      },
    ],
    technologies: ["SAS", "Python", "SQL", "PowerShell", "Power BI"],
    sector: "Flux décisionnels",
    featured: true,
    visualVariant: "data-quality",
    diagram: {
      label: "Flux métier → contrôles → flux fiabilisés",
      stages: [
        { label: "Sources", detail: "Plusieurs flux métier" },
        { label: "Extraction & transformation", detail: "SAS · Python · SQL · PowerShell" },
        { label: "Consolidation" },
        { label: "Contrôles & rapprochements" },
        { label: "Flux fiabilisés", detail: "Usage décisionnel" },
      ],
    },
  },
  {
    slug: "reporting-power-bi-datalab",
    title: "Reporting Power BI et automatisation de processus",
    status: "Expérience professionnelle",
    shortSummary:
      "Préparer les données et automatiser leur restitution dans des reportings Power BI.",
    seoDescription:
      "Étude de cas Data & BI : préparation de données, reporting Power BI et automatisation de processus avec DAX, Power Query et Power Automate.",
    heroMeta: [
      { label: "Mission", value: "BI & Reporting" },
      { label: "Environnement", value: "Datalab" },
      { label: "Focus", value: "Power BI · Automatisation" },
    ],
    context:
      "Préparer des données métier et les rendre exploitables dans un Datalab et des reportings.",
    problem:
      "La préparation, l’analyse d’anomalies, la restitution et l’automatisation mobilisaient plusieurs étapes complémentaires.",
    objectives: [
      "Intégrer les données métier dans un Datalab.",
      "Créer et fiabiliser des datasets.",
      "Concevoir des rapports et dashboards Power BI.",
      "Automatiser les reportings et améliorer les processus.",
    ],
    data: ["Données métier", "Datasets du Datalab", "Anomalies de données", "Indicateurs de reporting"],
    method: [
      "Préparation et intégration des données dans le Datalab.",
      "Création de datasets et analyse des anomalies.",
      "Conception des restitutions avec Power BI, DAX et Power Query.",
      "Automatisation avec Power Automate.",
    ],
    intervention:
      "Création de datasets, analyse d’anomalies, dashboards Power BI, DAX, Power Query et automatisation de certains processus avec Power Automate.",
    result:
      "Des données structurées et fiabilisées, associées à une restitution Power BI directement exploitable par les utilisateurs métier et à des processus de reporting automatisés.",
    resultHighlights: [
      { title: "Données préparées", description: "Création de datasets adaptés à l’analyse et au reporting." },
      { title: "Restitution métier", description: "Conception de rapports Power BI exploitables par les utilisateurs." },
      { title: "Automatisation", description: "Automatisation de certaines étapes de reporting et de processus." },
    ],
    technologies: ["Power BI", "DAX", "Power Query", "Power Automate", "SQL", "Python"],
    sector: "Datalab et reporting",
    featured: true,
    visualVariant: "bi-reporting",
    diagram: {
      label: "Données métier → préparation → reporting",
      stages: [
        { label: "Données métier" },
        { label: "Préparation", detail: "Datasets" },
        { label: "Modèle de données" },
        { label: "Power BI", detail: "DAX · Power Query" },
        { label: "Reporting métier" },
      ],
      note: "Couche d’automatisation : Power Automate",
    },
  },
  {
    slug: "industrialisation-modele-cotation",
    title: "Industrialisation d’un modèle d’analyse de risque",
    status: "Expérience professionnelle",
    shortSummary:
      "Industrialiser un modèle d’analyse de risque et rendre ses résultats exploitables.",
    seoDescription:
      "Étude de cas Data & BI : industrialisation d’un modèle d’analyse de risque avec Python, Scikit-learn, ONNX et restitution par webservice.",
    heroMeta: [
      { label: "Mission", value: "Industrialisation" },
      { label: "Domaine", value: "Analyse de risque" },
      { label: "Focus", value: "Python · Modélisation" },
    ],
    context:
      "Faire évoluer et industrialiser un modèle de cotation d’entreprises utilisé pour l’évaluation du risque de crédit.",
    problem:
      "Le modèle et ses données nécessitaient préparation, modélisation, exposition et restitution dans une chaîne exploitable.",
    objectives: [
      "Contribuer à l’industrialisation et à l’évolution du modèle.",
      "Préparer et modéliser les données.",
      "Exposer le modèle au moyen d’un webservice.",
      "Visualiser et collecter automatiquement des données.",
    ],
    data: ["Données d’entreprises", "Données utilisées pour la cotation", "Résultats du modèle", "Données collectées automatiquement"],
    method: [
      "Analyse et préparation des données en Python.",
      "Préparation et manipulation des données avec Pandas et NumPy, avec utilisation de Scikit-learn pour les traitements liés au modèle.",
      "Développement d’un webservice d’exploitation du modèle.",
      "Visualisation et collecte automatisée de données.",
    ],
    intervention:
      "Analyse et préparation des données avec Python, Pandas, NumPy et Scikit-learn, puis développement de solutions de restitution et d’exploitation du modèle.",
    result:
      "Un modèle intégré dans une chaîne permettant son exploitation, son exposition et la restitution de ses résultats.",
    resultHighlights: [
      { title: "Modèle exploitable", description: "Intégration du modèle dans une chaîne utilisable par d’autres composants." },
      { title: "Exposition", description: "Mise à disposition du modèle au travers d’un webservice." },
      { title: "Restitution", description: "Développement de solutions permettant d’exploiter et de visualiser les résultats." },
    ],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "ONNX", "Web Scraping"],
    sector: "Risque de crédit",
    featured: false,
    visualVariant: "ml-model",
    diagram: {
      label: "Données → modèle → restitution",
      stages: [
        { label: "Données d’entreprises" },
        { label: "Préparation", detail: "Variables" },
        { label: "Modèle", detail: "Scikit-learn" },
        { label: "Webservice", detail: "Exposition" },
        { label: "Restitution", detail: "Visualisation" },
      ],
      note: "Collecte automatisée de données",
    },
  },
] as const satisfies readonly ProjectCaseStudy[];

export const featuredProjects: readonly ProjectCaseStudy[] = projects.filter(
  (project) => project.featured,
);

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projects.find((project) => project.slug === slug);
}
