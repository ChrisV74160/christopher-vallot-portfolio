import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import type { ProjectCaseStudy } from "@/types/content";

interface ProjectCardProps {
  project: ProjectCaseStudy;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const titleId = `project-${project.slug}-title`;

  return (
    <article className="project-card">
      <Link
        className="project-card-link"
        href={`/projets/${project.slug}`}
        aria-labelledby={titleId}
      >
        <ProjectVisual variant={project.visualVariant} />

        <div className="project-card-content">
          <div className="project-card-topline">
            <span className="badge badge--accent">
              <span className="badge-dot" aria-hidden="true" />
              {project.status}
            </span>
            <span className="project-sector">{project.sector}</span>
          </div>

          <h3 id={titleId}>{project.title}</h3>

          <dl className="project-card-evidence">
            <div>
              <dt>Contexte</dt>
              <dd>{project.context}</dd>
            </div>
            <div>
              <dt>Intervention</dt>
              <dd>{project.shortSummary}</dd>
            </div>
            <div>
              <dt>Résultat</dt>
              <dd>{project.result}</dd>
            </div>
          </dl>

          <ul className="project-stack" aria-label="Technologies utilisées">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <TechnologyIcon name={technology} size={14} />
                <span>{technology}</span>
              </li>
            ))}
          </ul>

          <span className="project-link-label">
            Voir l’étude de cas
            <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
