import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { metaMessages } from "@/i18n/messages/meta";
import { pageMessages } from "@/i18n/messages/pages";
import { getContent } from "@/i18n/content";
import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";



export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return pageMetadata(locale, { ...metaMessages[locale].projects, path: "/projets" });
}

export default async function ProjectsPage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const t = pageMessages[locale].projects;
  const { projects } = getContent(locale);
  return (
    <div className="project-list-page">
      <header className="page-hero">
        <div className="container-shell page-hero-grid">
          <div>
            <p className="eyebrow">{t.label}</p>
            <h1 className="page-title">{t.title}</h1>
          </div>

          <div>
            <p className="section-intro">
              {t.intro}</p>
            <div className="page-meta">
              <span className="badge badge--accent">
                <span className="badge-dot" aria-hidden="true" />
                {projects.length} {t.count}</span>
              <span className="badge">{t.status}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="container-shell" aria-labelledby="project-list-title">
        <h2 className="sr-only" id="project-list-title">
          {t.listTitle}</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
