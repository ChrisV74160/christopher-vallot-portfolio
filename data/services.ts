import type { Service } from "@/types/content";

/** Four service pillars, based on documented technical experience. These are offered deliverables, not claimed client results. */
export const services = [
  {
    "id": "integration-consolidation",
    "title": "Intégrer & consolider",
    "problem": "Vos données sont dispersées entre fichiers, bases et applications.",
    "intervention": "Je prépare, transforme et rapproche les sources pour les faire fonctionner ensemble.",
    "outcome": "Un jeu de données consolidé et structuré pour vos usages.",
    "technologies": [
      "SQL",
      "Python",
      "PySpark",
      "SAS"
    ]
  },
  {
    "id": "data-quality",
    "title": "Fiabiliser & contrôler",
    "problem": "Des incohérences ou des anomalies rendent vos données difficiles à utiliser.",
    "intervention": "Je mets en place les contrôles de Data Quality et les rapprochements utiles.",
    "outcome": "Des données vérifiées et des anomalies identifiées.",
    "technologies": [
      "Data Quality",
      "SQL",
      "Python",
      "Power BI"
    ]
  },
  {
    "id": "automatisation",
    "title": "Automatiser & industrialiser",
    "problem": "Les extractions, transformations et reportings mobilisent encore des manipulations manuelles.",
    "intervention": "J’automatise les traitements récurrents avec les outils adaptés à votre environnement.",
    "outcome": "Des traitements reproductibles, documentés et simples à maintenir.",
    "technologies": [
      "Python",
      "SQL",
      "PowerShell",
      "Power Automate"
    ]
  },
  {
    "id": "business-intelligence",
    "title": "Analyser & piloter",
    "problem": "Vos reportings sont difficiles à comprendre, à faire évoluer ou à maintenir.",
    "intervention": "J’analyse les données et construis ou reprends vos modèles, KPI et rapports Power BI.",
    "outcome": "Un reporting utile aux équipes, avec des indicateurs compréhensibles.",
    "technologies": [
      "Power BI",
      "SQL",
      "Python",
      "DAX",
      "Power Query"
    ]
  }
] as const satisfies readonly Service[];
