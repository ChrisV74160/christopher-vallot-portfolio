import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import {
  CaseStudyNavigation,
  type CaseNavigationItem,
} from "@/components/case-study-navigation";
import { ContactCta } from "@/components/contact-cta";
import { ProjectVisual } from "@/components/project-visual";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { getProjectBySlug, projects } from "@/data/projects";
import { siteName } from "@/lib/site-config";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

interface CaseBlockProps {
  children: ReactNode;
  id: string;
  index: string;
  title: string;
}

const caseNavigation = [
  { index: "01", label: "Contexte & enjeu", id: "contexte-enjeu" },
  { index: "02", label: "Objectifs", id: "objectifs" },
  { index: "03", label: "Sources & données", id: "sources-donnees" },
  { index: "04", label: "Intervention", id: "intervention" },
  { index: "05", label: "Résultat", id: "resultat" },
  { index: "06", label: "Technologies", id: "technologies" },
] as const satisfies readonly CaseNavigationItem[];

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Étude de cas introuvable",
      robots: { index: false, follow: false },
    };
  }

  const url = `/projets/${project.slug}`;
  const socialTitle = `${project.title} | Christopher Vallot`;

  return {
    title: project.title,
    description: project.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description: project.seoDescription,
      url,
      siteName,
      locale: "fr_FR",
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${project.title} — étude de cas Data & BI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: project.seoDescription,
      images: ["/opengraph-image"],
    },
  };
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
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
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
            <Link className="badge" href="/projets">
              <ArrowLeft size={14} aria-hidden="true" />
              Toutes les réalisations
            </Link>
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

          <dl className="project-hero-facts" aria-label="Synthèse de l’étude">
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
        <CaseStudyNavigation items={caseNavigation} />

        <article className="case-study-content">
          <figure className="case-visual-wrap">
            <ProjectVisual
              diagram={project.diagram}
              variant={project.visualVariant}
            />
            <figcaption className="case-visual-caption">
              Illustration abstraite du flux principal — aucune donnée interne
              ou confidentielle n’est représentée.
            </figcaption>
          </figure>

          <CaseBlock id="contexte-enjeu" index="01" title="Contexte & enjeu">
            <p>{project.context}</p>
            <p>{project.problem}</p>
          </CaseBlock>

          <CaseBlock id="objectifs" index="02" title="Objectifs">
            <CaseList items={project.objectives} />
          </CaseBlock>

          <CaseBlock id="sources-donnees" index="03" title="Sources & données">
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

          <CaseBlock id="intervention" index="04" title="Intervention">
            <p>{project.intervention}</p>
            <CaseList items={project.method} />
          </CaseBlock>

          <CaseBlock id="resultat" index="05" title="Résultat">
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

          <CaseBlock id="technologies" index="06" title="Technologies">
            <ul className="project-stack" aria-label="Technologies utilisées">
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
              description="Échangeons sur vos données, vos traitements et le résultat attendu pour définir une intervention adaptée à votre contexte."
              eyebrow="Besoin similaire ?"
              headingId={`project-contact-${project.slug}`}
              title="Vous avez un sujet Data ou BI à fiabiliser ?"
            />

            <nav
              className="case-pagination"
              aria-label="Navigation entre les études de cas"
            >
              <div>
                {previousProject ? (
                  <Link href={`/projets/${previousProject.slug}`}>
                    <span>
                      <ArrowLeft aria-hidden="true" size={14} />
                      Étude précédente
                    </span>
                    <strong>{previousProject.title}</strong>
                  </Link>
                ) : null}
              </div>

              <Link className="case-pagination__all" href="/projets">
                Toutes les réalisations
              </Link>

              <div>
                {nextProject ? (
                  <Link href={`/projets/${nextProject.slug}`}>
                    <span>
                      Étude suivante
                      <ArrowRight aria-hidden="true" size={14} />
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
