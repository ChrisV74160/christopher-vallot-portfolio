import type { Metadata } from "next";

import { legalConfig } from "@/data/legal-config";
import { siteName } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Informations légales relatives au site professionnel de Christopher VALLOT, Consultant Data & BI Freelance.",
  alternates: {
    canonical: "/mentions-legales",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Mentions légales — Christopher VALLOT",
    description:
      "Informations légales relatives au site professionnel de Christopher VALLOT, Consultant Data & BI Freelance.",
    url: "/mentions-legales",
    siteName,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Christopher VALLOT, Consultant Data & BI Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentions légales — Christopher VALLOT",
    description:
      "Informations légales relatives au site professionnel de Christopher VALLOT, Consultant Data & BI Freelance.",
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
            <time dateTime="2026-09-03">
              Dernière mise à jour : 3 septembre 2026
            </time>
          </p>
        </div>
      </header>

      <section aria-label="Contenu des mentions légales">
        <div className="container-shell legal-content">
          {legalConfig.business.status === "prelaunch" ? (
            <aside
              className="placeholder-note"
              aria-label="Statut de l’activité"
            >
              <strong>Projet d’activité indépendante</strong>
              <p>{legalConfig.business.notice}</p>
            </aside>
          ) : null}

          <section aria-labelledby="editor-heading">
            <h2 id="editor-heading">1. Éditeur du site</h2>
            <dl className="legal-details">
              <div>
                <dt>Éditeur</dt>
                <dd>{legalConfig.publisher.name}</dd>
              </div>
              <div>
                <dt>Nature du site</dt>
                <dd>{legalConfig.publisher.description}</dd>
              </div>
              {legalConfig.business.legalStatus ? (
                <div>
                  <dt>Statut et forme juridique</dt>
                  <dd>{legalConfig.business.legalStatus}</dd>
                </div>
              ) : null}
              {legalConfig.business.siren ? (
                <div>
                  <dt>SIREN</dt>
                  <dd>{legalConfig.business.siren}</dd>
                </div>
              ) : null}
              {legalConfig.business.siret ? (
                <div>
                  <dt>SIRET</dt>
                  <dd>{legalConfig.business.siret}</dd>
                </div>
              ) : null}
              {legalConfig.business.registration ? (
                <div>
                  <dt>Immatriculation</dt>
                  <dd>{legalConfig.business.registration}</dd>
                </div>
              ) : null}
              {legalConfig.business.vatNumber ? (
                <div>
                  <dt>TVA intracommunautaire</dt>
                  <dd>{legalConfig.business.vatNumber}</dd>
                </div>
              ) : null}
              {legalConfig.business.address ? (
                <div>
                  <dt>Adresse</dt>
                  <dd>{legalConfig.business.address}</dd>
                </div>
              ) : null}
              <div>
                <dt>Adresse électronique</dt>
                <dd>
                  <a href={`mailto:${legalConfig.publisher.email}`}>
                    {legalConfig.publisher.email}
                  </a>
                </dd>
              </div>
              {legalConfig.business.phone ? (
                <div>
                  <dt>Téléphone</dt>
                  <dd>{legalConfig.business.phone}</dd>
                </div>
              ) : null}
              <div>
                <dt>Directeur de la publication</dt>
                <dd>{legalConfig.publisher.publicationDirector}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="hosting-heading">
            <h2 id="hosting-heading">2. Hébergement</h2>
            <p>
              {legalConfig.hosting.provider} — {legalConfig.hosting.legalName}
            </p>
            <p>{legalConfig.hosting.address}</p>
            <p>
              Site :{" "}
              <a
                href={legalConfig.hosting.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {legalConfig.hosting.website}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </p>
            <p>
              Contact :{" "}
              <a href={`mailto:${legalConfig.hosting.contactEmail}`}>
                {legalConfig.hosting.contactEmail}
              </a>
            </p>
            {legalConfig.hosting.phone ? (
              <p>Téléphone : {legalConfig.hosting.phone}</p>
            ) : null}
          </section>

          <section aria-labelledby="intellectual-property-heading">
            <h2 id="intellectual-property-heading">3. Propriété intellectuelle</h2>
            <p>
              Sauf mention contraire, les textes, éléments graphiques,
              visualisations, composants et autres contenus présents sur ce site
              sont la propriété de {legalConfig.publisher.name}. Toute
              reproduction, représentation, adaptation ou exploitation, totale
              ou partielle, nécessite une autorisation écrite préalable, sous
              réserve des exceptions prévues par la loi.
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
