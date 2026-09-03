import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section
      className="section-shell"
      id="realisations"
      aria-labelledby="projects-title"
    >
      <div className="container-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Études de cas</p>
            <h2 className="section-title" id="projects-title">
              Des données brutes à un usage concret.
            </h2>
          </div>
          <p className="section-intro">
            Des missions issues de mon parcours, présentées sans divulguer de
            données internes ni ajouter de métrique.
          </p>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="button-row" style={{ marginTop: "2rem" }}>
          <Link className="button-link button-link--secondary" href="/projets">
            Voir toutes les réalisations
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
