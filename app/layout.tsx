import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/data/profile";
import {
  getSiteUrl,
  isIndexableDeployment,
  siteDescription,
  siteName,
} from "@/lib/site-config";

import "./globals.css";
import appleIcon from "./apple-icon.png";
import icon from "./icon.png";

const siteUrl = getSiteUrl();
const isIndexable = isIndexableDeployment();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Christopher Vallot",
  },
  description: siteDescription,
  applicationName: siteName,
  // Stable URLs keep crawlers on the current brand assets across deployments.
  icons: {
    icon: [{ url: "/icon.png", sizes: `${icon.width}x${icon.height}`, type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: `${appleIcon.width}x${appleIcon.height}`, type: "image/png" }],
  },
  authors: [{ name: profile.fullName, url: profile.contact.linkedinUrl }],
  creator: profile.fullName,
  publisher: profile.fullName,
  keywords: [
    "Consultant Data & BI",
    "Consultant Business Intelligence",
    "Consultant Power BI",
    "Consultant Data Quality",
    "Consultant Data freelance",
    "Consultant BI freelance",
    "Data Quality",
    "automatisation de données",
    "Python",
    "SQL",
    "Power BI",
    "Tours",
    "Centre-Val de Loire",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Christopher Vallot, Consultant Data & BI Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: isIndexable,
    follow: isIndexable,
    googleBot: {
      index: isIndexable,
      follow: isIndexable,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#020812",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.role,
  description: profile.summary,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
    addressCountry: "FR",
  },
  sameAs: [profile.contact.linkedinUrl],
  knowsAbout: [
    "Python",
    "SQL",
    "Power BI",
    "DAX",
    "Power Query",
    "Data Quality",
    "Automatisation",
    "PySpark",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
