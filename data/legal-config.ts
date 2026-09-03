import { profile } from "@/data/profile";

const publisherName = "Christopher VALLOT";

type LegalConfig = {
  publisher: {
    name: string;
    email: string;
    publicationDirector: string;
    description: string;
  };
  business: {
    status: "prelaunch" | "active";
    notice: string;
    legalStatus?: string;
    siren?: string;
    siret?: string;
    registration?: string;
    vatNumber?: string;
    address?: string;
    phone?: string;
  };
  hosting: {
    provider: string;
    legalName: string;
    address: string;
    website: string;
    contactEmail: string;
    phone?: string;
  };
  privacy: {
    controllerName: string;
    contactEmail: string;
    resendRetentionNotice: string;
  };
};

/**
 * Single source of truth for legal and privacy pages.
 *
 * Optional business fields intentionally remain absent until the independent
 * activity is registered. They must only be filled with verified information.
 */
export const legalConfig: LegalConfig = {
  publisher: {
    name: publisherName,
    email: profile.contact.email,
    publicationDirector: publisherName,
    description:
      "Site professionnel présentant le parcours, les compétences et le projet d’activité indépendante de Christopher VALLOT en tant que Consultant Data & BI.",
  },
  business: {
    status: "prelaunch",
    notice:
      "Activité indépendante en cours de création. Les informations relatives à l’immatriculation seront ajoutées à l’issue de la création de l’entreprise.",
    address: "1 Mail Françoise Maral, 37200 Tours, France",
    phone: "06 42 52 28 76",
  },
  hosting: {
    provider: "Netlify",
    legalName: "Netlify, Inc.",
    address: "101 2nd Street, San Francisco, CA 94105, États-Unis",
    website: "https://www.netlify.com/",
    contactEmail: "support@netlify.com",
  },
  privacy: {
    controllerName: publisherName,
    contactEmail: profile.contact.email,
    resendRetentionNotice:
      "30 jours pour ses offres Free, Pro et Scale, et une durée configurable pour son offre Enterprise",
  },
};
