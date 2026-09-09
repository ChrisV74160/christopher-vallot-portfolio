import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  CaseStudyNavigation,
  type CaseNavigationItem,
} from "@/components/case-study-navigation";
import { ContactCta } from "@/components/contact-cta";
import { ProjectVisual } from "@/components/project-visual";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { projects } from "@/data/projects";
import { getContent, getLocalizedProjectBySlug } from "@/i18n/content";
import { localizedHref } from "@/i18n/config";
import { requireLocale } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { localizedNotFoundMetadata } from "@/i18n/not-found";
import { NotFoundContent } from "@/components/not-found-content";
import { pageMessages } from "@/i18n/messages/pages";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface CaseBlockProps {
  children: ReactNode;
  id: string;
  index: string;
  title: string;
}



export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug, locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  const project = getLocalizedProjectBySlug(locale, slug);
  if (!project) return localizedNotFoundMetadata({ params });
  return pageMetadata(locale, { title: project.title, description: project.seoDescription, path: `/projets/${project.slug}`, type: "article" });
}

function CaseBlock({ children, id, index, title }: CaseBlockProps) {
  return (
    <section className="case-block" id={id} aria-labelledby={`${id}-title`}>
      <span className="case-block-label">
        {index} — {title}
      </span>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}

function CaseList({ items }: { items: readonly string[] }) {
  return (
    <ul className="case-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  const t = pageMessages[locale].project;
const caseNavigation = [
  { index: "01", label: t.context, id: "contexte-enjeu" },
  { index: "02", label: t.objectives, id: "objectifs" },
  { index: "03", label: t.sources, id: "sources-donnees" },
  { index: "04", label: t.intervention, id: "intervention" },
  { index: "05", label: t.result, id: "resultat" },
  { index: "06", label: t.technologies, id: "technologies" },
] as const satisfies readonly CaseNavigationItem[];
  const { projects } = getContent(locale);
  const project = getLocalizedProjectBySlug(locale, slug);

  if (!project) {
    return <NotFoundContent locale={locale} />;
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    inLanguage: locale,
    description: project.seoDescription,
    about: project.sector,
    keywords: project.technologies,
    creator: {
      "@type": "Person",
      name: "Christopher Vallot",
    },
  };

  return (
    <div className="project-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="project-detail-hero">
        <div className="container-shell project-detail-hero__grid">
          <div className="project-detail-hero__copy">
            <Link className="badge" href={localizedHref("/projets", locale)}>
              <ArrowLeft size={14} aria-hidden="true" />
              {t.all}</Link>
            <h1>{project.title}</h1>
            <p className="project-detail-summary">{project.shortSummary}</p>
            <div className="project-detail-meta">
              <span className="badge badge--accent">
                <span className="badge-dot" aria-hidden="true" />
                {project.status}
              </span>
              <span className="badge">{project.sector}</span>
            </div>
          </div>

          <dl className="project-hero-facts" aria-label={t.summary}>
            {project.heroMeta.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container-shell case-study">
        <CaseStudyNavigation items={caseNavigation} locale={locale} />

        <article className="case-study-content">
          <figure className="case-visual-wrap">
            <ProjectVisual
              locale={locale}
              diagram={project.diagram}
              variant={project.visualVariant}
            />
            <figcaption className="case-visual-caption">
              {t.caption}</figcaption>
          </figure>

          <CaseBlock id="contexte-enjeu" index="01" title={t.context}>
            <p>{project.context}</p>
            <p>{project.problem}</p>
          </CaseBlock>

          <CaseBlock id="objectifs" index="02" title={t.objectives}>
            <CaseList items={project.objectives} />
          </CaseBlock>

          <CaseBlock id="sources-donnees" index="03" title={t.sources}>
            {project.dataGroups ? (
              <div className="case-data-groups">
                {project.dataGroups.map((group) => (
                  <div key={group.label}>
                    <h3>{group.label}</h3>
                    <CaseList items={group.items} />
                  </div>
                ))}
              </div>
            ) : (
              <CaseList items={project.data} />
            )}
          </CaseBlock>

          <CaseBlock id="intervention" index="04" title={t.intervention}>
            <p>{project.intervention}</p>
            <CaseList items={project.method} />
          </CaseBlock>

          <CaseBlock id="resultat" index="05" title={t.result}>
            <p>{project.result}</p>
            {project.resultHighlights ? (
              <div className="case-result-highlights">
                {project.resultHighlights.slice(0, 3).map((highlight) => (
                  <div key={highlight.title}>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </CaseBlock>

          <CaseBlock id="technologies" index="06" title={t.technologies}>
            <ul className="project-stack" aria-label={t.technologiesUsed}>
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <TechnologyIcon name={technology} size={16} />
                  <span>{technology}</span>
                </li>
              ))}
            </ul>
          </CaseBlock>

          <div className="case-study-closing">
            <ContactCta
              locale={locale}
              description={t.contactDescription}
              eyebrow={t.contactLabel}
              headingId={`project-contact-${project.slug}`}
              title={t.contactTitle}
            />

            <nav
              className="case-pagination"
              aria-label={t.navigation}
            >
              <div>
                {previousProject ? (
                  <Link href={localizedHref(`/projets/${previousProject.slug}`, locale)}>
                    <span>
                      <ArrowLeft aria-hidden="true" size={14} />
                      {t.previous}</span>
                    <strong>{previousProject.title}</strong>
                  </Link>
                ) : null}
              </div>

              <Link className="case-pagination__all" href={localizedHref("/projets", locale)}>
                {t.all}</Link>

              <div>
                {nextProject ? (
                  <Link href={localizedHref(`/projets/${nextProject.slug}`, locale)}>
                    <span>
                      {t.next}<ArrowRight aria-hidden="true" size={14} />
                    </span>
                    <strong>{nextProject.title}</strong>
                  </Link>
                ) : null}
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  );
}
