const developmentUrl = "http://localhost:3000";
const indexableEnvironment = "production";

const transientHostnames = [
  "trycloudflare.com",
  "vercel.app",
  "pages.dev",
] as const;

export const siteName =
  "Christopher Vallot | Consultant Data & BI Freelance";
export const siteDescription =
  "Consultant Data & BI Freelance à Tours. Intégration et fiabilisation des données, automatisation de traitements, Data Quality, Python, SQL et Power BI.";

function isTransientHostname(hostname: string) {
  const normalizedHostname = hostname.toLowerCase();

  return transientHostnames.some(
    (transientHostname) =>
      normalizedHostname === transientHostname ||
      normalizedHostname.endsWith(`.${transientHostname}`),
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

  const isLocalUrl = ["localhost", "127.0.0.1", "::1"].includes(
    parsedUrl.hostname,
  );

  if (isTransientHostname(parsedUrl.hostname)) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL doit contenir le domaine final, jamais une URL temporaire trycloudflare, Vercel Preview ou Cloudflare Pages.",
    );
  }

  if (
    process.env.NODE_ENV === "production" &&
    (isLocalUrl || parsedUrl.protocol !== "https:")
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL doit contenir le domaine public final en HTTPS avant un build de production.",
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

  const vercelEnvironment = process.env.VERCEL_ENV?.trim().toLowerCase();

  if (vercelEnvironment && vercelEnvironment !== "production") {
    return false;
  }

  return new URL(getSiteUrl()).protocol === "https:";
}
