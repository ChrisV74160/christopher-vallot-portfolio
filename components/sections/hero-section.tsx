import { type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import { ArrowDownToLine, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { DataFlowVisual } from "@/components/visuals/data-flow-visual";

const coreSkills = ["Python", "SQL", "Power BI", "DAX", "Power Query"];

export function HeroSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].hero;
  const { profile } = getContent(locale);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-ambient__grid" />
        <span className="hero-ambient__beam" />
        <span className="hero-ambient__orb" />
      </div>
      <Container>
        <div className="hero-system-bar" aria-hidden="true">
          <span>{t.system}</span>
          <span>{t.city}</span>
          <span>{t.availabilityLabel}</span>
        </div>
        <span className="sr-only">{t.availability}</span>
        <div className="hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow">{t.techEyebrow}</p>
            <h1 className="hero-positioning" id="hero-title">
              {t.title}</h1>
            <p className="display-title hero-tagline">
              {t.signature}<span>{t.signal}</span>
            </p>
            <p className="hero-lead">
              {t.description}</p>
            <div className="button-row hero-actions">
              <ButtonLink
                href={profile.contact.linkedinUrl}
                variant="accent"
                target="_blank"
                rel="noreferrer"
              >
                {t.linkedin}<span className="sr-only"> {t.newTab}</span>
                <ArrowUpRight aria-hidden="true" size={17} />
              </ButtonLink>
              <a className="button-link button-link--secondary" href={profile.contact.cvUrl} download>
                <ArrowDownToLine aria-hidden="true" size={17} />
                {t.cv}</a>
            </div>
            <div className="hero-meta">
              <span>
                <MapPin aria-hidden="true" size={14} /> {profile.location} {t.workModes}</span>
              <a href="#realisations">
                {t.projects}<ArrowRight aria-hidden="true" size={14} />
              </a>
            </div>
            <div className="hero-proof">
              <p className="hero-proof-label">{t.technologiesLabel}</p>
              <ul className="hero-proof-list" aria-label={t.technologies}>
                {coreSkills.map((skill) => (
                  <li className="hero-stack-item" key={skill}>
                    <TechnologyIcon name={skill} size={20} />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <div className="hero-visual-wrap">
            <DataFlowVisual locale={locale} />
          </div>
        </div>
        <a className="hero-scroll-cue" href="#services">
          <span>{t.scroll}</span>
          <i aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
