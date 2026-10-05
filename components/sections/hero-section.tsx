import { localizedHref, type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import { primaryTechnologies } from "@/data/identity";
import { ArrowDownToLine, ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { DashboardArtwork } from "@/components/visuals/data-artwork";

export function HeroSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].hero;
  const { profile } = getContent(locale);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-curve hero-curve--navy" />
        <span className="hero-curve hero-curve--green" />
        <span className="hero-curve hero-curve--line" />
      </div>
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-identity">{profile.firstName} <span>{profile.lastName}</span></p>
            <h1 className="hero-positioning" id="hero-title">{t.title}</h1>
            <p className="hero-tagline">{t.signature}<span>{t.signal}</span></p>
            <p className="hero-lead">{t.description}</p>
            <div className="hero-proof">
              <ul className="hero-proof-list" aria-label={t.technologies}>
                {primaryTechnologies.map((skill) => (
                  <li className="hero-stack-item" key={skill}>
                    <TechnologyIcon name={skill} size={20} /><span>{skill}</span>
                  </li>
                ))}
              </ul>
              <p className="hero-specialties">{t.specialties}</p>
            </div>
            <p className="hero-experience">{profile.experienceLabel} · {profile.location}{t.workModes}</p>
            <div className="button-row hero-actions">
              <ButtonLink href={localizedHref("/contact", locale)} variant="accent">
                {t.contact}<ArrowRight aria-hidden="true" size={17} />
              </ButtonLink>
              <ButtonLink href="#realisations" variant="secondary">{t.projects}</ButtonLink>
            </div>
            <div className="hero-meta">
              <a href={profile.contact.linkedinUrl} target="_blank" rel="noreferrer">
                {t.linkedin}<span className="sr-only">{t.newTab}</span><ArrowUpRight aria-hidden="true" size={16} />
              </a>
              <a href={profile.contact.cvUrl} download><ArrowDownToLine aria-hidden="true" size={16} />{t.cv}</a>
            </div>
          </div>
          <DashboardArtwork className="hero-artwork" />
        </div>
      </Container>
    </section>
  );
}
