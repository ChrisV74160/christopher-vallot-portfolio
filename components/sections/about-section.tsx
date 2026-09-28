import { type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ProfilePortrait } from "@/components/ui/profile-portrait";
import { AlignmentArtwork } from "@/components/visuals/data-artwork";

export function AboutSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].about;
  const { profile } = getContent(locale);

  return (
    <section className="section-shell section-shell--compact" id="a-propos" aria-labelledby="about-title">
      <Container>
        <div className="about-panel">
          <div className="about-grid">
            <ProfilePortrait locale={locale} />
            <div className="about-copy">
              <p className="eyebrow">{t.label}</p>
              <h2 id="about-title">
                {t.title}</h2>
              <p>
                {t.description}</p>
              <p>
                {t.approach}</p>
              <AlignmentArtwork locale={locale} />
              <div className="button-row">
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
                  <ArrowDownToLine aria-hidden="true" size={17} /> {t.cv}</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
