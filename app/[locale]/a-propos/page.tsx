import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { metaMessages } from "@/i18n/messages/meta";
import { pageMessages } from "@/i18n/messages/pages";
import { getContent } from "@/i18n/content";
import type { Metadata } from "next";
import {
  ArrowDownToLine,
  ArrowUpRight,
  GraduationCap,
  Languages,
} from "lucide-react";

import { ExperienceItem } from "@/components/experience-item";
import { ContactCta } from "@/components/contact-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ProfilePortrait } from "@/components/ui/profile-portrait";
import { SectionHeading } from "@/components/ui/section-heading";



export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return pageMetadata(locale, { ...metaMessages[locale].about, path: "/a-propos" });
}

export default async function AboutPage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const t = pageMessages[locale].about;
  const contact = pageMessages[locale].project;
  const { education, experiences, languages, profile, workPrinciples } = getContent(locale);
  return (
    <div className="about-page">
      <section className="page-hero" aria-labelledby="about-page-title">
        <Container className="page-hero-grid">
          <div>
            <p className="eyebrow">{t.label}</p>
            <h1 className="page-title" id="about-page-title">
              {t.title}</h1>
          </div>
          <div>
            <p className="section-intro">
              {t.intro}</p>
            <div className="page-meta">
              <span className="badge badge--accent">{profile.location}</span>
              {profile.workModes.map((mode) => (
                <span className="badge" key={mode}>{mode}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell section-shell--compact" aria-labelledby="approach-title">
        <Container>
          <div className="about-panel">
            <div className="about-grid">
              <ProfilePortrait locale={locale} />
              <div className="about-copy">
                <p className="eyebrow">{t.approach}</p>
                <h2 id="approach-title">{t.approachTitle}</h2>
                <p>
                  {t.approachFirst}</p>
                <p>
                  {t.approachSecond}</p>
                <div className="button-row">
                  <ButtonLink href={profile.contact.linkedinUrl} variant="accent" target="_blank" rel="noreferrer">
                    {t.linkedin}<span className="sr-only"> {t.newTab}</span>
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </ButtonLink>
                  <a className="button-link button-link--secondary" href={profile.contact.cvUrl} download>
                    <ArrowDownToLine aria-hidden="true" size={17} /> {t.cv}</a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell" aria-labelledby="career-title">
        <Container>
          <SectionHeading
            eyebrow={t.career}
            headingId="career-title"
            title={t.careerTitle}
            description={t.careerDescription}
          />
          <div className="timeline">
            {experiences.map((experience) => (
              <ExperienceItem key={experience.id} experience={experience} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell" aria-labelledby="qualities-title">
        <Container>
          <SectionHeading
            eyebrow={t.qualities}
            headingId="qualities-title"
            title={t.qualitiesTitle}
            description={t.qualitiesDescription}
          />
          <div className="work-principles">
            {workPrinciples.map((skill) => (
              <div className="work-principle" key={skill.name}>
                <div>
                  <strong>{skill.name}</strong>
                  <p>{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell section-shell--compact" aria-labelledby="education-title">
        <Container>
          <SectionHeading
            eyebrow={t.education}
            headingId="education-title"
            title={t.educationTitle}
          />
          <div className="education-grid">
            {education.map((item) => (
              <div className="problem-card" key={item.degree}>
                <span className="service-icon"><GraduationCap aria-hidden="true" size={20} /></span>
                <div>
                  <strong>{item.degree} · {item.institution}</strong>
                  <p>{item.period} · {item.location}</p>
                </div>
              </div>
            ))}
            {languages.map((language) => (
              <div className="problem-card" key={language.name}>
                <span className="service-icon"><Languages aria-hidden="true" size={20} /></span>
                <div>
                  <strong>{language.name}</strong>
                  <p>{language.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell section-shell--compact about-final-contact">
        <Container>
          <ContactCta
            variant="similar"
            locale={locale}
            description={contact.contactDescription}
            eyebrow={contact.contactLabel}
            headingId="about-contact-title"
            title={contact.contactTitle}
          />
        </Container>
      </section>
    </div>
  );
}
