import type { FaqItem } from "@/types/content";

export const faqItems = [
  {
    id: "types-de-missions",
    question: "Sur quels types de missions pouvez-vous intervenir ?",
    answer:
      "Sur des besoins d’intégration et de consolidation de données, de Data Quality, d’automatisation et de Business Intelligence. Le périmètre peut aller des sources et contrôles jusqu’aux KPI et reportings Power BI.",
  },
  {
    id: "distance-presentiel",
    question: "Intervenez-vous à distance ou sur site ?",
    answer:
      "Oui. Les missions peuvent être réalisées à distance, en hybride ou sur site depuis Tours, selon le contexte, les équipes et les besoins de la mission.",
  },
  {
    id: "reporting-existant",
    question: "Pouvez-vous reprendre un reporting ou un dashboard existant ?",
    answer:
      "Oui. L’intervention peut commencer par un audit des sources, des transformations, du modèle, des KPI et des usages afin d’identifier ce qui doit être fiabilisé, simplifié ou automatisé.",
  },
  {
    id: "technologies",
    question: "Quelles technologies utilisez-vous principalement ?",
    answer:
      "Principalement Python, SQL, Power BI, DAX et Power Query. Selon l’environnement, mon expérience couvre également PySpark, SAS, PowerShell, Power Automate, Cloudera, Teradata, GitLab et Jenkins.",
  },
  {
    id: "demarrage-mission",
    question: "Comment démarre une mission ?",
    answer:
      "Par un échange sur le besoin métier, les utilisateurs, les données disponibles et les contraintes. Le périmètre et les livrables sont ensuite cadrés avant le démarrage de la réalisation.",
  },
  {
    id: "confidentialite",
    question: "Comment gérez-vous les données et projets confidentiels ?",
    answer:
      "Les études de cas présentées ici reprennent des expériences professionnelles sans divulguer de données internes ou d’informations confidentielles. Pour une mission, les accès, les données manipulées et les règles de sécurité sont cadrés avec l’entreprise avant le démarrage.",
  },
  {
    id: "formats-mission",
    question: "Quels formats de mission proposez-vous ?",
    answer:
      "Audit ciblé, renfort au sein d’une équipe, reprise d’un existant ou réalisation de bout en bout. Le format dépend du besoin, du périmètre et de l’autonomie attendue.",
  },
] as const satisfies readonly FaqItem[];
