import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  { title: "Comprendre", text: "Objectifs métier, utilisateurs, décisions attendues et contraintes." },
  { title: "Auditer", text: "Sources disponibles, structure, qualité, accès et dépendances." },
  { title: "Concevoir", text: "KPI, règles de gestion, modèle de données et architecture des traitements." },
  { title: "Développer", text: "Transformation, analyse, dashboard ou automatisation selon le besoin." },
  { title: "Valider", text: "Contrôles fonctionnels, rapprochements et échanges avec les utilisateurs." },
  { title: "Transmettre", text: "Livraison, documentation et prise en main pour rendre la solution durable." },
];

export function MethodSection() {
  return (
    <section className="section-shell" aria-labelledby="method-title">
      <Container>
        <SectionHeading
          eyebrow="Méthode"
          headingId="method-title"
          title="Comment se déroule une mission ?"
          description="Un cadre lisible, avec des validations régulières, pour éviter les zones grises entre besoin métier et réalisation technique."
        />
        <ol className="method-list">
          {steps.map((step, index) => (
            <Reveal as="li" className="method-item" delay={index * 0.05} key={step.title}>
              <span className="method-item-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
