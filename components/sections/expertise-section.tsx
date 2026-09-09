import { type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExpertiseDomains } from "@/components/visuals/expertise-domains";

export function ExpertiseSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].expertise;

  return (
    <section className="section-shell" id="expertise" aria-labelledby="expertise-title">
      <Container>
        <SectionHeading
          eyebrow={t.label}
          headingId="expertise-title"
          title={t.title}
          description={t.description}
        />
        <Reveal>
          <ExpertiseDomains locale={locale} />
        </Reveal>
      </Container>
    </section>
  );
}
