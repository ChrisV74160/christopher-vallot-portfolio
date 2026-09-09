import { localizedHref, type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/project-card";

export function ProjectsSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].projects;
  const { featuredProjects } = getContent(locale);

  return (
    <section
      className="section-shell"
      id="realisations"
      aria-labelledby="projects-title"
    >
      <div className="container-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.label}</p>
            <h2 className="section-title" id="projects-title">
              {t.title}</h2>
          </div>
          <p className="section-intro">
            {t.description}</p>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>

        <div className="button-row" style={{ marginTop: "2rem" }}>
          <Link className="button-link button-link--secondary" href={localizedHref("/projets", locale)}>
            {t.all}<ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
