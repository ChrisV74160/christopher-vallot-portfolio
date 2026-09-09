import type { Metadata } from "next";
import Link from "next/link";

import { getLegalConfig, legalMessages } from "@/i18n/messages/legal";
import { localizedHref } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";
import { metaMessages } from "@/i18n/messages/meta";
import { requireLocale, type LocalePageProps } from "@/i18n/server";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return pageMetadata(locale, { ...metaMessages[locale].privacy, path: "/politique-confidentialite", noIndex: true });
}

export default async function PrivacyPolicyPage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const t = legalMessages[locale].privacy;
  const legalConfig = getLegalConfig(locale);
  return (
    <div className="legal-page">
      <header className="page-hero">
        <div className="container-shell">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="page-title">{t.title}</h1>
          <p className="section-intro">{t.intro}</p>
          <p className="legal-updated">
            <time dateTime="2026-09-07">{t.updated}</time>
          </p>
        </div>
      </header>

      <section aria-label={t.contentLabel}>
        <div className="container-shell legal-content">
          <section aria-labelledby="controller-heading">
            <h2 id="controller-heading">{t.controllerHeading}</h2>
            <p>
              {t.controllerBeforeName}{" "}
              {legalConfig.privacy.controllerName}{t.controllerAfterName}{" "}
              <Link href={localizedHref("/mentions-legales", locale)}>{t.legalLink}</Link>{t.controllerAfterLegal}{" "}
              <a href={`mailto:${legalConfig.privacy.contactEmail}`}>
                {legalConfig.privacy.contactEmail}
              </a>{" "}
              {t.controllerBeforeForm}<Link href={localizedHref("/contact", locale)}>{t.contactForm}</Link>.
            </p>
          </section>

          <section aria-labelledby="data-heading">
            <h2 id="data-heading">{t.dataHeading}</h2>
            <p>{t.dataIntro}</p>
            <ul>
              <li>{t.dataName}</li>
              <li>{t.dataCompany}</li>
              <li>{t.dataEmail}</li>
              <li>{t.dataNeed}</li>
              <li>{t.dataMessage}</li>
            </ul>
            <p>{t.antiSpam}</p>
            <p>{t.userAgent}</p>
          </section>

          <section aria-labelledby="purposes-heading">
            <h2 id="purposes-heading">{t.purposesHeading}</h2>
            <p>{t.purposesIntro}</p>
            <ul>
              <li>{t.purposeResponse}</li>
              <li>{t.purposeDiscussion}</li>
              <li>{t.purposeProtection}</li>
            </ul>
            <p>{t.legalBasis}</p>
            <p>{t.requiredInformation}</p>
          </section>

          <section aria-labelledby="recipients-heading">
            <h2 id="recipients-heading">{t.recipientsHeading}</h2>
            <p>
              {t.recipientBeforeName}{legalConfig.privacy.controllerName}{t.recipientBeforeHosting}{" "}
              {legalConfig.hosting.provider}{t.recipientAfterHosting}</p>
            <p>{t.thirdParties}</p>
            <p>
              {t.internationalTransfers}{" "}
              <a
                href="https://www.netlify.com/pdf/netlify-dpa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Netlify
                <span className="sr-only">{t.newTab}</span>
              </a>{" "}
              {t.and}{" "}
              <a
                href="https://resend.com/legal/dpa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resend
                <span className="sr-only">{t.newTab}</span>
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="retention-heading">
            <h2 id="retention-heading">{t.retentionHeading}</h2>
            <p>{t.mailboxRetention}</p>
            <p>
              {t.resendBeforeNotice}{" "}
              {legalConfig.privacy.resendRetentionNotice}{t.resendAfterNotice}{" "}
              <a
                href="https://resend.com/security/gdpr"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.resendGdpr}<span className="sr-only">{t.newTab}</span>
              </a>
              .
            </p>
            <p>{t.rateLimitRetention}</p>
          </section>

          <section aria-labelledby="cookies-heading">
            <h2 id="cookies-heading">{t.cookiesHeading}</h2>
            <p>{t.preferences}</p>
            <p>{t.futureAnalytics}</p>
          </section>

          <section aria-labelledby="rights-heading">
            <h2 id="rights-heading">{t.rightsHeading}</h2>
            <p>{t.rights}</p>
            <p>
              {t.rightsBeforeEmail}{" "}
              <a href={`mailto:${legalConfig.privacy.contactEmail}`}>
                {legalConfig.privacy.contactEmail}
              </a>{" "}
              {t.rightsBeforeForm}<Link href={localizedHref("/contact", locale)}>{t.contactForm}</Link>{t.rightsAfterForm}</p>
            <p>
              {t.complaints}{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.cnil}<span className="sr-only">{t.newTab}</span>
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="security-heading">
            <h2 id="security-heading">{t.securityHeading}</h2>
            <p>{t.security}</p>
          </section>

          <section aria-labelledby="changes-heading">
            <h2 id="changes-heading">{t.changesHeading}</h2>
            <p>{t.changes}</p>
          </section>
        </div>
      </section>
    </div>
  );
}
