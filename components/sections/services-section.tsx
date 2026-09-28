import { type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import { ChartNoAxesCombined, Combine, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import type { ServiceId } from "@/types/content";
import { ServicesArtwork } from "@/components/visuals/data-artwork";

const icons = {
  "business-intelligence": ChartNoAxesCombined,
  "data-quality": ShieldCheck,
  automatisation: Workflow,
  "integration-consolidation": Combine,
} satisfies Record<ServiceId, LucideIcon>;

export function ServicesSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].services;
  const { services } = getContent(locale);
  return (
    <section className="section-shell" id="services" aria-labelledby="services-title">
      <Container>
        <SectionHeading eyebrow={t.label} headingId="services-title" title={t.title} description={t.description} />
        <ServicesArtwork locale={locale} />
        <div className="service-grid">
          {services.map((service) => {
            const Icon = icons[service.id];
            return (
              <article className="service-card" key={service.id}>
                <div className="service-icon"><Icon aria-hidden="true" size={32} strokeWidth={1.65} /></div>
                <h3>{service.title}</h3>
                <p className="service-problem">{service.problem}</p>
                <p>{service.intervention}</p>
                <p className="service-outcome"><strong>{t.outcome}</strong>{service.outcome}</p>
                <ul className="service-deliverables" aria-label={t.technologies}>
                  {service.technologies.map((technology) => (
                    <li key={technology}><TechnologyIcon name={technology} size={18} />{technology}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
