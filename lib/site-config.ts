const developmentUrl = "http://localhost:3000";
const indexableEnvironment = "production";

const transientHostnames = [
  "trycloudflare.com",
  "vercel.app",
  "pages.dev",
] as const;

export const siteName =
  "Christopher VALLOT | Consultant Data & BI freelance";
export const siteDescription =
  "Consultant Data & BI Freelance à Tours. Intégration et fiabilisation des données, automatisation de traitements, Data Quality, Python, SQL et Power BI.";

function isTransientHostname(hostname: string) {
  const normalizedHostname = hostname.toLowerCase();
  const isNetlifyPreview =
    normalizedHostname.endsWith(".netlify.app") &&
    normalizedHostname.split(".", 1)[0].includes("--");

  return (
    isNetlifyPreview ||
    transientHostnames.some(
      (transientHostname) =>
        normalizedHostname === transientHostname ||
        normalizedHostname.endsWith(`.${transientHostname}`),
    )
  );
}

function isLocalOrPrivateHostname(hostname: string) {
  const normalizedHostname = hostname
    .trim()
    .toLowerCase()
    .replace(/^\[|\]$/g, "");

  if (
    normalizedHostname === "localhost" ||
    normalizedHostname.endsWith(".localhost") ||
    normalizedHostname === "::1" ||
    normalizedHostname.includes(":")
  ) {
    return true;
  }

  const octets = normalizedHostname.split(".").map(Number);

  if (
    octets.length !== 4 ||
    octets.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255)
  ) {
    return false;
  }

  const [first, second] = octets;

  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168) ||
    (first === 100 && second >= 64 && second <= 127)
  );
}

/**
 * Returns the absolute public origin used by canonical URLs and discovery files.
 * Production builds fail fast when the public URL is missing or still local so
 * search engines never receive localhost links after deployment.
 */
export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || developmentUrl;

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(configuredUrl);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL doit être une URL absolue valide (par exemple https://www.exemple.fr).",
    );
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL doit utiliser le protocole HTTP ou HTTPS.");
  }

  const isLocalUrl = isLocalOrPrivateHostname(parsedUrl.hostname);

  if (isTransientHostname(parsedUrl.hostname)) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL doit contenir l’URL publique du site, jamais une URL de prévisualisation temporaire.",
    );
  }

  if (
    process.env.NODE_ENV === "production" &&
    (isLocalUrl || parsedUrl.protocol !== "https:")
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL doit contenir une URL publique en HTTPS avant un build de production.",
    );
  }

  return parsedUrl.origin;
}

/**
 * Search indexing is deliberately opt-in. `NODE_ENV=production` is also used
 * by preview builds, so SITE_ENV must explicitly identify the public release.
 */
export function isIndexableDeployment() {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.SITE_ENV?.trim().toLowerCase() !== indexableEnvironment
  ) {
    return false;
  }

  const isNetlify = process.env.NETLIFY?.trim().toLowerCase() === "true";
  const netlifyContext = process.env.CONTEXT?.trim().toLowerCase();

  if (isNetlify && netlifyContext !== "production") {
    return false;
  }

  return new URL(getSiteUrl()).protocol === "https:";
}
