import { localizedHref, type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import {
  BarChart3,
  DatabaseZap,
  ScanSearch,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ServiceId } from "@/types/content";

const icons = {
  "business-intelligence": BarChart3,
  "analyse-donnees": ScanSearch,
  "data-quality": ShieldCheck,
  automatisation: Workflow,
  "integration-consolidation": DatabaseZap,
} satisfies Record<ServiceId, LucideIcon>;

export function ServicesSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].services;
  const { missionFormats, services } = getContent(locale);

  return (
    <section className="section-shell" id="services" aria-labelledby="services-title">
      <Container>
        <SectionHeading
          eyebrow={t.label}
          headingId="services-title"
          title={t.title}
          description={t.description}
        />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = icons[service.id];
            return (
              <Reveal className="service-card" delay={index * 0.05} key={service.id}>
                <div className="service-icon">
                  <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                </div>
                <h3>{service.title}</h3>
                <div className="service-block">
                  <span className="service-block-label">{t.problem}</span>
                  <p>{service.problem}</p>
                </div>
                <div className="service-block">
                  <span className="service-block-label">{t.intervention}</span>
                  <p>{service.intervention}</p>
                </div>
                <ul className="service-deliverables" aria-label={t.deliverables}>
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mission-formats">
          <div className="mission-formats__heading">
            <div>
              <p className="eyebrow">{t.formats}</p>
              <h3>{t.formatsTitle}</h3>
            </div>
            <ButtonLink href={localizedHref("/contact", locale)} variant="secondary">
              {t.contact}</ButtonLink>
          </div>
          <ol className="mission-format-list">
            {missionFormats.map((format, index) => (
              <li className="mission-format-item" key={format.id}>
                <span>0{index + 1}</span>
                <strong>{format.title}</strong>
                <p>{format.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
