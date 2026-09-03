import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { siteName } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projets data et études de cas",
  description:
    "Découvrez des études de cas issues d’expériences professionnelles en Business Intelligence, Data Quality, automatisation et traitement de données.",
  alternates: {
    canonical: "/projets",
  },
  openGraph: {
    title: "Projets data et études de cas | Christopher VALLOT",
    description:
      "Des missions data présentées du contexte à l’intervention, avec leurs résultats et technologies.",
    url: "/projets",
    siteName,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Projets data et études de cas de Christopher Vallot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projets data et études de cas | Christopher VALLOT",
    description:
      "Des missions data présentées du contexte à l’intervention, avec leurs résultats et technologies.",
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  return (
    <div className="project-list-page">
      <header className="page-hero">
        <div className="container-shell page-hero-grid">
          <div>
            <p className="eyebrow">Réalisations</p>
            <h1 className="page-title">Des projets data, de la source à l’usage.</h1>
          </div>

          <div>
            <p className="section-intro">
              Ces études de cas reprennent des missions issues de mon parcours
              professionnel. Elles présentent les problématiques, approches et
              technologies utilisées sans divulguer de données internes ou
              d’informations confidentielles.
            </p>
            <div className="page-meta">
              <span className="badge badge--accent">
                <span className="badge-dot" aria-hidden="true" />
                {projects.length} études de cas
              </span>
              <span className="badge">Expériences professionnelles</span>
            </div>
          </div>
        </div>
      </header>

      <section className="container-shell" aria-labelledby="project-list-title">
        <h2 className="sr-only" id="project-list-title">
          Liste complète des études de cas
        </h2>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
