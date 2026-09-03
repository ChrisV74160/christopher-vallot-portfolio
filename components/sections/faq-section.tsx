import { Container } from "@/components/ui/container";
import { faqItems } from "@/data/faq";

export function FaqSection() {
  return (
    <section className="section-shell" aria-labelledby="faq-title">
      <Container className="faq-layout">
        <div>
          <p className="eyebrow">Questions fréquentes</p>
          <h2 className="section-title" id="faq-title">Avant de démarrer.</h2>
          <p className="section-intro">
            Quelques repères sur les missions, les outils et la manière de cadrer
            une première intervention.
          </p>
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
