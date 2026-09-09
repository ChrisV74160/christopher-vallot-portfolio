import { siteName, siteDescription } from "@/lib/site-config";

export const metaMessages = {
  fr: {
    siteName, siteDescription,
    keywords: ["Consultant Data & BI", "Consultant Business Intelligence", "Consultant Power BI", "Consultant Data Quality", "Consultant Data freelance", "Consultant BI freelance", "Data Quality", "automatisation de données", "Python", "SQL", "Power BI", "Tours", "Centre-Val de Loire"],
    home: { title: siteName, description: siteDescription },
    about: { title: "À propos", description: "Parcours de Christopher Vallot, Consultant Data & BI Freelance spécialisé en transformation, Data Quality, automatisation et Business Intelligence." },
    contact: { title: "Contact", description: "Présentez votre besoin en intégration, Data Quality, automatisation, Python, SQL ou Power BI à Christopher Vallot, Consultant Data & BI Freelance." },
    projects: { title: "Projets data et études de cas", description: "Découvrez des études de cas issues d’expériences professionnelles en Business Intelligence, Data Quality, automatisation et traitement de données." },
    legal: { title: "Mentions légales", description: "Informations légales relatives au site professionnel de Christopher VALLOT, Consultant Data & BI Freelance." },
    privacy: { title: "Politique de confidentialité", description: "Politique de confidentialité et informations sur les données traitées par le formulaire de contact." },
    notFound: { title: "Étude de cas introuvable", description: "La page demandée n’est plus disponible." },
    og: { role: "Consultant Data & BI Freelance", firstLine: "Transformer le bruit", secondLine: "en signal décisionnel.", automation: "Automatisation" },
    skip: "Aller au contenu",
  },
  en: {
    siteName: "Christopher Vallot | Freelance Data & BI Consultant",
    siteDescription: "Freelance Data & BI Consultant in Tours, France. Data integration and quality, workflow automation, Python, SQL and Power BI.",
    keywords: ["Data & BI Consultant", "Business Intelligence Consultant", "Power BI Consultant", "Data Quality Consultant", "Freelance Data Consultant", "Freelance BI Consultant", "Data Quality", "data automation", "Python", "SQL", "Power BI", "Tours", "Centre-Val de Loire"],
    home: { title: "Christopher Vallot | Freelance Data & BI Consultant", description: "Freelance Data & BI Consultant in Tours, France. Data integration and quality, workflow automation, Python, SQL and Power BI." },
    about: { title: "About", description: "Christopher Vallot’s background as a freelance Data & BI Consultant, specialising in data transformation, Data Quality, automation and Business Intelligence." },
    contact: { title: "Contact", description: "Discuss your data integration, Data Quality, automation, Python, SQL or Power BI requirements with Christopher Vallot, freelance Data & BI Consultant." },
    projects: { title: "Data projects and case studies", description: "Explore case studies from professional experience in Business Intelligence, Data Quality, automation and data processing." },
    legal: { title: "Legal notice", description: "Legal information about the professional website of Christopher VALLOT, freelance Data & BI Consultant." },
    privacy: { title: "Privacy policy", description: "Privacy policy and information about the data processed through the contact form." },
    notFound: { title: "Case study not found", description: "The page you requested is no longer available." },
    og: { role: "Freelance Data & BI Consultant", firstLine: "Turning noise", secondLine: "into decision-ready data.", automation: "Automation" },
    skip: "Skip to content",
  },
} as const;
