import type { Metadata } from "next";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Languages,
} from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animations/reveal";
import { ContactCta } from "@/components/contact-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ProfilePortrait } from "@/components/ui/profile-portrait";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  education,
  experiences,
  languages,
  profile,
  softSkills,
} from "@/data/profile";
import { siteName } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Parcours de Christopher Vallot, Consultant Data & BI Freelance spécialisé en transformation, Data Quality, automatisation et Business Intelligence.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos de Christopher Vallot, Consultant Data & BI Freelance",
    description:
      "Un parcours entre analyse, fiabilisation, automatisation et restitution de données.",
    url: "/a-propos",
    siteName,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "À propos de Christopher Vallot, Consultant Data & BI Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de Christopher Vallot, Consultant Data & BI Freelance",
    description:
      "Un parcours entre analyse, fiabilisation, automatisation et restitution de données.",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="page-hero" aria-labelledby="about-page-title">
        <Container className="page-hero-grid">
          <div>
            <p className="eyebrow">À propos</p>
            <h1 className="page-title" id="about-page-title">
              Relier la donnée, la technique et l’usage.
            </h1>
          </div>
          <div>
            <p className="section-intro">
              Consultant Data &amp; BI Freelance issu du développement
              informatique, j’interviens sur les sujets où les données doivent
              être intégrées, transformées, fiabilisées ou automatisées avant de
              devenir une information réellement exploitable.
            </p>
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
              <ProfilePortrait />
              <div className="about-copy">
                <p className="eyebrow">Mon approche</p>
                <h2 id="approach-title">Fiabiliser avant d’accélérer.</h2>
                <p>
                  Une analyse ou un dashboard n’est solide que si les sources,
                  les règles et les contrôles le sont aussi. Je pars du besoin
                  métier, identifie ce qui fragilise la donnée et automatise les
                  transformations qui doivent pouvoir être rejouées et maintenues.
                </p>
                <p>
                  De l’intégration des flux au reporting Power BI, mes expériences
                  à la CNAV, chez Harmonie Mutuelle, Apside et Banque de France
                  m’ont appris à relier contraintes techniques et usages métier.
                </p>
                <div className="button-row">
                  <ButtonLink href={profile.contact.linkedinUrl} variant="accent" target="_blank" rel="noreferrer">
                    Profil LinkedIn
                    <span className="sr-only"> (nouvel onglet)</span>
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </ButtonLink>
                  <a className="button-link button-link--secondary" href={profile.contact.cvUrl} download>
                    <ArrowDownToLine aria-hidden="true" size={17} /> Télécharger mon CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell" aria-labelledby="career-title">
        <Container>
          <SectionHeading
            eyebrow="Parcours"
            headingId="career-title"
            title="Des missions où la fiabilité compte."
            description="Migration, intégration, qualité, automatisation, reporting et modélisation : chaque expérience a renforcé une partie de la chaîne data."
          />
          <div className="timeline">
            {experiences.map((experience, index) => (
              <Reveal className="timeline-item" delay={index * 0.04} key={experience.id}>
                <time>{experience.period}<br />{experience.location}</time>
                <div>
                  <h3>{experience.role} · {experience.company}</h3>
                  <p>{experience.summary}</p>
                  <ul className="case-list">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="timeline-tags">
                    {experience.technologies.map((technology) => (
                      <span className="badge" key={technology}>{technology}</span>
                    ))}
                  </div>
                  {experience.caseStudySlug ? (
                    <Link
                      className="timeline-case-link"
                      href={`/projets/${experience.caseStudySlug}`}
                    >
                      Voir l’étude de cas
                      <ArrowRight aria-hidden="true" size={15} />
                    </Link>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell" aria-labelledby="qualities-title">
        <Container>
          <SectionHeading
            eyebrow="Façon de travailler"
            headingId="qualities-title"
            title="Les qualités qui structurent ma façon de travailler."
            description="Esprit analytique, rigueur, autonomie, adaptabilité, synthèse et communication : six repères directement issus de mon parcours professionnel."
          />
          <div className="problem-grid">
            {softSkills.map((skill, index) => (
              <Reveal className="problem-card" delay={index * 0.04} key={skill.name}>
                <span className="card-index">0{index + 1}</span>
                <div>
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell section-shell--compact" aria-labelledby="education-title">
        <Container>
          <SectionHeading
            eyebrow="Formation"
            headingId="education-title"
            title="Des bases informatiques solides au service de la Data."
          />
          <div className="education-grid">
            {education.map((item) => (
              <div className="problem-card" key={item.degree}>
                <span className="service-icon"><GraduationCap aria-hidden="true" size={20} /></span>
                <div>
                  <h3>{item.degree} · {item.institution}</h3>
                  <p>{item.period} · {item.location}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
            {languages.map((language) => (
              <div className="problem-card" key={language.name}>
                <span className="service-icon"><Languages aria-hidden="true" size={20} /></span>
                <div>
                  <h3>{language.name}</h3>
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
            description="Intégration de données, Data Quality, automatisation ou reporting : échangeons sur votre contexte et le périmètre de votre mission."
            eyebrow="Travaillons ensemble"
            headingId="about-contact-title"
            title="Un besoin Data ou BI à cadrer ?"
          />
        </Container>
      </section>
    </div>
  );
}
