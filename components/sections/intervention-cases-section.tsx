import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { interventionCases } from "@/data/services";

export function InterventionCasesSection() {
  return (
    <section
      className="section-shell section-shell--compact"
      id="cas-intervention"
      aria-labelledby="intervention-cases-title"
    >
      <Container>
        <SectionHeading
          eyebrow="Cas d’intervention"
          headingId="intervention-cases-title"
          title="Vous avez les données. Reste à les rendre vraiment exploitables."
          description="Pour débloquer un reporting, un traitement ou une chaîne devenue difficile à maintenir ou à faire évoluer."
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
