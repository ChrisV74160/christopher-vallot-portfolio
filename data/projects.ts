import type { ProjectCaseStudy } from "@/types/content";
import { getExperienceById } from "./profile";

/** Public, qualitative case studies checked against the CV and LinkedIn export. No client data or measured gains are disclosed. */
const caseStudies = [
  {
    "slug": "migration-integration-donnees",
    "title": "Migration et intégration de données multi-sources",
    "status": "Expérience professionnelle",
    "shortSummary": "Migrer et adapter des traitements de Cloudera vers Teradata, puis rapprocher des données issues de plusieurs sources.",
    "seoDescription": "Étude de cas Data & BI : migration, intégration et fiabilisation de données multi-sources avec Python, PySpark, SQL, Cloudera et Teradata.",
    "context": "Au sein d’une Data Factory, la mission porte sur le traitement, l’intégration et la migration de données entre Cloudera et Teradata.",
    "problem": "L’enjeu est d’adapter les traitements à l’environnement cible, de traduire les règles métier en traitements techniques et de rapprocher les données issues de plusieurs sources.",
    "objectives": [
      "Faire évoluer les traitements PySpark sur Cloudera.",
      "Adapter les traitements à Teradata avec SQL et Shell.",
      "Intégrer et rapprocher les données multi-sources."
    ],
    "data": [
      "Données métier issues de plusieurs sources",
      "Traitements PySpark sur Cloudera",
      "Données destinées à Teradata"
    ],
    "method": [
      "Évolution de traitements PySpark et traduction des règles métier.",
      "Migration des traitements vers Teradata et adaptation à cet environnement avec SQL et Shell.",
      "Pseudonymisation et rapprochement de données avec Python."
    ],
    "intervention": "L’intervention porte sur le développement et l’adaptation des traitements d’intégration. Un traitement Python de pseudonymisation et de rapprochement des données a également été réalisé.",
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
    "shortSummary": "Automatiser la collecte et structurer des contenus hétérogènes dans un format homogène et exploitable.",
    "seoDescription": "Étude de cas Data & BI : automatisation de la collecte et structuration de données hétérogènes avec Python, Playwright, JSON et LLaMA.",
    "context": "La mission au sein d’un pôle Innovation portait sur le développement de prototypes pour collecter et structurer des données issues de plateformes de marchés publics et d’un CRM.",
    "problem": "Le processus devait réunir collecte automatisée, transformation des contenus et comparaison sémantique dans une architecture évolutive.",
    "objectives": [
      "Automatiser la collecte de données.",
      "Structurer les informations récupérées.",
      "Structurer les contenus non structurés au format JSON.",
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
      "Transformation des contenus au format JSON.",
      "Conception d’un système de comparaison sémantique fondé sur un modèle de langage (LLM)."
    ],
    "intervention": "La récupération de documents a été automatisée avec Python et Playwright. Les contenus ont été structurés en JSON et un système de comparaison sémantique a été développé à l’aide de modèles de langage (LLM).",
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
    "problem": "La diversité des flux et des traitements d’intégration nécessitait des contrôles de cohérence et des rapprochements entre les sources.",
    "objectives": [
      "Automatiser les traitements d’intégration.",
      "Extraire, transformer et consolider les données.",
      "Contrôler la qualité des données et rapprocher les sources.",
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
      "Contrôles de qualité des données et rapprochements avec Power BI.",
      "Consolidation et reconstitution des données."
    ],
    "intervention": "L’intervention a combiné le développement de traitements SAS, la reconstitution automatisée de données avec Python et l’intégration avec PowerShell. Des contrôles de cohérence et des rapprochements ont ensuite été mis en place avec Power BI.",
    "result": "Des traitements d’intégration plus reproductibles et des données consolidées et contrôlées avant leur intégration dans le système décisionnel.",
    "sector": "Flux décisionnels",
    "featured": false,
    "visualVariant": "data-quality",
    "experienceId": "harmonie-mutuelle-data-analyst-2024"
  },
  {
    "slug": "reporting-power-bi-datalab",
    "title": "Reporting Power BI et automatisation de processus",
    "status": "Expérience professionnelle",
    "shortSummary": "Préparer les données et automatiser la diffusion des rapports Power BI.",
    "seoDescription": "Étude de cas Data & BI : préparation de données, reporting Power BI et automatisation de processus avec DAX, Power Query et Power Automate.",
    "context": "La mission au sein du Datalab portait sur la préparation de données métier et leur exploitation dans des rapports Power BI.",
    "problem": "L’enjeu était de fiabiliser les données, de traiter les anomalies et d’automatiser la diffusion des rapports, de la préparation à la restitution.",
    "objectives": [
      "Intégrer les données métier dans un Datalab.",
      "Créer et fiabiliser des jeux de données.",
      "Concevoir des rapports et des tableaux de bord Power BI.",
      "Automatiser la diffusion des rapports et améliorer les processus de reporting."
    ],
    "data": [
      "Données métier",
      "Jeux de données du Datalab",
      "Anomalies de données",
      "Indicateurs de reporting"
    ],
    "method": [
      "Préparation et intégration des données dans le Datalab.",
      "Création de jeux de données et analyse des anomalies.",
      "Conception de rapports avec Power BI, DAX et Power Query.",
      "Automatisation avec Power Automate."
    ],
    "intervention": "Les jeux de données ont été préparés et structurés, puis les anomalies identifiées et corrigées. Des rapports Power BI ont été créés avec DAX et Power Query, et leur envoi automatisé avec Power Automate.",
    "result": "Des jeux de données structurés et fiabilisés, des rapports Power BI exploitables par les équipes métier et une diffusion automatisée.",
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
    "seoDescription": "Étude de cas Data & BI : industrialisation d’un modèle d’analyse de risque avec Python, Scikit-learn, ONNX et restitution par service web.",
    "context": "Contribution à l’industrialisation et à l’évolution d’un modèle de cotation d’entreprises pour l’évaluation du risque de crédit, au sein d’un pôle Intelligence Artificielle.",
    "problem": "Le modèle devait être adapté aux contraintes techniques de l’environnement et rendu accessible à d’autres composants par un service web.",
    "objectives": [
      "Adapter le modèle aux contraintes techniques.",
      "Faire évoluer les traitements et préparer les données.",
      "Rendre le modèle accessible au moyen d’un service web."
    ],
    "data": [
      "Données d’entreprises utilisées pour la cotation",
      "Données nécessaires au fonctionnement du modèle"
    ],
    "method": [
      "Adaptation du modèle et maintenance des traitements associés.",
      "Préparation et analyse des données avec Python, Pandas et NumPy.",
      "Développement d’un service web rendant le modèle accessible à d’autres composants."
    ],
    "intervention": "La contribution a porté sur l’adaptation et l’évolution du modèle, la préparation et l’analyse des données, ainsi que le développement de son service web.",
    "result": "Un modèle adapté à l’environnement technique, des traitements maintenus et un service web rendant le modèle accessible à d’autres composants.",
    "sector": "Risque de crédit",
    "featured": false,
    "visualVariant": "ml-model",
    "experienceId": "banque-de-france-ingenieur-etudes"
  },
  {
    "slug": "developpement-api-python-automatisation",
    "title": "Développement d’une API Python et automatisation des traitements",
    "status": "Expérience professionnelle",
    "shortSummary": "Centraliser des données, générer des PDF et automatiser les contrôles et les alertes avec Python.",
    "seoDescription": "Étude de cas Dstny : développement d’une API Python, échanges SQL et API externes, génération de PDF, contrôles de cohérence et alertes sur les modifications de données.",
    "context": "Chez Dstny, à Saint-Avertin, la mission menée de novembre 2018 à mars 2019 portait sur des solutions Python pour centraliser, traiter et contrôler des données issues de plusieurs sources.",
    "problem": "L’application devait échanger avec des bases de données et des API externes, générer des documents, contrôler les données récupérées et détecter leurs modifications.",
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
    "intervention": "L’intervention a porté sur l’API Python, les échanges avec les sources de données et la génération de PDF. Elle a également couvert les contrôles de cohérence, les alertes sur les modifications et l’optimisation de certains traitements par multithreading.",
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
