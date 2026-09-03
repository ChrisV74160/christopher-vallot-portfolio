import type {
  InterventionCase,
  MissionFormat,
  Service,
} from "@/types/content";

export const services = [
  {
    id: "business-intelligence",
    title: "Business Intelligence & Power BI",
    problem:
      "Vos indicateurs sont dispersés, difficiles à lire ou votre reporting devient complexe à maintenir.",
    intervention:
      "Je structure les données, les KPI et le modèle de restitution pour construire, reprendre ou fiabiliser un reporting Power BI utile aux équipes métier.",
    deliverables: [
      "Dashboard Power BI",
      "Définition et documentation des KPI",
      "Modèle de données",
      "DAX",
      "Power Query",
      "Reprise ou optimisation d’un reporting existant",
    ],
  },
  {
    id: "analyse-donnees",
    title: "Analyse & exploitation de données",
    problem:
      "Vous disposez de données mais leur exploitation demande encore des extractions manuelles, des requêtes ponctuelles ou des analyses difficiles à reproduire.",
    intervention:
      "J’explore, croise et mets en perspective les données avec SQL et Python afin d’identifier les écarts, produire les jeux de données nécessaires et répondre aux questions métier.",
    deliverables: [
      "Analyse exploratoire ou métier",
      "Requêtes SQL",
      "Scripts Python",
      "Croisement de données",
      "Jeu de données préparé",
      "Synthèse des constats",
    ],
  },
  {
    id: "data-quality",
    title: "Data Quality & fiabilisation",
    problem:
      "Des valeurs manquantes, des incohérences ou des écarts entre sources fragilisent vos analyses.",
    intervention:
      "Je définis les contrôles, rapproche les sources et traite les anomalies avant que les données ne soient utilisées.",
    deliverables: [
      "Règles de contrôle et de validation",
      "Analyse des anomalies",
      "Rapprochement de sources",
      "Données nettoyées et consolidées",
      "Suivi des contrôles de qualité",
    ],
  },
  {
    id: "automatisation",
    title: "Automatisation de traitements & reportings",
    problem:
      "Des extractions, consolidations ou envois de reportings sont encore réalisés manuellement.",
    intervention:
      "J’automatise les étapes répétitives avec Python, SQL, PowerShell, Power Query ou Power Automate selon l’environnement.",
    deliverables: [
      "Scripts et traitements automatisés",
      "Chaîne de reporting reproductible",
      "Contrôles intégrés",
      "Documentation d’exploitation",
    ],
  },
  {
    id: "integration-consolidation",
    title: "Intégration & consolidation de données",
    problem:
      "Vos données proviennent de plusieurs flux, bases, fichiers ou outils et ne peuvent pas être exploitées directement ensemble.",
    intervention:
      "Je prépare, normalise et consolide les sources afin de construire un socle de données cohérent, contrôlé et prêt pour l’analyse ou le reporting.",
    deliverables: [
      "Cartographie des sources",
      "Règles de transformation",
      "Pipeline de préparation des données",
      "Jeu de données consolidé",
      "Contrôles de cohérence entre sources",
    ],
  },
] as const satisfies readonly Service[];

export const interventionCases = [
  {
    id: "reporting-maintenance",
    title: "Votre reporting Power BI devient difficile à maintenir",
    description:
      "Reprise des sources, transformations, modèle de données, KPI, DAX et restitution afin de simplifier et fiabiliser l’existant.",
  },
  {
    id: "data-quality",
    title: "Vos données ne sont pas suffisamment fiables",
    description:
      "Mise en place de contrôles, rapprochements, consolidation et détection d’anomalies entre différentes sources.",
  },
  {
    id: "manual-processes",
    title: "Des traitements sont encore réalisés manuellement",
    description:
      "Automatisation des extractions, transformations, contrôles et reportings avec les outils adaptés à votre environnement.",
  },
  {
    id: "multiple-systems",
    title: "Vos données proviennent de plusieurs systèmes",
    description:
      "Préparation, normalisation et consolidation de fichiers, bases, API ou autres sources dans un jeu de données cohérent.",
  },
] as const satisfies readonly InterventionCase[];

export const missionFormats = [
  {
    id: "audit",
    title: "Audit ciblé",
    description:
      "Identifier ce qui doit être fiabilisé, automatisé ou simplifié.",
  },
  {
    id: "renfort",
    title: "Renfort Data / BI",
    description:
      "Intégrer une équipe existante sur une problématique ou un périmètre défini.",
  },
  {
    id: "reprise",
    title: "Reprise d’un existant",
    description:
      "Fiabiliser ou faire évoluer un reporting, un traitement ou un flux déjà en place.",
  },
  {
    id: "bout-en-bout",
    title: "Réalisation de bout en bout",
    description:
      "Prendre en charge le besoin depuis les sources jusqu’au livrable métier.",
  },
] as const satisfies readonly MissionFormat[];
