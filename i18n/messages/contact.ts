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
    fields: { name: "Nom *", company: "Entreprise (facultatif)", email: "E-mail *", need: "Type de besoin *", message: "Message *", website: "Votre site web" },
    placeholders: { name: "Votre nom", company: "Votre entreprise", email: "vous@entreprise.fr", message: "Présentez votre besoin, vos données et les difficultés rencontrées." },
    selectNeed: "Sélectionnez un besoin",
    needLabels: { "power-bi-reporting": "Power BI / Reporting", "data-quality": "Qualité des données", automatisation: "Automatisation", "integration-consolidation": "Intégration / consolidation", "analyse-donnees": "Analyse de données", autre: "Autre" },
    submit: "Envoyer ma demande",
    pending: "Envoi en cours…",
    note: "Les champs marqués d’un astérisque sont obligatoires. N’indiquez pas de données sensibles dans votre message.",
    privacy: "Utilisation de vos données",
    configurationRequired: "Information — ",
    unexpectedResponse: "L’envoi n’a pas pu être confirmé. Vous pouvez me contacter par l’adresse e-mail indiquée sur cette page.",
    timeout: "L’envoi n’a pas pu être confirmé dans le délai prévu. Vous pouvez me contacter par l’adresse e-mail indiquée sur cette page.",
    networkError: "Une erreur de connexion empêche de confirmer l’envoi. Vous pouvez me contacter par l’adresse e-mail indiquée sur cette page.",
    validation: {
      nameRequired: "Saisissez votre nom.", nameMin: "Le nom doit contenir au moins 2 caractères.", nameMax: "Le nom ne peut pas dépasser 80 caractères.",
      companyType: "Saisissez le nom de votre entreprise.", companyMax: "Le nom de l’entreprise ne peut pas dépasser 120 caractères.",
      emailRequired: "Saisissez votre adresse e-mail.", emailMax: "L’adresse e-mail est trop longue.", emailInvalid: "Saisissez une adresse e-mail valide.",
      needInvalid: "Sélectionnez un type de besoin.",
      messageRequired: "Saisissez votre message.", messageMin: "Le message doit contenir au moins 20 caractères.", messageMax: "Le message ne peut pas dépasser 3 000 caractères.",
      spamInvalid: "Le formulaire ne peut pas être validé. Rechargez la page puis réessayez.", timeInvalid: "Le formulaire ne peut pas être validé. Rechargez la page puis réessayez.", localeInvalid: "Le formulaire ne peut pas être validé. Rechargez la page puis réessayez.",
    },
    api: {
      unsupportedMediaType: "Votre message n’a pas été envoyé. Réessayez ou utilisez l’adresse e-mail indiquée sur cette page.",
      rateLimited: "Trop de tentatives ont été effectuées. Réessayez dans quelques minutes.",
      payloadTooLarge: "Le contenu du formulaire est trop volumineux.", unreadableBody: "Votre message n’a pas été envoyé. Réessayez ou utilisez l’adresse e-mail indiquée sur cette page.", invalidJson: "Votre message n’a pas été envoyé. Réessayez ou utilisez l’adresse e-mail indiquée sur cette page.",
      validationError: "Certains champs sont invalides. Vérifiez le formulaire.", spamDetected: "Votre demande n’a pas pu être envoyée.",
      formTimeInvalid: "Le formulaire a été envoyé trop rapidement ou a expiré. Rechargez la page puis réessayez.",
      emailNotConfigured: "Le formulaire est temporairement indisponible. Votre message n’a pas été envoyé. Vous pouvez écrire à christopher.vallot@outlook.com.",
      serviceUnavailable: "Le service de contact est temporairement indisponible. Réessayez plus tard.",
      deliveryFailed: "Le message n’a pas pu être envoyé. Réessayez dans quelques instants.",
      success: "Merci, votre message a bien été envoyé.",
    },
  },
  en: {
    formLabel: "Contact form",
    fields: { name: "Name *", company: "Company (optional)", email: "Email *", need: "Type of enquiry *", message: "Message *", website: "Your website" },
    placeholders: { name: "Your name", company: "Your company", email: "you@company.com", message: "Describe your needs, your data and the challenges you face." },
    selectNeed: "Select an enquiry type",
    needLabels: { "power-bi-reporting": "Power BI / Reporting", "data-quality": "Data Quality", automatisation: "Automation", "integration-consolidation": "Integration / consolidation", "analyse-donnees": "Data analysis", autre: "Other" },
    submit: "Send my enquiry",
    pending: "Sending…",
    note: "Fields marked with an asterisk are required. Please do not include sensitive data in your message.",
    privacy: "How your data is used",
    configurationRequired: "Notice — ",
    unexpectedResponse: "Your submission could not be confirmed. You can contact me using the email address shown on this page.",
    timeout: "Your submission could not be confirmed within the expected time. You can contact me using the email address shown on this page.",
    networkError: "A connection error prevented confirmation of your submission. You can contact me using the email address shown on this page.",
    validation: {
      nameRequired: "Please enter your name.", nameMin: "Your name must contain at least 2 characters.", nameMax: "Your name must not exceed 80 characters.",
      companyType: "Please enter your company name.", companyMax: "The company name must not exceed 120 characters.",
      emailRequired: "Please enter your email address.", emailMax: "The email address is too long.", emailInvalid: "Please enter a valid email address.",
      needInvalid: "Please select an enquiry type.",
      messageRequired: "Please enter a message.", messageMin: "Your message must contain at least 20 characters.", messageMax: "Your message must not exceed 3,000 characters.",
      spamInvalid: "The form could not be validated. Please reload the page and try again.", timeInvalid: "The form could not be validated. Please reload the page and try again.", localeInvalid: "The form could not be validated. Please reload the page and try again.",
    },
    api: {
      unsupportedMediaType: "Your message has not been sent. Please try again or use the email address shown on this page.",
      rateLimited: "Too many attempts have been made. Please try again in a few minutes.",
      payloadTooLarge: "The form content is too large.", unreadableBody: "Your message has not been sent. Please try again or use the email address shown on this page.", invalidJson: "Your message has not been sent. Please try again or use the email address shown on this page.",
      validationError: "Some fields are invalid. Please check the form.", spamDetected: "Your enquiry could not be sent.",
      formTimeInvalid: "The form was submitted too quickly or has expired. Please reload the page and try again.",
      emailNotConfigured: "The form is temporarily unavailable. Your message has not been sent. You can email christopher.vallot@outlook.com.",
      serviceUnavailable: "The contact service is temporarily unavailable. Please try again later.",
      deliveryFailed: "Your message could not be sent. Please try again shortly.",
      success: "Thank you, your message has been sent.",
    },
  },
};
