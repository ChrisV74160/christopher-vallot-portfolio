import type { MetadataRoute } from "next";

import { locales, localizedHref, languageAlternates } from "@/i18n/config";
import { pageRoutes } from "@/i18n/routes";
import { getSiteUrl, isIndexableDeployment } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment()) return [];

  const baseUrl = getSiteUrl();
  return pageRoutes.filter(({ indexable }) => indexable).flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([key, href]) => [key, baseUrl + href]),
    );
    return locales.map((locale) => ({
      url: baseUrl + localizedHref(path, locale),
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
