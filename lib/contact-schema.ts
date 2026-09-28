import { z } from "zod";

import type { Locale } from "@/i18n/config";
import { contactMessages } from "@/i18n/messages/contact";
import { CONTACT_NEEDS } from "@/lib/contact-contract";

function createContactFormSchema(locale: Locale) {
  const messages = contactMessages[locale].validation;

  return z.object({
    name: z.string({ error: messages.nameRequired }).trim()
      .min(2, messages.nameMin).max(80, messages.nameMax),
    company: z.string({ error: messages.companyType }).trim()
      .max(120, messages.companyMax).optional()
      .transform((company) => company || undefined),
    email: z.string({ error: messages.emailRequired }).trim()
      .max(254, messages.emailMax)
      .pipe(z.email({ error: messages.emailInvalid }))
      .transform((email) => email.toLowerCase()),
    need: z.enum(CONTACT_NEEDS, { error: messages.needInvalid }),
    message: z.string({ error: messages.messageRequired }).trim()
      .min(20, messages.messageMin).max(3_000, messages.messageMax),
    website: z.string({ error: messages.spamInvalid }).trim()
      .max(200, messages.spamInvalid).optional().default(""),
    formStartedAt: z.number({ error: messages.timeInvalid })
      .int(messages.timeInvalid).positive(messages.timeInvalid),
    locale: z.enum(["fr", "en"], { error: messages.localeInvalid }).optional().default("fr"),
  }).strict();
}

// Build once per locale; the French schema also validates the delivery address.
const schemas = { fr: createContactFormSchema("fr"), en: createContactFormSchema("en") };
export function getContactFormSchema(locale: Locale = "fr") {
  return schemas[locale];
}

export const contactFormSchema = schemas.fr;
