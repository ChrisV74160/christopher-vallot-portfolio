/**
 * Shared, dependency-free contract between the contact form and its API route.
 * Keep runtime validation in `contact-schema.ts` so Zod never enters the
 * browser bundle.
 */
export const CONTACT_NEEDS = [
  "power-bi-reporting",
  "data-quality",
  "automatisation",
  "integration-consolidation",
  "analyse-donnees",
  "autre",
] as const;

export type ContactNeed = (typeof CONTACT_NEEDS)[number];

export const CONTACT_NEED_LABELS: Record<ContactNeed, string> = {
  "power-bi-reporting": "Power BI / Reporting",
  "data-quality": "Data Quality",
  automatisation: "Automatisation",
  "integration-consolidation": "Intégration / consolidation",
  "analyse-donnees": "Analyse de données",
  autre: "Autre",
};

export const CONTACT_NEED_OPTIONS = CONTACT_NEEDS.map((value) => ({
  value,
  label: CONTACT_NEED_LABELS[value],
}));

export interface ContactFormInput {
  name: string;
  company?: string;
  email: string;
  need: ContactNeed;
  message: string;
  website?: string;
  formStartedAt: number;
}

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormInput, string[]>
>;

export type ContactApiErrorCode =
  | "UNSUPPORTED_MEDIA_TYPE"
  | "PAYLOAD_TOO_LARGE"
  | "RATE_LIMITED"
  | "INVALID_JSON"
  | "VALIDATION_ERROR"
  | "SPAM_DETECTED"
  | "FORM_TIME_INVALID"
  | "SERVICE_UNAVAILABLE"
  | "DELIVERY_FAILED";

export type ContactApiResponse =
  | {
      ok: true;
      sent: true;
      message: string;
    }
  | {
      ok: true;
      sent: false;
      mode: "development";
      code: "EMAIL_NOT_CONFIGURED";
      message: string;
    }
  | {
      ok: false;
      code: ContactApiErrorCode;
      message: string;
      fieldErrors?: ContactFieldErrors;
    };
