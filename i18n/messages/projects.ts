import type { Locale } from "@/i18n/config";
import type { ProjectVisualVariant } from "@/types/content";

export interface ProjectUiMessages {
  context: string;
  intervention: string;
  result: string;
  technologies: string;
  viewCase: string;
  caseNavigation: string;
  contactProject: string;
  portraitAlt: string;
  portraitLabel: string;
  portraitRole: string;
  visual: {
    sources: string;
    processing: string;
    reliableData: string;
    checks: string;
    dataModel: string;
    model: string;
    labels: Record<ProjectVisualVariant, string>;
  };
}

export const projectMessages: Record<Locale, ProjectUiMessages> = {
  fr: {
    context: "Contexte", intervention: "Intervention", result: "Résultat", technologies: "Technologies utilisées", viewCase: "Voir l’étude de cas", caseNavigation: "Sommaire de l’étude de cas", contactProject: "Discuter de votre projet",
    portraitAlt: "Portrait de Christopher Vallot", portraitLabel: "Profil / Data", portraitRole: "Consultant Data & BI Freelance · Tours",
    visual: {
      sources: "Sources", processing: "Traitements", reliableData: "Données fiables", checks: "Contrôles", dataModel: "Modèle de données", model: "Modèle",
      labels: { "data-pipeline": "Migration / contrôles", "document-automation": "Collecte / JSON / sémantique", "data-quality": "Sources / contrôle", "bi-reporting": "Modèle / reporting", "ml-model": "Variables / modèle / webservice" },
    },
  },
  en: {
    context: "Context", intervention: "Approach", result: "Outcome", technologies: "Technologies used", viewCase: "View the case study", caseNavigation: "Case study contents", contactProject: "Discuss your project",
    portraitAlt: "Portrait of Christopher Vallot", portraitLabel: "Profile / Data", portraitRole: "Freelance Data & BI Consultant · Tours",
    visual: {
      sources: "Sources", processing: "Processing", reliableData: "Reliable data", checks: "Checks", dataModel: "Data model", model: "Model",
      labels: { "data-pipeline": "Migration / checks", "document-automation": "Collection / JSON / semantics", "data-quality": "Sources / validation", "bi-reporting": "Model / reporting", "ml-model": "Features / model / web service" },
    },
  },
};
