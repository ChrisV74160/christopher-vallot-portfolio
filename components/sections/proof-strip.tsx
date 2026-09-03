import { Container } from "@/components/ui/container";
import { experiences } from "@/data/profile";
import { projects } from "@/data/projects";

const organizationCount = new Set(experiences.map(({ company }) => company)).size;

const proofItems = [
  {
    value: experiences.length,
    label: "expériences",
    subtitle: "Depuis 2019, dans des contextes exigeants",
  },
  {
    value: organizationCount,
    label: "organisations",
    subtitle: "Les organisations citées dans le CV",
  },
  {
    value: 4,
    label: "domaines d’intervention",
    subtitle: "Sources · qualité · processus · pilotage",
  },
  {
    value: projects.length,
    label: "études de cas",
    subtitle: "Fidèles au parcours, sans métrique ajoutée",
  },
];

export function ProofStrip() {
  return (
    <section className="proof-rail" aria-label="Périmètre d’intervention">
      <Container className="proof-rail-inner">
        <div className="proof-rail-item proof-rail-item--intro">
          <span className="proof-system-label">Telemetry / profile</span>
          <strong>Le parcours, en signaux vérifiables.</strong>
          <span>Repères issus du parcours et des domaines présentés</span>
        </div>
        {proofItems.map((item) => (
          <div className="proof-rail-item proof-rail-item--metric" key={item.label}>
            <div className="proof-rail-metric">
              <strong className="proof-rail-value">
                {String(item.value).padStart(2, "0")}
              </strong>
              <span className="proof-rail-label">{item.label}</span>
            </div>
            <span>{item.subtitle}</span>
            <span className="proof-signal" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <i key={`${item.label}-${index}`} />
              ))}
            </span>
          </div>
        ))}
        <p className="proof-organizations">
          <span>Expériences professionnelles :</span>
          <strong>CNAV · Harmonie Mutuelle · Banque de France · Apside</strong>
        </p>
      </Container>
    </section>
  );
}
