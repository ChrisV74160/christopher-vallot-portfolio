import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

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

function CaseBlock({ children, id, title }: CaseBlockProps) {
  return (
    <section className="case-block" id={id} aria-labelledby={`${id}-title`}>
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
      name: "Christopher VALLOT",
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

          <p className="project-disclosure">{t.disclosure}</p>
        </div>
      </header>

      <div className="container-shell case-study">

        <article className="case-study-content">
          <figure className="case-visual-wrap">
            <ProjectVisual
              detail
              variant={project.visualVariant}
            />
            <figcaption className="case-visual-caption">
              {t.caption}</figcaption>
          </figure>

          <CaseBlock id="contexte-enjeu" title={t.context}>
            <p>{project.context}</p>
            <div id="sources-donnees"><CaseList items={project.data} /></div>
          </CaseBlock>

          <CaseBlock id="enjeu" title={t.problem}>
            <p>{project.problem}</p>
          </CaseBlock>

          <CaseBlock id="objectifs" title={t.objectives}>
            <CaseList items={project.objectives} />
          </CaseBlock>


          <CaseBlock id="intervention" title={t.intervention}>
            <p>{project.intervention}</p>
            <CaseList items={project.method} />
          </CaseBlock>

          <CaseBlock id="resultat" title={t.result}>
            <p>{project.result}</p>
          </CaseBlock>

          <CaseBlock id="technologies" title={t.technologies}>
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
              variant="similar"
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
