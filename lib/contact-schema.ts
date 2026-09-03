import { z } from "zod";

import { CONTACT_NEEDS } from "@/lib/contact-contract";

const emailSchema = z
  .string({ error: "L’adresse e-mail est requise." })
  .trim()
  .max(254, "L’adresse e-mail est trop longue.")
  .pipe(z.email({ error: "Saisissez une adresse e-mail valide." }))
  .transform((email) => email.toLowerCase());

export const contactFormSchema = z
  .object({
    name: z
      .string({ error: "Le nom est requis." })
      .trim()
      .min(2, "Le nom doit contenir au moins 2 caractères.")
      .max(80, "Le nom ne peut pas dépasser 80 caractères."),
    company: z
      .string({ error: "Le nom de l’entreprise doit être du texte." })
      .trim()
      .max(120, "Le nom de l’entreprise ne peut pas dépasser 120 caractères.")
      .optional()
      .transform((company) => company || undefined),
    email: emailSchema,
    need: z.enum(CONTACT_NEEDS, {
      error: "Sélectionnez un type de besoin valide.",
    }),
    message: z
      .string({ error: "Le message est requis." })
      .trim()
      .min(20, "Le message doit contenir au moins 20 caractères.")
      .max(3_000, "Le message ne peut pas dépasser 3 000 caractères."),
    website: z
      .string({ error: "Le champ antispam est invalide." })
      .trim()
      .max(200, "Le champ antispam est invalide.")
      .optional()
      .default(""),
    formStartedAt: z
      .number({ error: "L’horodatage du formulaire est invalide." })
      .int("L’horodatage du formulaire est invalide.")
      .positive("L’horodatage du formulaire est invalide."),
  })
  .strict();

// Alias kept concise for server-side consumers.
export const contactSchema = contactFormSchema;

export type ContactFormData = z.output<typeof contactFormSchema>;
