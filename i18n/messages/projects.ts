import type { Locale } from "@/i18n/config";

export interface ProjectUiMessages {
  technologies: string;
  viewCase: string;
  contactProject: string;
  portraitAlt: string;
  portraitLabel: string;
  portraitRole: string;
}

export const projectMessages: Record<Locale, ProjectUiMessages> = {
  fr: {
    technologies: "Technologies utilisées", viewCase: "Voir l’étude de cas", contactProject: "Discuter de votre projet",
    portraitAlt: "Portrait de Christopher VALLOT", portraitLabel: "Parcours professionnel", portraitRole: "Consultant Data & BI freelance · Tours",
  },
  en: {
    technologies: "Technologies used", viewCase: "View the case study", contactProject: "Discuss your project",
    portraitAlt: "Portrait of Christopher VALLOT", portraitLabel: "Professional background", portraitRole: "Freelance Data & BI Consultant · Tours",
  },
};
