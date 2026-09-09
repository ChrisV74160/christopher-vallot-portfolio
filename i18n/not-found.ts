import type { Metadata } from "next";

import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { pageMessages } from "@/i18n/messages/pages";

/** A missing URL must not inherit the homepage's indexable canonical or SEO copy. */
export async function localizedNotFoundMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const messages = pageMessages[locale].notFound;

  return {
    title: { absolute: `${messages.label} | Christopher Vallot` },
    description: messages.description,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: { canonical: null, languages: {} },
    openGraph: null,
    twitter: null,
  };
}
