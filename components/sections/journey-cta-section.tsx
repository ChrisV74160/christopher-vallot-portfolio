import { localizedHref, type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import { ArrowRight, Mail } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

/**
 * Offers a direct next step at the end of the portfolio narrative, before the
 * FAQ. The complete qualification form remains available on the contact page.
 */
export function JourneyCtaSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].journeyCta;
  const { profile } = getContent(locale);

  return (
    <section className="journey-cta" aria-labelledby="journey-cta-title">
      <Container>
        <div className="journey-cta__panel">
          <div className="journey-cta__copy">
            <p className="eyebrow">{t.label}</p>
            <h2 id="journey-cta-title">{t.title}</h2>
            <p>
              {t.description}</p>
          </div>

          <div className="journey-cta__actions">
            <ButtonLink href={localizedHref("/contact", locale)} variant="accent">
              {t.contact}<ArrowRight aria-hidden="true" size={17} />
            </ButtonLink>
            <a href={`mailto:${profile.contact.email}`}>
              <Mail aria-hidden="true" size={15} />
              {profile.contact.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
