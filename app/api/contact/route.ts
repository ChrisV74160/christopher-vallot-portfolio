import { Resend } from "resend";
import type { ZodError } from "zod";

import type { Locale } from "@/i18n/config";
import { contactMessages } from "@/i18n/messages/contact";
import {
  type ContactApiResponse,
  type ContactFieldErrors,
} from "@/lib/contact-contract";
import { buildContactEmail } from "@/lib/contact-email";
import {
  checkRateLimit,
  getClientKey,
  PayloadTooLargeError,
  readBodyWithinLimit,
} from "@/lib/contact-request";
import { contactFormSchema, getContactFormSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

const MIN_FORM_DURATION_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;
const DEFAULT_FROM_EMAIL =
  "Portfolio Christopher Vallot <onboarding@resend.dev>";

function jsonResponse(
  body: ContactApiResponse,
  status: number,
  extraHeaders?: HeadersInit,
) {
  const headers = new Headers(extraHeaders);
  headers.set("Cache-Control", "no-store");
  headers.set("X-Content-Type-Options", "nosniff");

  return Response.json(body, { status, headers });
}

function getFieldErrors(error: ZodError): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string") {
      continue;
    }

    const fieldName = field as keyof ContactFieldErrors;
    const messages = fieldErrors[fieldName] ?? [];
    messages.push(issue.message);
    fieldErrors[fieldName] = messages;
  }

  return fieldErrors;
}

export async function POST(request: Request) {
  // The header localizes errors returned before the body is parsed (including
  // rate limits and oversized requests). A supported payload locale then wins.
  const preferredLanguage = request.headers.get("accept-language")?.split(",", 1)[0]?.trim().toLowerCase();
  let locale: Locale = preferredLanguage?.startsWith("en") ? "en" : "fr";
  let messages = contactMessages[locale].api;
  const mediaType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();

  if (mediaType !== "application/json") {
    return jsonResponse(
      {
        ok: false,
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: messages.unsupportedMediaType,
      },
      415,
    );
  }

  const now = Date.now();
  const rateLimit = checkRateLimit(getClientKey(request), now);

  if (!rateLimit.allowed) {
    return jsonResponse(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: messages.rateLimited,
      },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  let rawBody: string;

  try {
    rawBody = await readBodyWithinLimit(request);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return jsonResponse(
        {
          ok: false,
          code: "PAYLOAD_TOO_LARGE",
          message: messages.payloadTooLarge,
        },
        413,
      );
    }

    return jsonResponse(
      {
        ok: false,
        code: "INVALID_JSON",
        message: messages.unreadableBody,
      },
      400,
    );
  }

  let submittedData: unknown;

  try {
    submittedData = JSON.parse(rawBody);
  } catch {
    return jsonResponse(
      {
        ok: false,
        code: "INVALID_JSON",
        message: messages.invalidJson,
      },
      400,
    );
  }

  if (typeof submittedData === "object" && submittedData !== null && "locale" in submittedData && (submittedData.locale === "fr" || submittedData.locale === "en")) {
    locale = submittedData.locale;
    messages = contactMessages[locale].api;
  }

  const parsedData = getContactFormSchema(locale).safeParse(submittedData);

  if (!parsedData.success) {
    return jsonResponse(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: messages.validationError,
        fieldErrors: getFieldErrors(parsedData.error),
      },
      400,
    );
  }

  const data = parsedData.data;

  if (data.website.length > 0) {
    return jsonResponse(
      {
        ok: false,
        code: "SPAM_DETECTED",
        message: messages.spamDetected,
      },
      400,
    );
  }

  const elapsedTime = now - data.formStartedAt;
  if (
    elapsedTime < MIN_FORM_DURATION_MS ||
    elapsedTime > MAX_FORM_AGE_MS
  ) {
    return jsonResponse(
      {
        ok: false,
        code: "FORM_TIME_INVALID",
        message: messages.formTimeInvalid,
      },
      400,
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const configuredContactEmail = process.env.CONTACT_EMAIL?.trim();
  const contactEmail = contactFormSchema.shape.email.safeParse(
    configuredContactEmail,
  );

  if (!resendApiKey || !contactEmail.success) {
    if (process.env.NODE_ENV !== "production") {
      return jsonResponse(
        {
          ok: true,
          sent: false,
          mode: "development",
          code: "EMAIL_NOT_CONFIGURED",
          message: messages.emailNotConfigured,
        },
        200,
      );
    }

    return jsonResponse(
      {
        ok: false,
        code: "SERVICE_UNAVAILABLE",
        message: messages.serviceUnavailable,
      },
      503,
    );
  }

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;

  try {
    // Instantiated only after all required server configuration is validated.
    const resend = new Resend(resendApiKey);
    const { data: delivery, error } = await resend.emails.send(
      buildContactEmail(data, { from: fromEmail, to: contactEmail.data }),
    );

    if (error || typeof delivery?.id !== "string" || delivery.id.trim().length === 0) {
      console.error("[contact] Resend a refusé l’envoi :", error?.name ?? "missing_email_id");
      return jsonResponse(
        {
          ok: false,
          code: "DELIVERY_FAILED",
          message: messages.deliveryFailed,
        },
        502,
      );
    }
  } catch (error) {
    console.error(
      "[contact] Échec de la requête Resend :",
      error instanceof Error ? error.message : "erreur inconnue",
    );

    return jsonResponse(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message: messages.deliveryFailed,
      },
      502,
    );
  }

  return jsonResponse(
    {
      ok: true,
      sent: true,
      message: messages.success,
    },
    200,
  );
}
