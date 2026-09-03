import { ArrowRight, Mail } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/profile";

/**
 * Offers a direct next step at the end of the portfolio narrative, before the
 * FAQ. The complete qualification form remains available on the contact page.
 */
export function JourneyCtaSection() {
  return (
    <section className="journey-cta" aria-labelledby="journey-cta-title">
      <Container>
        <div className="journey-cta__panel">
          <div className="journey-cta__copy">
            <p className="eyebrow">Un besoin Data ou BI ?</p>
            <h2 id="journey-cta-title">Parlons de votre contexte.</h2>
            <p>
              Reporting à fiabiliser, traitements à automatiser, données à
              consolider ou besoin Data / BI à cadrer : échangeons sur votre
              problématique.
            </p>
          </div>

          <div className="journey-cta__actions">
            <ButtonLink href="/contact" variant="accent">
              Discuter de votre projet
              <ArrowRight aria-hidden="true" size={17} />
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
