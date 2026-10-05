import type { ProjectCaseStudy } from "@/types/content";
import { getExperienceById } from "./profile";

/** Public, qualitative case studies checked against the CV and LinkedIn export. No client data or measured gains are disclosed. */
const caseStudies = [
  {
    "slug": "migration-integration-donnees",
    "title": "Migration de traitements de Cloudera vers Teradata",
    "status": "Expérience professionnelle",
    "shortSummary": "Adapter des traitements PySpark à Teradata et intégrer des données issues de plusieurs sources.",
    "seoDescription": "Mission CNAV via Apside : traitements PySpark sur Cloudera, migration vers Teradata avec SQL et Shell, pseudonymisation et rapprochement en Python.",
    "context": "Depuis juillet 2025, j’interviens via Apside au sein de la Data Factory de la CNAV sur le traitement, l’intégration et la migration de données.",
    "problem": "La migration de Cloudera vers Teradata demande d’adapter les traitements aux contraintes du nouvel environnement tout en appliquant les règles métier.",
    "objectives": [
      "Faire évoluer les traitements PySpark sur Cloudera.",
      "Adapter les traitements à Teradata avec SQL et Shell.",
      "Intégrer des données issues de plusieurs sources et développer leur rapprochement en Python."
    ],
    "data": [
      "Données métier issues de plusieurs sources",
      "Données à pseudonymiser et à rapprocher",
      "Données publiques collectées automatiquement"
    ],
    "method": [
      "Développer et faire évoluer les traitements PySpark sur Cloudera.",
      "Traduire les règles métier et adapter les traitements à Teradata avec SQL et Shell.",
      "Développer un traitement Python de pseudonymisation et de rapprochement de données."
    ],
    "intervention": "Je traduis les règles métier en traitements d’intégration et de migration. Mes travaux comprennent aussi un traitement de pseudonymisation et de rapprochement, ainsi qu’un outil de collecte automatisée de données publiques.",
    "result": "La mission est en cours. Les travaux menés couvrent l’évolution des traitements PySpark, leur adaptation à Teradata et le développement d’outils Python pour la pseudonymisation, le rapprochement et la collecte de données.",
    "sector": "Intégration et migration de données",
    "featured": true,
    "visualVariant": "data-pipeline",
    "experienceId": "cnav-data-analyst"
  },
  {
    "slug": "automatisation-collecte-donnees",
    "title": "Prototypes de collecte et de comparaison sémantique",
    "status": "Expérience professionnelle",
    "shortSummary": "Automatiser la collecte de documents, structurer des contenus en JSON et expérimenter la comparaison sémantique.",
    "seoDescription": "Au pôle Innovation d’Apside : prototypes de collecte de documents, structuration de données CRM et comparaison sémantique avec Python, Playwright et LLaMA.",
    "context": "D’avril à juin 2025, j’ai travaillé au pôle Innovation d’Apside sur plusieurs prototypes de collecte, d’automatisation et d’intelligence artificielle.",
    "problem": "Les travaux répondaient à plusieurs besoins : récupérer des documents sur des plateformes de marchés publics, structurer des données CRM et expérimenter la comparaison sémantique de contenus.",
    "objectives": [
      "Automatiser la collecte de documents de marchés publics.",
      "Structurer les données CRM pour automatiser certaines affectations.",
      "Transformer des contenus non structurés en JSON.",
      "Expérimenter la comparaison sémantique avec des mesures de similarité et des modèles de langage."
    ],
    "data": [
      "Documents issus de plateformes de marchés publics",
      "Données CRM",
      "Contenus non structurés à transformer en JSON"
    ],
    "method": [
      "Automatiser la récupération de documents avec Python et Playwright.",
      "Structurer les données CRM et convertir des contenus en JSON.",
      "Combiner mesures de similarité et modèles de langage, dont LLaMA, pour comparer des contenus.",
      "Organiser le code dans une architecture modulaire pour faciliter les évolutions."
    ],
    "intervention": "J’ai développé des prototypes sur ces différents sujets, en travaillant sur la collecte, la transformation des contenus et leur comparaison. L’architecture modulaire visait à faciliter la maintenance et l’évolution du code.",
    "result": "Des prototypes de collecte automatisée, de structuration de données et de comparaison sémantique. Ces travaux exploratoires ont associé Python, Playwright, JSON et des modèles de langage.",
    "sector": "Automatisation et collecte de données",
    "featured": true,
    "visualVariant": "document-automation",
    "experienceId": "apside-ingenieur-etudes"
  },
  {
    "slug": "integration-fiabilisation-flux-metier",
    "title": "Automatisation et fiabilisation de flux décisionnels",
    "status": "Expérience professionnelle",
    "shortSummary": "Intégrer des flux santé et prévoyance, automatiser leur traitement et contrôler leur cohérence.",
    "seoDescription": "Mission Harmonie Mutuelle via Apside : intégration SAS, reconstitution de données en Python, chargement PowerShell et contrôles avec Power BI.",
    "context": "De février 2024 à mars 2025, j’ai travaillé via Apside au pôle décisionnel d’Harmonie Mutuelle sur les flux de données santé et prévoyance.",
    "problem": "L’enjeu était de consolider les données issues de plusieurs sources et de vérifier leur cohérence pour alimenter le système décisionnel.",
    "objectives": [
      "Développer et faire évoluer les traitements d’intégration.",
      "Extraire, transformer et consolider les données.",
      "Contrôler leur cohérence et rapprocher les sources.",
      "Automatiser la reconstitution des données et leur chargement."
    ],
    "data": [
      "Flux de données santé et prévoyance",
      "Données issues de plusieurs sources",
      "Données à consolider, rapprocher et reconstituer"
    ],
    "method": [
      "Développer les traitements d’intégration et de consolidation en SAS.",
      "Automatiser la reconstitution de données avec Python.",
      "Automatiser l’intégration et le chargement avec PowerShell.",
      "Mettre en place des contrôles de cohérence et des rapprochements avec Power BI."
    ],
    "intervention": "J’ai contribué aux différentes étapes des flux : extraction, transformation, consolidation, reconstitution et chargement. Les contrôles et les rapprochements avec Power BI complétaient ces traitements pour travailler sur la fiabilité des données.",
    "result": "Des traitements SAS développés et maintenus, une reconstitution automatisée avec Python, des chargements automatisés avec PowerShell et des contrôles de cohérence avec Power BI.",
    "sector": "Flux décisionnels",
    "featured": false,
    "visualVariant": "data-quality",
    "experienceId": "harmonie-mutuelle-data-analyst-2024"
  },
  {
    "slug": "reporting-power-bi-datalab",
    "title": "Rapports Power BI et diffusion automatisée",
    "status": "Expérience professionnelle",
    "shortSummary": "Préparer et fiabiliser les données métier, créer des rapports Power BI et automatiser leur envoi.",
    "seoDescription": "Mission au Datalab d’Harmonie Mutuelle via Apside : qualité des données, rapports Power BI avec DAX et Power Query, diffusion avec Power Automate.",
    "context": "De mars 2022 à juillet 2023, j’ai travaillé via Apside au Datalab d’Harmonie Mutuelle sur l’analyse, le reporting et la qualité des données.",
    "problem": "Les besoins métier demandaient des jeux de données structurés, un traitement des anomalies et des rapports dont la diffusion pouvait être automatisée.",
    "objectives": [
      "Intégrer les données métier dans un Datalab.",
      "Créer et fiabiliser des jeux de données.",
      "Concevoir des rapports et des tableaux de bord Power BI.",
      "Automatiser la diffusion des rapports."
    ],
    "data": [
      "Données métier intégrées au Datalab",
      "Jeux de données pour l’analyse et le reporting",
      "Indicateurs présentés dans les rapports Power BI"
    ],
    "method": [
      "Préparer et intégrer les données dans le Datalab.",
      "Structurer les jeux de données, identifier et corriger les anomalies.",
      "Créer les rapports et les tableaux de bord avec Power BI, DAX et Power Query.",
      "Automatiser l’envoi des rapports avec Power Automate."
    ],
    "intervention": "J’ai travaillé de la préparation des données à leur restitution dans Power BI, en corrigeant les anomalies et en automatisant l’envoi des rapports. La mission comprenait aussi la maintenance et l’évolution d’un robot de gestion des contrats.",
    "result": "Des jeux de données structurés, des anomalies corrigées, des rapports et des tableaux de bord Power BI créés, avec un envoi automatisé par Power Automate.",
    "sector": "Datalab et reporting",
    "featured": true,
    "visualVariant": "bi-reporting",
    "experienceId": "harmonie-mutuelle-data-analyst-datalab"
  },
  {
    "slug": "industrialisation-modele-cotation",
    "title": "Industrialisation d’un modèle de cotation d’entreprises",
    "status": "Expérience professionnelle",
    "shortSummary": "Adapter un modèle de cotation aux contraintes techniques et l’exposer par un service web.",
    "seoDescription": "Mission Banque de France via Apside : contribution à l’industrialisation d’un modèle de cotation d’entreprises, préparation des données et service web.",
    "context": "De novembre 2019 à juin 2021, j’ai contribué via Apside à l’industrialisation et à l’évolution d’un modèle de cotation d’entreprises au pôle Intelligence Artificielle de la Banque de France.",
    "problem": "Ce modèle, utilisé pour évaluer le risque de crédit, devait être adapté aux contraintes techniques de l’environnement cible et exposé par un service web.",
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
      "Adapter le modèle et maintenir les traitements associés.",
      "Préparer et analyser les données nécessaires au modèle.",
      "Développer un service web pour exposer le modèle."
    ],
    "intervention": "J’ai contribué à l’adaptation du modèle, à l’évolution des traitements et à son exposition par un service web. Dans le cadre de cette mission, j’ai également développé un prototype de prédiction de prix immobiliers au mètre carré.",
    "result": "Une contribution à l’adaptation du modèle de cotation, des traitements maintenus et un service web développé pour exposer le modèle.",
    "sector": "Risque de crédit",
    "featured": false,
    "visualVariant": "ml-model",
    "experienceId": "banque-de-france-ingenieur-etudes"
  },
  {
    "slug": "developpement-api-python-automatisation",
    "title": "API Python, contrôles et automatisation",
    "status": "Expérience professionnelle",
    "shortSummary": "Centraliser les données, générer des PDF et détecter les modifications avec des contrôles et des alertes.",
    "seoDescription": "Chez Dstny : API Python, génération de PDF, intégration de bases de données et d’API externes, contrôles de cohérence, alertes et multithreading.",
    "context": "De novembre 2018 à mars 2019, j’ai développé chez Dstny, à Saint-Avertin, des solutions Python pour centraliser, traiter et contrôler des données issues de plusieurs sources.",
    "problem": "L’application devait récupérer des informations depuis des bases de données et des API externes, générer des documents PDF et signaler les modifications de données.",
    "objectives": [
      "Développer une API Python et automatiser la génération de PDF.",
      "Mettre en place les échanges avec les bases de données et les API externes.",
      "Contrôler la cohérence des données et signaler leurs modifications.",
      "Optimiser certains traitements par multithreading."
    ],
    "data": [
      "Données provenant de bases de données",
      "Informations récupérées depuis des API externes",
      "Données utilisées pour générer les documents PDF"
    ],
    "method": [
      "Développer une API Python avec génération automatique de PDF.",
      "Relier l’application aux bases de données et automatiser la récupération d’informations depuis les API externes.",
      "Mettre en place des contrôles de cohérence et des alertes sur les modifications.",
      "Optimiser certains traitements par multithreading."
    ],
    "intervention": "J’ai développé l’API, les échanges avec les sources de données, la génération de PDF, les contrôles et les alertes. Certains traitements ont été optimisés par multithreading.",
    "result": "Une API Python avec génération automatique de PDF, des échanges avec les bases de données et les API externes, ainsi que des contrôles de cohérence et un système d’alertes.",
    "sector": "Développement Python et automatisation",
    "featured": false,
    "visualVariant": "python-api",
    "experienceId": "dstny-developpeur-python"
  }
] as const satisfies readonly Omit<ProjectCaseStudy, "technologies">[];

export type ProjectSlug = (typeof caseStudies)[number]["slug"];

export const projects: readonly (ProjectCaseStudy & { slug: ProjectSlug })[] = caseStudies.map((project) => ({
  ...project,
  technologies: getExperienceById(project.experienceId).technologies,
}));
