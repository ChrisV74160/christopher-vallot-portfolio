import { type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function InterventionCasesSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].interventionCases;
  const { interventionCases } = getContent(locale);

  return (
    <section
      className="section-shell section-shell--compact"
      id="cas-intervention"
      aria-labelledby="intervention-cases-title"
    >
      <Container>
        <SectionHeading
          eyebrow={t.label}
          headingId="intervention-cases-title"
          title={t.title}
          description={t.description}
        />
        <ol className="intervention-list">
          {interventionCases.map((item, index) => (
            <Reveal
              as="li"
              className="intervention-item"
              delay={index * 0.05}
              key={item.id}
            >
              <span className="intervention-item__index">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
