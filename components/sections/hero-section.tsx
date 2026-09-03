import { ArrowDownToLine, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { DataFlowVisual } from "@/components/visuals/data-flow-visual";
import { profile } from "@/data/profile";

const coreSkills = ["Python", "SQL", "Power BI", "DAX", "Power Query"];

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-ambient__grid" />
        <span className="hero-ambient__beam" />
        <span className="hero-ambient__orb" />
      </div>
      <Container>
        <div className="hero-system-bar" aria-hidden="true">
          <span>DATA &amp; BI / INTERFACE</span>
          <span>TOURS · FR</span>
          <span>DISPONIBLE / MISSIONS</span>
        </div>
        <div className="hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow">Python / SQL / Data Quality</p>
            <h1 className="hero-positioning" id="hero-title">
              Consultant Data &amp; BI freelance — fiabilisation,
              automatisation &amp; Power BI
            </h1>
            <p className="display-title hero-tagline">
              Transformer le bruit en <span>signal.</span>
            </p>
            <p className="hero-lead">
              J’aide les entreprises à fiabiliser leurs données, automatiser
              leurs traitements et construire des reportings Power BI
              exploitables, de l’intégration des sources jusqu’au pilotage.
            </p>
            <div className="button-row hero-actions">
              <ButtonLink
                href={profile.contact.linkedinUrl}
                variant="accent"
                target="_blank"
                rel="noreferrer"
              >
                Voir mon LinkedIn
                <span className="sr-only"> (nouvel onglet)</span>
                <ArrowUpRight aria-hidden="true" size={17} />
              </ButtonLink>
              <a className="button-link button-link--secondary" href={profile.contact.cvUrl} download>
                <ArrowDownToLine aria-hidden="true" size={17} />
                Télécharger mon CV
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <MapPin aria-hidden="true" size={14} /> {profile.location} ·
                À distance, hybride ou sur site · Disponible pour missions
              </span>
              <a href="#realisations">
                Explorer les réalisations <ArrowRight aria-hidden="true" size={14} />
              </a>
            </div>
            <div className="hero-proof">
              <p className="hero-proof-label">Technologies principales / 05</p>
              <ul className="hero-proof-list" aria-label="Technologies principales">
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
            <DataFlowVisual />
          </div>
        </div>
        <a className="hero-scroll-cue" href="#services">
          <span>Défiler pour explorer</span>
          <i aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
