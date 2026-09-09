import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { metaMessages } from "@/i18n/messages/meta";
import { pageMessages } from "@/i18n/messages/pages";
import { getContent } from "@/i18n/content";
import type { Metadata } from "next";

import ContactSection from "@/components/sections/contact-section";



export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return pageMetadata(locale, { ...metaMessages[locale].contact, path: "/contact" });
}

export default async function ContactPage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const t = pageMessages[locale].contact;
  const { profile } = getContent(locale);
  return (
    <div className="contact-page">
      <header className="page-hero">
        <div className="container-shell page-hero-grid">
          <div>
            <p className="eyebrow">{t.label}</p>
            <h1 className="page-title">
              {t.title}</h1>
          </div>

          <div>
            <p className="section-intro">
              {t.intro}</p>
            <div className="page-meta" role="group" aria-label={t.workModes}>
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

      <ContactSection locale={locale} />
    </div>
  );
}
