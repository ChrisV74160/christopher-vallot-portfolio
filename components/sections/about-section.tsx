import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ProfilePortrait } from "@/components/ui/profile-portrait";
import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section className="section-shell section-shell--compact" id="a-propos" aria-labelledby="about-title">
      <Container>
        <Reveal className="about-panel">
          <div className="about-grid">
            <ProfilePortrait />
            <div className="about-copy">
              <p className="eyebrow">À propos</p>
              <h2 id="about-title">
                À l’interface entre la donnée, la technique et le métier.
              </h2>
              <p>
                Mon parcours relie préparation de données, Data Quality,
                automatisation et reporting dans des environnements métier variés.
              </p>
              <p>
                J’accorde une importance particulière à la fiabilité des
                traitements, à leur maintenabilité et à leur compréhension par
                les équipes qui les utilisent.
              </p>
              <div className="button-row">
                <ButtonLink
                  href={profile.contact.linkedinUrl}
                  variant="accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  Découvrir mon parcours sur LinkedIn
                  <span className="sr-only"> (nouvel onglet)</span>
                  <ArrowUpRight aria-hidden="true" size={17} />
                </ButtonLink>
                <a className="button-link button-link--secondary" href={profile.contact.cvUrl} download>
                  <ArrowDownToLine aria-hidden="true" size={17} /> Télécharger mon CV
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
