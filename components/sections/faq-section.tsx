import { type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import { Container } from "@/components/ui/container";

export function FaqSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].faq;
  const { faqItems } = getContent(locale);

  return (
    <section className="section-shell" aria-labelledby="faq-title">
      <Container className="faq-layout">
        <div>
          <p className="eyebrow">{t.label}</p>
          <h2 className="section-title" id="faq-title">{t.title}</h2>
          <p className="section-intro">
            {t.description}</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details className="faq-item" key={item.id} open={index === 0}>
              <summary>{item.question}</summary>
              <div className="faq-answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
