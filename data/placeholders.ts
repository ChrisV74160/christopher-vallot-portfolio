import type { SitePlaceholders } from "@/types/content";

/**
 * Valeurs volontairement non inventées. Elles ne doivent pas être publiées
 * telles quelles : compléter chaque entrée avant la mise en ligne concernée.
 */
export const PLACEHOLDERS = {
  legal: {
    legalStatus: "[À COMPLÉTER : statut juridique de l’activité]",
    legalName: "[À COMPLÉTER : nom légal ou raison sociale]",
    registrationNumber:
      "[À COMPLÉTER : numéro SIREN ou SIRET, si applicable]",
    vatNumber:
      "[À COMPLÉTER : numéro de TVA intracommunautaire, si applicable]",
    postalAddress:
      "[À COMPLÉTER : adresse postale à afficher dans les mentions légales]",
    phoneNumber: "[À COMPLÉTER : numéro de téléphone professionnel]",
    publicationDirector:
      "[À COMPLÉTER : nom du directeur de la publication]",
    hostName: "[À COMPLÉTER : nom de l’hébergeur]",
    hostAddress: "[À COMPLÉTER : adresse de l’hébergeur]",
    hostContact: "[À COMPLÉTER : coordonnées de l’hébergeur]",
  },
  contact: {
    formRecipient:
      "[À COMPLÉTER : valeur CONTACT_EMAIL utilisée par le formulaire]",
    resendSender:
      "[À COMPLÉTER : adresse d’expédition vérifiée dans Resend]",
  },
  privacy: {
    formDataRetentionPeriod:
      "[À COMPLÉTER : durée de conservation des demandes de contact]",
  },
} as const satisfies SitePlaceholders;
