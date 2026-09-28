import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { localizedHref, type Locale } from "@/i18n/config";
import { projectMessages } from "@/i18n/messages/projects";
import type { ProjectCaseStudy } from "@/types/content";

interface ProjectCardProps {
  project: ProjectCaseStudy;
  locale?: Locale;
}

export function ProjectCard({ project, locale = "fr" }: ProjectCardProps) {
  const messages = projectMessages[locale];
  const titleId = `project-${project.slug}-title`;

  return (
    <article className="project-card">
      <div className="project-card-body">
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

          <p className="project-card-summary">{project.shortSummary}</p>

          <ul className="project-stack" aria-label={messages.technologies}>
            {project.technologies.slice(0, 4).map((technology) => (
              <li key={technology}>
                <TechnologyIcon name={technology} size={14} />
                <span>{technology}</span>
              </li>
            ))}
          </ul>

          <Link
            className="project-link-label project-card-link"
            href={localizedHref(`/projets/${project.slug}`, locale)}
          >
            {messages.viewCase}
            <span className="sr-only"> — {project.title}</span>
            <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
