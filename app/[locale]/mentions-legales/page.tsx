import type { Metadata } from "next";
import Link from "next/link";

import { getLegalConfig, legalMessages } from "@/i18n/messages/legal";
import { localizedHref } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";
import { metaMessages } from "@/i18n/messages/meta";
import { requireLocale, type LocalePageProps } from "@/i18n/server";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return pageMetadata(locale, { ...metaMessages[locale].legal, path: "/mentions-legales", noIndex: true });
}

export default async function LegalNoticePage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const t = legalMessages[locale].notice;
  const legalConfig = getLegalConfig(locale);
  return (
    <div className="legal-page">
      <header className="page-hero">
        <div className="container-shell">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="page-title">{t.title}</h1>
          <p className="section-intro">{t.intro}</p>
          <p className="legal-updated">
            <time dateTime="2026-09-03">{t.updated}</time>
          </p>
        </div>
      </header>

      <section aria-label={t.contentLabel}>
        <div className="container-shell legal-content">
          {legalConfig.business.status === "prelaunch" ? (
            <aside
              className="placeholder-note"
              aria-label={t.statusLabel}
            >
              <strong>{t.prelaunchTitle}</strong>
              <p>{legalConfig.business.notice}</p>
            </aside>
          ) : null}

          <section aria-labelledby="editor-heading">
            <h2 id="editor-heading">{t.publisherHeading}</h2>
            <dl className="legal-details">
              <div>
                <dt>{t.publisher}</dt>
                <dd>{legalConfig.publisher.name}</dd>
              </div>
              <div>
                <dt>{t.siteType}</dt>
                <dd>{legalConfig.publisher.description}</dd>
              </div>
              {legalConfig.business.legalStatus ? (
                <div>
                  <dt>{t.legalStatus}</dt>
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
                  <dt>{t.registration}</dt>
                  <dd>{legalConfig.business.registration}</dd>
                </div>
              ) : null}
              {legalConfig.business.vatNumber ? (
                <div>
                  <dt>{t.vatNumber}</dt>
                  <dd>{legalConfig.business.vatNumber}</dd>
                </div>
              ) : null}
              {legalConfig.business.address ? (
                <div>
                  <dt>{t.address}</dt>
                  <dd>{legalConfig.business.address}</dd>
                </div>
              ) : null}
              <div>
                <dt>{t.email}</dt>
                <dd>
                  <a href={`mailto:${legalConfig.publisher.email}`}>
                    {legalConfig.publisher.email}
                  </a>
                </dd>
              </div>
              {legalConfig.business.phone ? (
                <div>
                  <dt>{t.phone}</dt>
                  <dd>
                    <a href={`tel:${legalConfig.business.phone.replace(/\s/g, "")}`}>
                      {legalConfig.business.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>{t.publicationDirector}</dt>
                <dd>{legalConfig.publisher.publicationDirector}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="hosting-heading">
            <h2 id="hosting-heading">{t.hostingHeading}</h2>
            <p>
              {legalConfig.hosting.provider} — {legalConfig.hosting.legalName}
            </p>
            <p>{legalConfig.hosting.address}</p>
            <p>
              {t.website}{" "}
              <a
                href={legalConfig.hosting.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {legalConfig.hosting.website}
                <span className="sr-only">{t.newTab}</span>
              </a>
            </p>
            <p>
              {t.contact}{" "}
              <a href={`mailto:${legalConfig.hosting.contactEmail}`}>
                {legalConfig.hosting.contactEmail}
              </a>
            </p>
            {legalConfig.hosting.phone ? (
              <p>{t.phonePrefix}{legalConfig.hosting.phone}</p>
            ) : null}
          </section>

          <section aria-labelledby="intellectual-property-heading">
            <h2 id="intellectual-property-heading">{t.propertyHeading}</h2>
            <p>
              {t.propertyBeforeName}{legalConfig.publisher.name}{t.propertyAfterName}</p>
            <p>{t.trademarks}</p>
          </section>

          <section aria-labelledby="liability-heading">
            <h2 id="liability-heading">{t.liabilityHeading}</h2>
            <p>{t.liabilityInformation}</p>
            <p>{t.liabilityUser}</p>
          </section>

          <section aria-labelledby="links-heading">
            <h2 id="links-heading">{t.linksHeading}</h2>
            <p>{t.externalLinks}</p>
          </section>

          <section aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">{t.privacyHeading}</h2>
            <p>
              {t.privacyBeforeLink}{" "}
              <Link href={localizedHref("/politique-confidentialite", locale)}>
                {t.privacyLink}</Link>
              .
            </p>
          </section>

          <section aria-labelledby="law-heading">
            <h2 id="law-heading">{t.lawHeading}</h2>
            <p>{t.applicableLaw}</p>
          </section>
        </div>
      </section>
    </div>
  );
}
