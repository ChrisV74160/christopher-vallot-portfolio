import { siteName, siteDescription } from "@/lib/site-config";
import socialImage from "@/data/social-image.json";

export const metaMessages = {
  fr: {
    siteName, siteDescription,
    keywords: ["Consultant Data & BI", "Consultant Business Intelligence", "Consultant Power BI", "Consultant Data Quality", "Consultant Data freelance", "Consultant BI freelance", "Data Quality", "automatisation des traitements", "Python", "SQL", "Power BI", "Tours"],
    home: { title: siteName, description: siteDescription },
    about: { title: "Parcours et expériences Data & BI", description: "Christopher VALLOT : expériences chez Dstny et via Apside à la Banque de France, chez Harmonie Mutuelle et à la CNAV. Intégration, qualité et reporting." },
    contact: { title: "Discutons de votre projet Data & BI", description: "Contactez Christopher VALLOT pour discuter d’un projet, d’une mission ou d’une opportunité en intégration, qualité des données, automatisation ou Power BI." },
    projects: { title: "Réalisations Data & BI et études de cas", description: "Six études de cas : migration Cloudera vers Teradata, collecte automatisée, qualité des données, Power BI, modèle de cotation et API Python." },
    legal: { title: "Mentions légales", description: "Informations légales relatives au site professionnel de Christopher VALLOT, consultant Data & BI freelance." },
    privacy: { title: "Politique de confidentialité", description: "Politique de confidentialité et informations sur les données traitées par le formulaire de contact." },
    og: socialImage.fr,
    skip: "Aller au contenu",
  },
  en: {
    siteName: "Christopher VALLOT | Freelance Data & BI Consultant",
    siteDescription: "Freelance Data & BI consultant based in Tours: data integration, quality, automation and Power BI reports using SQL and Python.",
    keywords: ["Data & BI Consultant", "Business Intelligence Consultant", "Power BI Consultant", "Data Quality Consultant", "Freelance Data Consultant", "Freelance BI Consultant", "Data Quality", "process automation", "Python", "SQL", "Power BI", "Tours"],
    home: { title: "Christopher VALLOT | Freelance Data & BI Consultant", description: "Freelance Data & BI consultant based in Tours: data integration, quality, automation and Power BI reports using SQL and Python." },
    about: { title: "Background and Data & BI experience", description: "Christopher VALLOT’s experience at Dstny and through Apside at Banque de France, Harmonie Mutuelle and CNAV. Data integration, quality and reporting." },
    contact: { title: "Discuss your Data & BI project", description: "Contact Christopher VALLOT about a project, assignment or opportunity in data integration, data quality, automation or Power BI." },
    projects: { title: "Data & BI work and case studies", description: "Six case studies: Cloudera to Teradata migration, automated collection, data quality, Power BI, a company rating model and a Python API." },
    legal: { title: "Legal notice", description: "Legal information about the professional website of Christopher VALLOT, freelance Data & BI Consultant." },
    privacy: { title: "Privacy policy", description: "Privacy policy and information about the data processed through the contact form." },
    og: socialImage.en,
    skip: "Skip to content",
  },
} as const;
