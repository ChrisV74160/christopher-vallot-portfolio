import { siteName, siteDescription } from "@/lib/site-config";

export const metaMessages = {
  fr: {
    siteName, siteDescription,
    keywords: ["Consultant Data & BI", "Consultant Business Intelligence", "Consultant Power BI", "Consultant Data Quality", "Consultant Data freelance", "Consultant BI freelance", "Data Quality", "automatisation des traitements", "Python", "SQL", "Power BI", "Tours", "Centre-Val de Loire"],
    home: { title: siteName, description: siteDescription },
    about: { title: "À propos et expériences Data & BI", description: "Parcours de Christopher VALLOT, consultant Data & BI freelance : intégration et qualité des données, automatisation des traitements et reporting Power BI." },
    contact: { title: "Discutons de votre projet Data & BI", description: "Présentez votre projet d’intégration de données, de contrôle qualité, d’automatisation des traitements ou de reporting Power BI à Christopher VALLOT." },
    projects: { title: "Projets data et études de cas", description: "Découvrez des études de cas issues d’expériences professionnelles en Business Intelligence, Data Quality, automatisation et traitement de données." },
    legal: { title: "Mentions légales", description: "Informations légales relatives au site professionnel de Christopher VALLOT, Consultant Data & BI Freelance." },
    privacy: { title: "Politique de confidentialité", description: "Politique de confidentialité et informations sur les données traitées par le formulaire de contact." },
    og: { role: "Consultant Data & BI Freelance", firstLine: "Transformer le bruit", secondLine: "en signal.", automation: "Automatisation" },
    skip: "Aller au contenu",
  },
  en: {
    siteName: "Christopher VALLOT | Freelance Data & BI Consultant",
    siteDescription: "Freelance Data & BI Consultant in Tours, France. Data integration and quality, workflow automation, Python, SQL and Power BI.",
    keywords: ["Data & BI Consultant", "Business Intelligence Consultant", "Power BI Consultant", "Data Quality Consultant", "Freelance Data Consultant", "Freelance BI Consultant", "Data Quality", "process automation", "Python", "SQL", "Power BI", "Tours", "Centre-Val de Loire"],
    home: { title: "Christopher VALLOT | Freelance Data & BI Consultant", description: "Freelance Data & BI Consultant in Tours, France. Data integration and quality, workflow automation, Python, SQL and Power BI." },
    about: { title: "About and Data & BI experience", description: "Christopher VALLOT’s background as a freelance Data & BI consultant: data integration and quality, process automation and Power BI reporting." },
    contact: { title: "Contact", description: "Discuss your data integration, data quality, process automation or Power BI reporting project with Christopher VALLOT, freelance Data & BI consultant." },
    projects: { title: "Data & BI projects and case studies", description: "Explore case studies from professional experience in Business Intelligence, Data Quality, automation and data processing." },
    legal: { title: "Legal notice", description: "Legal information about the professional website of Christopher VALLOT, freelance Data & BI Consultant." },
    privacy: { title: "Privacy policy", description: "Privacy policy and information about the data processed through the contact form." },
    og: { role: "Freelance Data & BI Consultant", firstLine: "Turn noise", secondLine: "into signal.", automation: "Automation" },
    skip: "Skip to content",
  },
} as const;
