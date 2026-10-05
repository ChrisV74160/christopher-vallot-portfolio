/** Shared URL rules. Locale is explicit in URLs, never inferred during rendering. */
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";
export const localeCookieName = "portfolio-locale";
export const localeTags = { fr: "fr_FR", en: "en_GB" } as const;

export function isLocale(value: unknown): value is Locale {
  return value === "fr" || value === "en";
}

/** Only the first segment identifies the locale; all remaining URL bytes stay intact. */
function localePrefixLength(href: string): number {
  const prefix = href.match(/^\/([^/?#]+)/);
  if (!prefix) return 0;
  try {
    return isLocale(decodeURIComponent(prefix[1])) ? prefix[0].length : 0;
  } catch {
    return 0;
  }
}

export function stripLocale(pathname: string): string {
  return pathname.slice(localePrefixLength(pathname)) || "/";
}

/** Leave external links, fragments, API endpoints and downloadable assets intact. */
export function localizedHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const pathname = href.split(/[?#]/, 1)[0];
  const alreadyLocalized = localePrefixLength(pathname) > 0;
  if (/^\/(api|_next)(?:\/|$)/.test(pathname) || (!alreadyLocalized && /\.[a-z0-9]+$/i.test(pathname))) return href;
  const path = stripLocale(href);
  return `/${locale}${path === "/" ? "" : path.startsWith("/?") || path.startsWith("/#") ? path.slice(1) : path}`;
}

export function languageAlternates(path: string) {
  return {
    fr: localizedHref(path, "fr"),
    en: localizedHref(path, "en"),
    "x-default": localizedHref(path, defaultLocale),
  };
}
