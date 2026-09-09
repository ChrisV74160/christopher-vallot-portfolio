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
      <Link
        className="project-card-link"
        href={localizedHref(`/projets/${project.slug}`, locale)}
        aria-labelledby={titleId}
      >
        <ProjectVisual variant={project.visualVariant} locale={locale} />

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
              <dt>{messages.context}</dt>
              <dd>{project.context}</dd>
            </div>
            <div>
              <dt>{messages.intervention}</dt>
              <dd>{project.shortSummary}</dd>
            </div>
            <div>
              <dt>{messages.result}</dt>
              <dd>{project.result}</dd>
            </div>
          </dl>

          <ul className="project-stack" aria-label={messages.technologies}>
            {project.technologies.map((technology) => (
              <li key={technology}>
                <TechnologyIcon name={technology} size={14} />
                <span>{technology}</span>
              </li>
            ))}
          </ul>

          <span className="project-link-label">
            {messages.viewCase}
            <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
