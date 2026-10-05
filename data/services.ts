import type { Service } from "@/types/content";

/** Four service pillars, based on documented technical experience. These are offered deliverables, not claimed client results. */
export const services = [
  {
    "id": "integration-consolidation",
    "title": "Intégrer & consolider",
    "problem": "Vos données sont dispersées entre fichiers, bases et applications.",
    "intervention": "Vos données sont préparées, transformées et rapprochées pour être utilisées ensemble.",
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
    "intervention": "Des contrôles de qualité et des rapprochements permettent d’identifier les anomalies et les incohérences.",
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
    "problem": "L’extraction, la transformation des données et la production de rapports nécessitent encore des manipulations manuelles.",
    "intervention": "L’automatisation des traitements récurrents s’appuie sur des outils adaptés à votre environnement.",
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
    "problem": "Vos rapports sont difficiles à comprendre, à faire évoluer ou à maintenir.",
    "intervention": "L’analyse de vos données permet de créer ou d’améliorer vos modèles, indicateurs et rapports Power BI.",
    "outcome": "Des rapports utiles aux équipes, avec des indicateurs compréhensibles.",
    "technologies": [
      "Power BI",
      "SQL",
      "Python",
      "DAX",
      "Power Query"
    ]
  }
] as const satisfies readonly Service[];
