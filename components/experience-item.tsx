import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizedHref, type Locale } from "@/i18n/config";
import { pageMessages } from "@/i18n/messages/pages";
import type { Experience } from "@/types/content";
import { TechnologyBadge } from "@/components/ui/technology-badge";

export function ExperienceItem({
  experience,
  locale,
}: {
  experience: Experience;
  locale: Locale;
}) {
  const t = pageMessages[locale].about;
  const organisation = experience.employer === experience.company
    ? experience.company
    : `${experience.employer} · ${t.mission} ${experience.company}`;

  return (
    <article className="timeline-item">
      <p className="timeline-date">{experience.period}<br />{experience.location}</p>
      <div className="timeline-content">
        <h3>{experience.role}</h3>
        <p className="timeline-organisation"><strong>{organisation}</strong></p>
        <p className="timeline-intro">{experience.summary}</p>

        <p className="timeline-label" id={`${experience.id}-interventions`}>{t.interventions}</p>
        <ul className="timeline-interventions" aria-labelledby={`${experience.id}-interventions`}>
          {experience.interventions.map((intervention) => (
            <li key={intervention}>{intervention}</li>
          ))}
        </ul>

        <p className="timeline-label" id={`${experience.id}-technologies`}>{t.technologies}</p>
        <ul className="timeline-tags" aria-labelledby={`${experience.id}-technologies`}>
          {experience.technologies.map((technology) => (
            <li key={technology}><TechnologyBadge technology={technology} /></li>
          ))}
        </ul>

        {experience.caseStudySlug ? (
          <Link className="timeline-case-link" href={localizedHref(`/projets/${experience.caseStudySlug}`, locale)}>
            {t.caseLink}<ArrowRight aria-hidden="true" size={15} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
