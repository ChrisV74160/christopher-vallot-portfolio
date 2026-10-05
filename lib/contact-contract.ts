import type { Locale } from "@/i18n/config";
import { contactMessages } from "@/i18n/messages/contact";

/**
 * Shared, dependency-free contract between the contact form and its API route.
 * Keep input schema validation in `contact-schema.ts` so Zod never enters the
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

export const CONTACT_NEED_LABELS = contactMessages.fr.needLabels;

export interface ContactFormInput {
  name: string;
  company?: string;
  email: string;
  need: ContactNeed;
  message: string;
  website?: string;
  formStartedAt: number;
  locale?: Locale;
}

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormInput, string[]>
>;

const CONTACT_API_ERROR_CODES = [
  "UNSUPPORTED_MEDIA_TYPE",
  "PAYLOAD_TOO_LARGE",
  "RATE_LIMITED",
  "INVALID_JSON",
  "VALIDATION_ERROR",
  "SPAM_DETECTED",
  "FORM_TIME_INVALID",
  "SERVICE_UNAVAILABLE",
  "DELIVERY_FAILED",
] as const;

export type ContactApiErrorCode = (typeof CONTACT_API_ERROR_CODES)[number];

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

const CONTACT_FIELDS: readonly (keyof ContactFormInput)[] = [
  "name", "company", "email", "need", "message", "website", "formStartedAt", "locale",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Validate untrusted response JSON before rendering errors or claiming delivery. */
export function isContactApiResponse(value: unknown): value is ContactApiResponse {
  if (!isRecord(value) || typeof value.message !== "string") return false;

  if (value.ok === true) {
    return value.sent === true || (
      value.sent === false && value.mode === "development" && value.code === "EMAIL_NOT_CONFIGURED"
    );
  }

  if (value.ok !== false || !CONTACT_API_ERROR_CODES.some((code) => code === value.code)) {
    return false;
  }

  if (value.fieldErrors === undefined) return true;
  if (!isRecord(value.fieldErrors)) return false;

  return Object.entries(value.fieldErrors).every(([field, errors]) =>
    CONTACT_FIELDS.some((name) => name === field) &&
    Array.isArray(errors) && errors.every((error) => typeof error === "string"),
  );
}
