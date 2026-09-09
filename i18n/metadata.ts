import type { Metadata } from "next";
import { getSiteUrl, isIndexableDeployment } from "@/lib/site-config";
import { languageAlternates, localeTags, localizedHref, type Locale } from "./config";
import { metaMessages } from "./messages/meta";

type PageMetadataOptions = { title: string; description: string; path: string; noIndex?: boolean; type?: "website" | "article" };

/** One canonical and reciprocal alternates for every translated page. */
export function pageMetadata(locale: Locale, { title, description, path, noIndex, type = "website" }: PageMetadataOptions): Metadata {
  const url = localizedHref(path, locale);
  const image = localizedHref("/opengraph-image", locale);
  const index = isIndexableDeployment() && !noIndex;
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { absolute: title.includes("Christopher") ? title : `${title} | Christopher Vallot` },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: { title, description, url, type, siteName: metaMessages[locale].siteName, locale: localeTags[locale], alternateLocale: Object.values(localeTags).filter((tag) => tag !== localeTags[locale]), images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: { index, follow: isIndexableDeployment(), googleBot: { index, follow: isIndexableDeployment(), "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}
