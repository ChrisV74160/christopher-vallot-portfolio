import { type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import { Container } from "@/components/ui/container";

export function ProofStrip({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].proof;
  const { experiences, projects } = getContent(locale);
const organizationCount = new Set(experiences.map(({ company }) => company)).size;

const proofItems = [
  {
    value: experiences.length,
    label: t.experienceCount,
    subtitle: t.experienceSub,
  },
  {
    value: organizationCount,
    label: t.organizationCount,
    subtitle: t.organizationSub,
  },
  {
    value: 4,
    label: t.domainCount,
    subtitle: t.domainSub,
  },
  {
    value: projects.length,
    label: t.caseCount,
    subtitle: t.caseSub,
  },
];



  return (
    <section className="proof-rail" aria-label={t.aria}>
      <Container className="proof-rail-inner">
        <div className="proof-rail-item proof-rail-item--intro">
          <span className="proof-system-label">{t.label}</span>
          <strong>{t.title}</strong>
          <span>{t.description}</span>
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
          <span>{t.organizations}</span>
          <strong>CNAV · Harmonie Mutuelle · Banque de France · Apside</strong>
        </p>
      </Container>
    </section>
  );
}
