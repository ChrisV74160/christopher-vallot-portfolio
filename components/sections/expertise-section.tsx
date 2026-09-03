import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExpertiseDomains } from "@/components/visuals/expertise-domains";

export function ExpertiseSection() {
  return (
    <section className="section-shell" id="expertise" aria-labelledby="expertise-title">
      <Container>
        <SectionHeading
          eyebrow="Expertise"
          headingId="expertise-title"
          title="Quatre expertises complémentaires, au service de vos usages."
          description="Chaque domaine relie un besoin concret aux pratiques et technologies adaptées."
        />
        <Reveal>
          <ExpertiseDomains />
        </Reveal>
      </Container>
    </section>
  );
}
