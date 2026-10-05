import type { Service } from "@/types/content";

/** Four service pillars, based on documented technical experience. These are offered deliverables, not claimed client results. */
export const services = [
  {
    "id": "integration-consolidation",
    "title": "Intégrer & consolider",
    "problem": "Vos données sont dispersées entre fichiers, bases et applications.",
    "intervention": "Je prépare, transforme et rapproche vos données pour les réunir dans un ensemble cohérent.",
    "outcome": "Des données consolidées et structurées pour vos analyses et vos rapports.",
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
    "problem": "Des écarts entre vos sources rendent vos données difficiles à exploiter.",
    "intervention": "Je mets en place des contrôles de cohérence et des rapprochements pour repérer les anomalies et les traiter.",
    "outcome": "Des contrôles de qualité et des anomalies identifiées pour guider les corrections.",
    "technologies": [
      "Data Quality",
      "SQL",
      "Python",
      "Power BI"
    ]
  },
  {
    "id": "automatisation",
    "title": "Automatiser les traitements",
    "problem": "Vos extractions, vos transformations ou vos envois de rapports reposent sur des tâches manuelles répétitives.",
    "intervention": "J’automatise ces tâches avec les outils adaptés à votre environnement.",
    "outcome": "Des traitements automatisés, structurés pour faciliter leur maintenance.",
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
    "problem": "Vos rapports ne répondent plus aux besoins des équipes ou sont difficiles à faire évoluer.",
    "intervention": "Je crée ou refonds vos rapports Power BI, de la préparation des données à la définition des indicateurs.",
    "outcome": "Des tableaux de bord adaptés aux besoins métier, avec des indicateurs clairs.",
    "technologies": [
      "Power BI",
      "SQL",
      "Python",
      "DAX",
      "Power Query"
    ]
  }
] as const satisfies readonly Service[];
