import type { Metadata } from "next";

import { PLACEHOLDERS } from "@/data/placeholders";
import { profile } from "@/data/profile";
import { siteName } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Informations légales relatives au site professionnel de Christopher Vallot, Consultant Data & BI Freelance.",
  alternates: {
    canonical: "/mentions-legales",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Mentions légales — Christopher Vallot",
    description:
      "Informations légales relatives au site professionnel de Christopher Vallot, Consultant Data & BI Freelance.",
    url: "/mentions-legales",
    siteName,
    locale: "fr_FR",
    type: "website",
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
    title: "Mentions légales — Christopher Vallot",
    description:
      "Informations légales relatives au site professionnel de Christopher Vallot, Consultant Data & BI Freelance.",
    images: ["/opengraph-image"],
  },
};

export default function LegalNoticePage() {
  return (
    <div className="legal-page">
      <header className="page-hero">
        <div className="container-shell">
          <p className="eyebrow">Informations légales</p>
          <h1 className="page-title">Mentions légales</h1>
          <p className="section-intro">
            Informations relatives à l’édition, à la publication et à
            l’hébergement de ce site professionnel.
          </p>
          <p className="legal-updated">
            <time dateTime="2026-08-29">Dernière mise à jour : 29 août 2026</time>
          </p>
        </div>
      </header>

      <section aria-label="Contenu des mentions légales">
        <div className="container-shell legal-content">
          <aside className="placeholder-note" aria-label="Informations à finaliser">
            <strong>Avant la mise en ligne</strong>
            <p>
              Les mentions signalées « [À COMPLÉTER] » doivent être remplacées
              par les informations correspondant à la situation réelle de
              l’éditeur et à l’hébergement retenu.
            </p>
          </aside>

          <section aria-labelledby="editor-heading">
            <h2 id="editor-heading">1. Éditeur du site</h2>
            <dl className="legal-details">
              <div>
                <dt>Nom légal ou raison sociale</dt>
                <dd>{PLACEHOLDERS.legal.legalName}</dd>
              </div>
              <div>
                <dt>Statut et forme juridique</dt>
                <dd>{PLACEHOLDERS.legal.legalStatus}</dd>
              </div>
              <div>
                <dt>Numéro SIREN ou SIRET</dt>
                <dd>{PLACEHOLDERS.legal.registrationNumber}</dd>
              </div>
              <div>
                <dt>TVA intracommunautaire, si applicable</dt>
                <dd>{PLACEHOLDERS.legal.vatNumber}</dd>
              </div>
              <div>
                <dt>Adresse professionnelle</dt>
                <dd>{PLACEHOLDERS.legal.postalAddress}</dd>
              </div>
              <div>
                <dt>Adresse électronique</dt>
                <dd>
                  <a href={`mailto:${profile.contact.email}`}>
                    {profile.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Téléphone</dt>
                <dd>{PLACEHOLDERS.legal.phoneNumber}</dd>
              </div>
              <div>
                <dt>Directeur de la publication</dt>
                <dd>{PLACEHOLDERS.legal.publicationDirector}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="hosting-heading">
            <h2 id="hosting-heading">2. Hébergement</h2>
            <p>{PLACEHOLDERS.legal.hostName}</p>
            <p>{PLACEHOLDERS.legal.hostAddress}</p>
            <p>{PLACEHOLDERS.legal.hostContact}</p>
          </section>

          <section aria-labelledby="intellectual-property-heading">
            <h2 id="intellectual-property-heading">3. Propriété intellectuelle</h2>
            <p>
              Sauf mention contraire, les textes, éléments graphiques,
              visualisations, composants et autres contenus présents sur ce site
              sont la propriété de {profile.fullName}. Toute reproduction,
              représentation, adaptation ou exploitation, totale ou partielle,
              nécessite une autorisation écrite préalable, sous réserve des
              exceptions prévues par la loi.
            </p>
            <p>
              Les marques, noms de produits et logos éventuellement cités restent
              la propriété de leurs titulaires respectifs et sont utilisés à des
              fins descriptives.
            </p>
          </section>

          <section aria-labelledby="liability-heading">
            <h2 id="liability-heading">4. Responsabilité</h2>
            <p>
              Les informations publiées sont fournies à titre général et peuvent
              évoluer. L’éditeur s’efforce d’en assurer l’exactitude et la mise à
              jour, sans pouvoir garantir l’absence totale d’erreur ou
              d’interruption du service.
            </p>
            <p>
              L’utilisateur reste responsable de l’usage qu’il fait des
              informations disponibles et de la protection de son équipement lors
              de sa navigation.
            </p>
          </section>

          <section aria-labelledby="links-heading">
            <h2 id="links-heading">5. Liens externes</h2>
            <p>
              Ce site peut contenir des liens vers des services tiers. L’éditeur
              ne contrôle pas leur contenu, leur disponibilité ni leurs pratiques
              de confidentialité et ne peut en être tenu responsable.
            </p>
          </section>

          <section aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">6. Données personnelles</h2>
            <p>
              Les modalités de collecte et de traitement des données personnelles,
              notamment via le formulaire de contact, sont décrites dans la{" "}
              <a href="/politique-confidentialite">
                politique de confidentialité
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="law-heading">
            <h2 id="law-heading">7. Droit applicable</h2>
            <p>
              Le présent site est soumis au droit français. Tout différend est
              traité selon les règles légales de compétence applicables.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
