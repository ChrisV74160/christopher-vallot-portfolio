import { isIP } from "node:net";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_ENTRIES = 10_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

// Counters are local to one Node process, disappear on restart/cold start,
// and are not shared between serverless instances. Use a distributed limiter
// or a platform WAF when strict production limits are needed.
const rateLimitEntries = new Map<string, RateLimitEntry>();
let rateLimitChecks = 0;

export class PayloadTooLargeError extends Error {}

export function getClientKey(request: Request) {
  // NETLIFY identifies builds; SITE_ID is also available to hosted functions.
  const isNetlify =
    process.env.NETLIFY?.trim().toLowerCase() === "true" ||
    Boolean(process.env.SITE_ID?.trim());

  if (isNetlify) {
    const connectionIp = request.headers.get("x-nf-client-connection-ip")?.trim();
    // Netlify supplies this connection address. Never replace a missing or
    // invalid value with a forwarded header that the caller can control.
    return connectionIp && isIP(connectionIp)
      ? `netlify:${connectionIp}`
      : "netlify:unknown";
  }

  // These headers are trustworthy only when the deployment proxy overwrites them.
  const forwardedFor = request.headers.get("x-forwarded-for");
  const candidate =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";

  return candidate.slice(0, 128);
}

export function checkRateLimit(key: string, now: number) {
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

/** Bound streamed bytes, not decoded characters; reject malformed UTF-8. */
export async function readBodyWithinLimit(request: Request) {
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
