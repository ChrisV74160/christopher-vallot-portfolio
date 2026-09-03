import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";

interface ContactCtaProps {
  description: string;
  eyebrow: string;
  headingId: string;
  title: string;
}

/** Shared compact conversion block; the contact flow remains the /contact page. */
export function ContactCta({
  description,
  eyebrow,
  headingId,
  title,
}: ContactCtaProps) {
  return (
    <section className="contact-cta" aria-labelledby={headingId}>
      <div className="contact-cta__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={headingId}>{title}</h2>
        <p>{description}</p>
      </div>
      <ButtonLink href="/contact" variant="accent">
        Discuter de votre projet
        <ArrowUpRight aria-hidden="true" size={17} />
      </ButtonLink>
    </section>
  );
}
