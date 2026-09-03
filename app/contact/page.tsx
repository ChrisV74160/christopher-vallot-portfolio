import type { Metadata } from "next";

import ContactSection from "@/components/sections/contact-section";
import { profile } from "@/data/profile";
import { siteName } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Présentez votre besoin en intégration, Data Quality, automatisation, Python, SQL ou Power BI à Christopher Vallot, Consultant Data & BI Freelance.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Christopher Vallot, Consultant Data & BI Freelance",
    description:
      "Présentez votre besoin en Power BI, analyse de données, Data Quality, SQL, Python ou automatisation.",
    url: "/contact",
    siteName,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contacter Christopher Vallot, Consultant Data & BI Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Christopher Vallot, Consultant Data & BI Freelance",
    description:
      "Présentez votre besoin en Power BI, analyse de données, Data Quality, SQL, Python ou automatisation.",
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <header className="page-hero">
        <div className="container-shell page-hero-grid">
          <div>
            <p className="eyebrow">Travaillons ensemble</p>
            <h1 className="page-title">
              Parlons de votre prochain projet data.
            </h1>
          </div>

          <div>
            <p className="section-intro">
              Intégration et consolidation, Data Quality, automatisation ou
              reporting Power BI&nbsp;: décrivez votre contexte, vos données et
              le résultat attendu pour cadrer les prochaines étapes.
            </p>
            <div className="page-meta" aria-label="Modalités d’intervention">
              <span className="badge badge--accent">{profile.location}</span>
              {profile.workModes.map((mode) => (
                <span className="badge" key={mode}>
                  {mode}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <ContactSection />
    </div>
  );
}
