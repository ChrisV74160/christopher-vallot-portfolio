import { Resend } from "resend";
import type { ZodError } from "zod";

import {
  CONTACT_NEED_LABELS,
  type ContactApiResponse,
  type ContactFieldErrors,
} from "@/lib/contact-contract";
import { contactFormSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FORM_DURATION_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_ENTRIES = 10_000;
const DEFAULT_FROM_EMAIL =
  "Portfolio Christopher Vallot <onboarding@resend.dev>";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

// This limiter is deliberately lightweight: counters are local to one Node process,
// disappear on restart/cold start, and are not shared between serverless instances.
// Use a durable distributed limiter or a platform WAF for strict production limits.
const rateLimitEntries = new Map<string, RateLimitEntry>();
let rateLimitChecks = 0;

class PayloadTooLargeError extends Error {}

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

function getClientKey(request: Request) {
  // These headers are trustworthy only when the deployment proxy overwrites them.
  const forwardedFor = request.headers.get("x-forwarded-for");
  const candidate =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";

  return candidate.slice(0, 128);
}

function checkRateLimit(key: string, now: number) {
  rateLimitChecks += 1;

  if (
    rateLimitChecks % 100 === 0 ||
    rateLimitEntries.size >= MAX_RATE_LIMIT_ENTRIES
  ) {
    for (const [entryKey, entry] of rateLimitEntries) {
      if (entry.resetAt <= now) {
        rateLimitEntries.delete(entryKey);
      }
    }
  }

  const existing = rateLimitEntries.get(key);

  if (!existing || existing.resetAt <= now) {
    if (rateLimitEntries.size >= MAX_RATE_LIMIT_ENTRIES) {
      const oldestKey = rateLimitEntries.keys().next().value;
      if (typeof oldestKey === "string") {
        rateLimitEntries.delete(oldestKey);
      }
    }

    rateLimitEntries.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return { allowed: true as const, retryAfterSeconds: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false as const,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1_000),
      ),
    };
  }

  existing.count += 1;
  return { allowed: true as const, retryAfterSeconds: 0 };
}

async function readBodyWithinLimit(request: Request) {
  const declaredLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new PayloadTooLargeError();
  }

  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let totalBytes = 0;
  let body = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        throw new PayloadTooLargeError();
      }

      body += decoder.decode(value, { stream: true });
    }

    body += decoder.decode();
    return body;
  } finally {
    reader.releaseLock();
  }
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

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export async function POST(request: Request) {
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
        message: "Envoyez le formulaire au format JSON.",
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
        message:
          "Trop de tentatives ont été effectuées. Réessayez dans quelques minutes.",
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
          message: "Le contenu du formulaire est trop volumineux.",
        },
        413,
      );
    }

    return jsonResponse(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "Le contenu du formulaire est illisible.",
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
        message: "La requête doit contenir un objet JSON valide.",
      },
      400,
    );
  }

  const parsedData = contactFormSchema.safeParse(submittedData);

  if (!parsedData.success) {
    return jsonResponse(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Certains champs sont invalides. Vérifiez le formulaire.",
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
        message: "Votre demande n’a pas pu être envoyée.",
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
        message:
          "Le formulaire a été envoyé trop rapidement ou a expiré. Rechargez la page puis réessayez.",
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
          message:
            "Message validé en mode développement, mais aucun e-mail n’a été envoyé. Configurez RESEND_API_KEY et CONTACT_EMAIL pour activer l’envoi.",
        },
        200,
      );
    }

    return jsonResponse(
      {
        ok: false,
        code: "SERVICE_UNAVAILABLE",
        message:
          "Le service de contact est temporairement indisponible. Réessayez plus tard.",
      },
      503,
    );
  }

  const needLabel = CONTACT_NEED_LABELS[data.need];
  const company = data.company ?? "Non renseignée";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;

  try {
    // Instantiated only after all required server configuration is validated.
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail.data,
      replyTo: data.email,
      subject: `Nouvelle demande portfolio — ${needLabel}`,
      text: [
        `Nom : ${data.name}`,
        `Entreprise : ${company}`,
        `E-mail : ${data.email}`,
        `Poste ou besoin : ${needLabel}`,
        "",
        "Message :",
        data.message,
      ].join("\n"),
      html: `
        <h1>Nouvelle demande depuis le portfolio</h1>
        <p><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Entreprise :</strong> ${escapeHtml(company)}</p>
        <p><strong>E-mail :</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Poste ou besoin :</strong> ${escapeHtml(needLabel)}</p>
        <h2>Message</h2>
        <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend a refusé l’envoi :", error.name);
      return jsonResponse(
        {
          ok: false,
          code: "DELIVERY_FAILED",
          message:
            "Le message n’a pas pu être envoyé. Réessayez dans quelques instants.",
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
        message:
          "Le message n’a pas pu être envoyé. Réessayez dans quelques instants.",
      },
      502,
    );
  }

  return jsonResponse(
    {
      ok: true,
      sent: true,
      message: "Merci, votre message a bien été envoyé. Je vous répondrai rapidement.",
    },
    200,
  );
}
