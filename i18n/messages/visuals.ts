import type { Locale } from "@/i18n/config";

interface PipelineStepText {
  action: string; code: string; input: string; nodeDetail: string; nodeLabel: string; output: string; title: string;
}
interface ExpertiseDomainText {
  id: string; label: string; title: string; description: string; outcome: string; technologies: readonly string[];
}
interface VisualMessages {
  flow: { description: string; title: string; status: string; sources: string; checked: string; reliableData: string; ready: string; steps: readonly string[] };
  pipeline: {
    eyebrow: string; title: string; intro: string; fullDescription: string; consoleTitle: string; step: string; of: string; input: string; action: string; output: string; progress: string; ready: string; keepScrolling: string; steps: readonly PipelineStepText[];
  };
  expertise: {
    description: string; title: string; subtitle: string; outcome: string; technologies: string; technologiesFor: string; domains: readonly ExpertiseDomainText[];
  };
}

/** Only copy is localized: diagram layout, icons and animation timing remain in their components. */
export const visualMessages: Record<Locale, VisualMessages> = {
  fr: {
    flow: {
      description: "Chaîne Data et BI : des sources SQL, CSV et API sont contrôlées et fiabilisées avant d'être restituées dans Power BI pour faciliter la décision.",
      title: "Chaîne Data & BI / vue d’ensemble", status: "Flux actif", sources: "Sources", checked: "Contrôlé", reliableData: "Données fiables", ready: "Prêt à décider", steps: ["01 · Collecter", "02 · Fiabiliser", "03 · Piloter"],
    },
    pipeline: {
      eyebrow: "Méthode / 4 étapes concrètes", title: "De vos sources à une information fiable et exploitable.", intro: "Faites défiler : chaque étape précise ce qui entre, ce qui est réalisé et ce que les équipes obtiennent.", fullDescription: "Détail complet des quatre étapes du processus Data et BI", consoleTitle: "PROCESSUS DATA & BI · 4 ÉTAPES", step: "Étape", of: "sur", input: "Entrées", action: "Intervention", output: "Résultat", progress: "Progression globale", ready: "Prêt à piloter", keepScrolling: "Continuez à faire défiler",
      steps: [
        { code: "CADRER", nodeLabel: "Sources", nodeDetail: "Connecter et documenter", title: "Cadrer les sources utiles", input: "Bases, fichiers, API et outils métier.", action: "Cartographier les formats, les propriétaires, les règles d’usage et le périmètre réellement nécessaire.", output: "Des sources identifiées, documentées et prêtes à être intégrées." },
        { code: "PRÉPARER", nodeLabel: "Préparation", nodeDetail: "Nettoyer et automatiser", title: "Préparer et automatiser les traitements", input: "Données brutes, dispersées ou hétérogènes.", action: "Nettoyer, harmoniser, consolider et automatiser les transformations avec Python et SQL.", output: "Des traitements reproductibles, lisibles et maintenables." },
        { code: "FIABILISER", nodeLabel: "Qualité", nodeDetail: "Contrôler et tracer", title: "Contrôler et fiabiliser les données", input: "Données transformées et règles métier attendues.", action: "Détecter doublons, valeurs manquantes et écarts, puis tracer chaque contrôle et son résultat.", output: "Des données contrôlées, explicables et prêtes pour l’analyse." },
        { code: "PILOTER", nodeLabel: "Pilotage", nodeDetail: "Analyser et restituer", title: "Restituer une information actionnable", input: "Données validées et besoins de pilotage cadrés.", action: "Construire les modèles de données, KPI et rapports Power BI, avec les mesures DAX adaptées aux besoins métier.", output: "Une information claire, exploitable et directement actionnable." },
      ],
    },
    expertise: {
      description: "Quatre domaines d’intervention Data et BI", title: "Capacités Data & BI / 04 domaines", subtitle: "De la source au pilotage", outcome: "Résultat visé", technologies: "Technologies principales", technologiesFor: "Technologies pour",
      domains: [
        { id: "integrer", label: "Sources & flux", title: "Intégrer & transformer", description: "Réunir les bases, fichiers et flux métier, puis harmoniser leurs formats pour construire une donnée cohérente.", outcome: "Des flux structurés et prêts à être contrôlés.", technologies: ["Python", "SQL", "PySpark", "SAS", "Cloudera", "Teradata"] },
        { id: "fiabiliser", label: "Qualité des données", title: "Fiabiliser & contrôler", description: "Définir les règles de qualité, détecter les anomalies et sécuriser les rapprochements entre sources.", outcome: "Des données traçables et dignes de confiance.", technologies: ["Data Quality", "SQL", "Consolidation", "Détection d’anomalies"] },
        { id: "automatiser", label: "Traitements & exploitation", title: "Automatiser & industrialiser", description: "Remplacer les opérations manuelles par des traitements relançables, supervisés et simples à maintenir.", outcome: "Des processus robustes, reproductibles et moins chronophages.", technologies: ["Python", "PowerShell", "Playwright", "Power Automate", "GitLab", "Jenkins"] },
        { id: "piloter", label: "Analyse & Business Intelligence", title: "Analyser & piloter", description: "Construire les modèles, KPI et tableaux de bord qui rendent l’information lisible par les équipes métier.", outcome: "Une information directement exploitable pour décider.", technologies: ["Power BI", "DAX", "Power Query", "Pandas", "Matplotlib"] },
      ],
    },
  },
  en: {
    flow: {
      description: "Data and BI pipeline: SQL, CSV and API sources are checked and made reliable before being presented in Power BI to support decision-making.",
      title: "Data & BI pipeline / overview", status: "Flow active", sources: "Sources", checked: "Validated", reliableData: "Reliable data", ready: "Ready for decisions", steps: ["01 · Collect", "02 · Validate", "03 · Inform decisions"],
    },
    pipeline: {
      eyebrow: "Method / 4 practical steps", title: "From your sources to reliable, actionable information.", intro: "Scroll to explore what goes into each step, the work involved and what teams get out of it.", fullDescription: "Full details of the four steps in the Data and BI process", consoleTitle: "DATA & BI PROCESS · 4 STEPS", step: "Step", of: "of", input: "Inputs", action: "Approach", output: "Outcome", progress: "Overall progress", ready: "Ready for decisions", keepScrolling: "Keep scrolling",
      steps: [
        { code: "SCOPE", nodeLabel: "Sources", nodeDetail: "Connect and document", title: "Scope the relevant sources", input: "Databases, files, APIs and business tools.", action: "Map formats, owners, usage rules and the scope that is actually needed.", output: "Identified, documented sources ready for integration." },
        { code: "PREPARE", nodeLabel: "Preparation", nodeDetail: "Clean and automate", title: "Prepare and automate processing", input: "Raw, scattered or heterogeneous data.", action: "Clean, standardise, consolidate and automate transformations with Python and SQL.", output: "Repeatable, understandable and maintainable processing." },
        { code: "VALIDATE", nodeLabel: "Quality", nodeDetail: "Check and trace", title: "Check data quality and reliability", input: "Transformed data and agreed business rules.", action: "Detect duplicates, missing values and discrepancies, then record each check and its result.", output: "Validated, explainable data ready for analysis." },
        { code: "INFORM", nodeLabel: "Insights", nodeDetail: "Analyse and report", title: "Deliver actionable information", input: "Validated data and clearly defined reporting needs.", action: "Build data models, KPIs and Power BI reports, with DAX measures tailored to business requirements.", output: "Clear, usable information that directly supports action." },
      ],
    },
    expertise: {
      description: "Four areas of Data and BI expertise", title: "Data & BI capabilities / 04 areas", subtitle: "From sources to decision-making", outcome: "Intended outcome", technologies: "Core technologies", technologiesFor: "Technologies for",
      domains: [
        { id: "integrer", label: "Sources & flows", title: "Integrate & transform", description: "Bring databases, files and business data flows together, then standardise their formats to create consistent data.", outcome: "Structured flows ready for validation.", technologies: ["Python", "SQL", "PySpark", "SAS", "Cloudera", "Teradata"] },
        { id: "fiabiliser", label: "Data quality", title: "Validate & improve reliability", description: "Define quality rules, detect anomalies and make reconciliation between sources reliable.", outcome: "Traceable, trustworthy data.", technologies: ["Data Quality", "SQL", "Consolidation", "Anomaly detection"] },
        { id: "automatiser", label: "Processing & operations", title: "Automate & industrialise", description: "Replace manual tasks with monitored processes that are easy to rerun and maintain.", outcome: "Robust, repeatable and less time-consuming processes.", technologies: ["Python", "PowerShell", "Playwright", "Power Automate", "GitLab", "Jenkins"] },
        { id: "piloter", label: "Analysis & Business Intelligence", title: "Analyse & inform decisions", description: "Build models, KPIs and dashboards that make information clear for business teams.", outcome: "Information that can be used directly to make decisions.", technologies: ["Power BI", "DAX", "Power Query", "Pandas", "Matplotlib"] },
      ],
    },
  },
};
