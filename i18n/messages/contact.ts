import type { Locale } from "@/i18n/config";
import type { ContactNeed } from "@/lib/contact-contract";

interface ContactMessages {
  formLabel: string;
  fields: Record<"name" | "company" | "email" | "need" | "message" | "website", string>;
  placeholders: Record<"name" | "company" | "email" | "message", string>;
  selectNeed: string;
  needLabels: Record<ContactNeed, string>;
  submit: string;
  pending: string;
  note: string;
  privacy: string;
  configurationRequired: string;
  unexpectedResponse: string;
  timeout: string;
  networkError: string;
  validation: {
    nameRequired: string;
    nameMin: string;
    nameMax: string;
    companyType: string;
    companyMax: string;
    emailRequired: string;
    emailMax: string;
    emailInvalid: string;
    needInvalid: string;
    messageRequired: string;
    messageMin: string;
    messageMax: string;
    spamInvalid: string;
    timeInvalid: string;
    localeInvalid: string;
  };
  api: {
    unsupportedMediaType: string;
    rateLimited: string;
    payloadTooLarge: string;
    unreadableBody: string;
    invalidJson: string;
    validationError: string;
    spamDetected: string;
    formTimeInvalid: string;
    emailNotConfigured: string;
    serviceUnavailable: string;
    deliveryFailed: string;
    success: string;
  };
}

/** Text shared by browser validation and the server. No validation library is sent to the client. */
export const contactMessages: Record<Locale, ContactMessages> = {
  fr: {
    formLabel: "Formulaire de contact",
    fields: { name: "Nom *", company: "Société (facultatif)", email: "E-mail *", need: "Type de besoin *", message: "Message *", website: "Votre site web" },
    placeholders: { name: "Votre nom", company: "Votre entreprise", email: "vous@entreprise.fr", message: "Décrivez votre contexte, vos données et le résultat attendu." },
    selectNeed: "Sélectionnez un besoin",
    needLabels: { "power-bi-reporting": "Power BI / Reporting", "data-quality": "Data Quality", automatisation: "Automatisation", "integration-consolidation": "Intégration / consolidation", "analyse-donnees": "Analyse de données", autre: "Autre" },
    submit: "Envoyer ma demande",
    pending: "Envoi en cours…",
    note: "Les champs marqués d’un astérisque sont obligatoires. N’indiquez pas de données sensibles dans votre message.",
    privacy: "Utilisation de vos données",
    configurationRequired: "Configuration requise — ",
    unexpectedResponse: "Réponse inattendue du service de contact.",
    timeout: "L’envoi prend trop de temps. Réessayez ou utilisez l’adresse e-mail indiquée à côté du formulaire.",
    networkError: "Le service de contact ne répond pas pour le moment. Réessayez dans quelques instants ou utilisez l’adresse e-mail indiquée à côté du formulaire.",
    validation: {
      nameRequired: "Le nom est requis.", nameMin: "Le nom doit contenir au moins 2 caractères.", nameMax: "Le nom ne peut pas dépasser 80 caractères.",
      companyType: "Le nom de l’entreprise doit être du texte.", companyMax: "Le nom de l’entreprise ne peut pas dépasser 120 caractères.",
      emailRequired: "L’adresse e-mail est requise.", emailMax: "L’adresse e-mail est trop longue.", emailInvalid: "Saisissez une adresse e-mail valide.",
      needInvalid: "Sélectionnez un type de besoin valide.",
      messageRequired: "Le message est requis.", messageMin: "Le message doit contenir au moins 20 caractères.", messageMax: "Le message ne peut pas dépasser 3 000 caractères.",
      spamInvalid: "Le champ antispam est invalide.", timeInvalid: "L’horodatage du formulaire est invalide.", localeInvalid: "La langue du formulaire est invalide.",
    },
    api: {
      unsupportedMediaType: "Envoyez le formulaire au format JSON.",
      rateLimited: "Trop de tentatives ont été effectuées. Réessayez dans quelques minutes.",
      payloadTooLarge: "Le contenu du formulaire est trop volumineux.", unreadableBody: "Le contenu du formulaire est illisible.", invalidJson: "La requête doit contenir un objet JSON valide.",
      validationError: "Certains champs sont invalides. Vérifiez le formulaire.", spamDetected: "Votre demande n’a pas pu être envoyée.",
      formTimeInvalid: "Le formulaire a été envoyé trop rapidement ou a expiré. Rechargez la page puis réessayez.",
      emailNotConfigured: "Message validé en mode développement, mais aucun e-mail n’a été envoyé. Configurez RESEND_API_KEY et CONTACT_EMAIL pour activer l’envoi.",
      serviceUnavailable: "Le service de contact est temporairement indisponible. Réessayez plus tard.",
      deliveryFailed: "Le message n’a pas pu être envoyé. Réessayez dans quelques instants.",
      success: "Merci, votre message a bien été envoyé.",
    },
  },
  en: {
    formLabel: "Contact form",
    fields: { name: "Name *", company: "Company (optional)", email: "Email *", need: "How can I help? *", message: "Message *", website: "Your website" },
    placeholders: { name: "Your name", company: "Your company", email: "you@company.com", message: "Tell me about your context, your data and what you would like to achieve." },
    selectNeed: "Select a requirement",
    needLabels: { "power-bi-reporting": "Power BI / Reporting", "data-quality": "Data Quality", automatisation: "Automation", "integration-consolidation": "Integration / consolidation", "analyse-donnees": "Data analysis", autre: "Other" },
    submit: "Send my enquiry",
    pending: "Sending…",
    note: "Fields marked with an asterisk are required. Please do not include sensitive data in your message.",
    privacy: "How your data is used",
    configurationRequired: "Configuration required — ",
    unexpectedResponse: "Unexpected response from the contact service.",
    timeout: "Sending is taking too long. Please try again or use the email address shown next to the form.",
    networkError: "The contact service is not responding at the moment. Please try again shortly or use the email address shown next to the form.",
    validation: {
      nameRequired: "Please enter your name.", nameMin: "Your name must contain at least 2 characters.", nameMax: "Your name must not exceed 80 characters.",
      companyType: "The company name must be text.", companyMax: "The company name must not exceed 120 characters.",
      emailRequired: "Please enter your email address.", emailMax: "The email address is too long.", emailInvalid: "Please enter a valid email address.",
      needInvalid: "Please select a valid requirement.",
      messageRequired: "Please enter a message.", messageMin: "Your message must contain at least 20 characters.", messageMax: "Your message must not exceed 3,000 characters.",
      spamInvalid: "The anti-spam field is invalid.", timeInvalid: "The form timestamp is invalid.", localeInvalid: "The form language is invalid.",
    },
    api: {
      unsupportedMediaType: "Please submit the form as JSON.",
      rateLimited: "Too many attempts have been made. Please try again in a few minutes.",
      payloadTooLarge: "The form content is too large.", unreadableBody: "The form content could not be read.", invalidJson: "The request must contain a valid JSON object.",
      validationError: "Some fields are invalid. Please check the form.", spamDetected: "Your enquiry could not be sent.",
      formTimeInvalid: "The form was submitted too quickly or has expired. Please reload the page and try again.",
      emailNotConfigured: "The message was validated in development mode, but no email was sent. Configure RESEND_API_KEY and CONTACT_EMAIL to enable delivery.",
      serviceUnavailable: "The contact service is temporarily unavailable. Please try again later.",
      deliveryFailed: "Your message could not be sent. Please try again shortly.",
      success: "Thank you, your message has been sent.",
    },
  },
};
