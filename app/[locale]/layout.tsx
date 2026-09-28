import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getContent } from "@/i18n/content";
import { locales, localizedHref } from "@/i18n/config";
import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { metaMessages } from "@/i18n/messages/meta";
import { getSiteUrl } from "@/lib/site-config";

import "../globals.css";
import appleIcon from "../apple-icon.png";
import icon from "../icon.png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const { profile } = getContent(locale);
  const t = metaMessages[locale];
  return {
    ...pageMetadata(locale, { ...t.home, path: "/" }),
    applicationName: t.siteName,
    authors: [{ name: profile.fullName, url: profile.contact.linkedinUrl }],
    creator: profile.fullName,
    publisher: profile.fullName,
    keywords: [...t.keywords],
    icons: {
      icon: [
        { url: icon.src, sizes: `${icon.width}x${icon.height}`, type: "image/png" },
      ],
      shortcut: icon.src,
      apple: [{ url: appleIcon.src, sizes: `${appleIcon.width}x${appleIcon.height}`, type: "image/png" }],
    },
    manifest: `/${locale}/manifest.webmanifest`,
  };
}

export const viewport: Viewport = { colorScheme: "light", themeColor: "#003f5c" };

export default async function LocaleLayout({ children, params }: LocalePageProps & { children: React.ReactNode }) {
  const locale = requireLocale((await params).locale);
  const { profile } = getContent(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.role,
    description: profile.summary,
    url: getSiteUrl() + localizedHref("/", locale),
    address: { "@type": "PostalAddress", addressLocality: profile.location, addressCountry: "FR" },
    sameAs: [profile.contact.linkedinUrl],
    knowsAbout: ["Python", "SQL", "Power BI", "DAX", "Power Query", "Data Quality", metaMessages[locale].og.automation, "PySpark"],
  };

  return (
    <html lang={locale}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body>
        <a className="skip-link" href="#contenu">{metaMessages[locale].skip}</a>
        <SiteHeader locale={locale} />
        <main id="contenu" tabIndex={-1}>{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
