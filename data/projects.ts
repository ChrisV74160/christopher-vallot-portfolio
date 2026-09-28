import type { ProjectCaseStudy } from "@/types/content";
import { getExperienceById } from "./profile";

/** Public, qualitative case studies checked against the CV and LinkedIn export. No client data or measured gains are disclosed. */
const caseStudies = [
  {
    "slug": "migration-integration-donnees",
    "title": "Migration et intégration de données multi-sources",
    "status": "Expérience professionnelle",
    "shortSummary": "Adapter des traitements de Cloudera vers Teradata et rapprocher des données multi-sources.",
    "seoDescription": "Étude de cas Data & BI : migration, intégration et fiabilisation de données multi-sources avec Python, PySpark, SQL, Cloudera et Teradata.",
    "context": "Au sein d’une Data Factory, j’interviens sur le traitement, l’intégration et la migration de données entre Cloudera et Teradata.",
    "problem": "Les traitements existants doivent être adaptés à l’environnement cible tout en traduisant les règles métier et en réunissant plusieurs sources.",
    "objectives": [
      "Faire évoluer les traitements PySpark sur Cloudera.",
      "Adapter les traitements vers Teradata avec SQL et Shell.",
      "Intégrer et rapprocher les données multi-sources."
    ],
    "data": [
      "Données métier issues de plusieurs sources",
      "Traitements PySpark sur Cloudera",
      "Données destinées à Teradata"
    ],
    "method": [
      "Évolution de traitements PySpark et traduction des règles métier.",
      "Migration et adaptation des traitements vers Teradata avec SQL et Shell.",
      "Pseudonymisation et rapprochement de données avec Python."
    ],
    "intervention": "Je développe et adapte les traitements d’intégration. En Python, j’ai également réalisé un traitement de pseudonymisation et de rapprochement des données.",
    "result": "Des traitements adaptés à Teradata et des données préparées, intégrées et rapprochées pour les besoins métier. La mission est en cours.",
    "sector": "Données décisionnelles",
    "featured": true,
    "visualVariant": "data-pipeline",
    "experienceId": "cnav-data-analyst"
  },
  {
    "slug": "automatisation-collecte-donnees",
    "title": "Automatisation et structuration de données hétérogènes",
    "status": "Expérience professionnelle",
    "shortSummary": "Automatiser la collecte et structurer des contenus hétérogènes en données homogènes et exploitables.",
    "seoDescription": "Étude de cas Data & BI : automatisation de la collecte et structuration de données hétérogènes avec Python, Playwright, JSON et LLaMA.",
    "context": "Au sein d’un Pôle Innovation, j’ai développé des prototypes de collecte et de structuration de données issues de plateformes de marchés publics et d’un CRM.",
    "problem": "Le processus devait réunir collecte automatisée, transformation des contenus et comparaison sémantique dans une architecture évolutive.",
    "objectives": [
      "Automatiser la collecte de données.",
      "Structurer les informations récupérées.",
      "Transformer les contenus non structurés vers JSON.",
      "Comparer sémantiquement les données collectées."
    ],
    "data": [
      "Données CRM",
      "Contenus non structurés",
      "Données collectées sur le web",
      "Données structurées en JSON"
    ],
    "method": [
      "Automatisation de la collecte avec Python et Playwright.",
      "Structuration des données issues de sources hétérogènes.",
      "Transformation des contenus vers JSON.",
      "Conception d’un système de comparaison sémantique basé sur un LLM."
    ],
    "intervention": "J’ai automatisé la récupération de documents avec Python et Playwright, structuré des contenus en JSON et développé un système de comparaison sémantique utilisant des modèles LLM.",
    "result": "Des prototypes qui automatisent la collecte, structurent les contenus en JSON et permettent leur comparaison sémantique, dans une architecture modulaire.",
    "sector": "Automatisation et collecte de données",
    "featured": true,
    "visualVariant": "document-automation",
    "experienceId": "apside-ingenieur-etudes"
  },
  {
    "slug": "integration-fiabilisation-flux-metier",
    "title": "Automatisation et fiabilisation de flux décisionnels",
    "status": "Expérience professionnelle",
    "shortSummary": "Automatiser, consolider et contrôler des flux métier avant leur utilisation décisionnelle.",
    "seoDescription": "Étude de cas Data & BI : automatisation et fiabilisation de flux décisionnels avec SAS, Python, SQL, PowerShell et Power BI.",
    "context": "Au sein d’un pôle décisionnel, les données des flux santé et prévoyance devaient être intégrées, consolidées et rapprochées.",
    "problem": "Les données devaient être rapprochées et contrôlées malgré la diversité des flux et des traitements d’intégration.",
    "objectives": [
      "Automatiser les traitements d’intégration.",
      "Extraire, transformer et consolider les données.",
      "Contrôler la Data Quality et rapprocher les sources.",
      "Fiabiliser l’extraction et l’alimentation des flux décisionnels."
    ],
    "data": [
      "Flux de données métier",
      "Données extraites de plusieurs sources",
      "Données consolidées et reconstituées",
      "Résultats de contrôles et de rapprochements"
    ],
    "method": [
      "Développement de traitements d’intégration en SAS.",
      "Automatisation avec Python et PowerShell.",
      "Contrôles de Data Quality et rapprochements avec Power BI.",
      "Consolidation et reconstitution des données."
    ],
    "intervention": "J’ai développé des traitements SAS, automatisé la reconstitution de données avec Python et l’intégration avec PowerShell, puis mis en place des contrôles de cohérence et des rapprochements avec Power BI.",
    "result": "Des traitements d’intégration plus reproductibles, avec des données consolidées et contrôlées avant leur alimentation dans les flux décisionnels.",
    "sector": "Flux décisionnels",
    "featured": false,
    "visualVariant": "data-quality",
    "experienceId": "harmonie-mutuelle-data-analyst-2024"
  },
  {
    "slug": "reporting-power-bi-datalab",
    "title": "Reporting Power BI et automatisation de processus",
    "status": "Expérience professionnelle",
    "shortSummary": "Préparer les données et automatiser leur restitution dans des reportings Power BI.",
    "seoDescription": "Étude de cas Data & BI : préparation de données, reporting Power BI et automatisation de processus avec DAX, Power Query et Power Automate.",
    "context": "Préparer des données métier et les rendre exploitables dans un Datalab et des reportings.",
    "problem": "La préparation, l’analyse d’anomalies, la restitution et l’automatisation mobilisaient plusieurs étapes complémentaires.",
    "objectives": [
      "Intégrer les données métier dans un Datalab.",
      "Créer et fiabiliser des datasets.",
      "Concevoir des rapports et dashboards Power BI.",
      "Automatiser les reportings et améliorer les processus."
    ],
    "data": [
      "Données métier",
      "Datasets du Datalab",
      "Anomalies de données",
      "Indicateurs de reporting"
    ],
    "method": [
      "Préparation et intégration des données dans le Datalab.",
      "Création de datasets et analyse des anomalies.",
      "Conception des restitutions avec Power BI, DAX et Power Query.",
      "Automatisation avec Power Automate."
    ],
    "intervention": "J’ai préparé et structuré des datasets, identifié et résolu des anomalies, créé des rapports Power BI avec DAX et Power Query et automatisé leur envoi avec Power Automate.",
    "result": "Des données structurées et fiabilisées, associées à une restitution Power BI directement exploitable par les utilisateurs métier et à des processus de reporting automatisés.",
    "sector": "Datalab et reporting",
    "featured": true,
    "visualVariant": "bi-reporting",
    "experienceId": "harmonie-mutuelle-data-analyst-datalab"
  },
  {
    "slug": "industrialisation-modele-cotation",
    "title": "Industrialisation d’un modèle d’analyse de risque",
    "status": "Expérience professionnelle",
    "shortSummary": "Industrialiser un modèle d’analyse de risque et rendre ses résultats exploitables.",
    "seoDescription": "Étude de cas Data & BI : industrialisation d’un modèle d’analyse de risque avec Python, Scikit-learn, ONNX et restitution par webservice.",
    "context": "Au sein d’un pôle Intelligence Artificielle, j’ai contribué à l’industrialisation et à l’évolution d’un modèle de cotation d’entreprises pour l’évaluation du risque de crédit.",
    "problem": "Le modèle devait être adapté aux contraintes techniques de l’environnement et exposé pour être exploité par d’autres composants.",
    "objectives": [
      "Adapter le modèle aux contraintes techniques.",
      "Faire évoluer les traitements et préparer les données.",
      "Exposer le modèle au moyen d’un webservice."
    ],
    "data": [
      "Données d’entreprises utilisées pour la cotation",
      "Données nécessaires au fonctionnement du modèle"
    ],
    "method": [
      "Adaptation du modèle et maintenance des traitements associés.",
      "Préparation et analyse des données en Python, Pandas et NumPy.",
      "Développement d’un webservice permettant d’exposer le modèle."
    ],
    "intervention": "J’ai contribué à l’adaptation et à l’évolution du modèle, à la préparation et à l’analyse des données, ainsi qu’au développement de son webservice.",
    "result": "Un modèle adapté à l’environnement technique, des traitements maintenus et un webservice permettant d’exposer le modèle.",
    "sector": "Risque de crédit",
    "featured": false,
    "visualVariant": "ml-model",
    "experienceId": "banque-de-france-ingenieur-etudes"
  },
  {
    "slug": "developpement-api-python-automatisation",
    "title": "Développement d’une API Python et automatisation de données",
    "status": "Expérience professionnelle",
    "shortSummary": "Centraliser des données, générer des PDF et automatiser les contrôles et les alertes avec Python.",
    "seoDescription": "Étude de cas Dstny : développement d’une API Python, échanges SQL et API externes, génération de PDF, contrôles de cohérence et alertes sur les modifications de données.",
    "context": "Chez Dstny, à Saint-Avertin, j’ai travaillé de novembre 2018 à mars 2019 sur des solutions Python pour centraliser, traiter et contrôler des données provenant de différentes sources.",
    "problem": "L’application devait échanger avec des bases de données et des API externes, produire des documents et contrôler les informations récupérées ainsi que leurs modifications.",
    "objectives": [
      "Développer une API Python et automatiser la génération de PDF.",
      "Mettre en place les échanges avec les bases de données et les API externes.",
      "Contrôler la cohérence des données et signaler leurs modifications.",
      "Optimiser certains traitements par multithreading."
    ],
    "data": [
      "Données provenant de bases de données",
      "Informations récupérées depuis des API externes",
      "Données traitées par l’application et utilisées pour les documents PDF"
    ],
    "method": [
      "Développement d’une API Python permettant notamment la génération automatique de documents PDF.",
      "Mise en place des échanges entre l’application et les bases de données, et récupération automatisée d’informations externes.",
      "Développement de contrôles de cohérence et d’un système d’alertes sur les modifications de données.",
      "Optimisation de certains traitements grâce au multithreading."
    ],
    "intervention": "J’ai développé l’API Python, les échanges avec les sources de données et la génération de PDF. J’ai également réalisé les contrôles de cohérence, les alertes sur les modifications et l’optimisation de certains traitements par multithreading.",
    "result": "Une API Python permettant de traiter des données de plusieurs sources et de générer des PDF, complétée par des contrôles de cohérence et des alertes lors de modifications de données.",
    "sector": "Développement Python et automatisation",
    "featured": false,
    "visualVariant": "python-api",
    "experienceId": "dstny-developpeur-python"
  }
] as const satisfies readonly Omit<ProjectCaseStudy, "technologies">[];

export const projects: readonly ProjectCaseStudy[] = caseStudies.map((project) => ({
  ...project,
  technologies: getExperienceById(project.experienceId).technologies,
}));
