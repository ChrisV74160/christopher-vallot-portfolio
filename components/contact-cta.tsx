import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { localizedHref, type Locale } from "@/i18n/config";
import { projectMessages } from "@/i18n/messages/projects";

interface ContactCtaProps {
  description: string;
  eyebrow: string;
  headingId: string;
  title: string;
  locale?: Locale;
}

/** Shared compact conversion block; the contact flow remains the /contact page. */
export function ContactCta({
  description,
  eyebrow,
  headingId,
  title,
  locale = "fr",
}: ContactCtaProps) {
  return (
    <section className="contact-cta" aria-labelledby={headingId}>
      <div className="contact-cta__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={headingId}>{title}</h2>
        <p>{description}</p>
      </div>
      <ButtonLink href={localizedHref("/contact", locale)} variant="accent">
        {projectMessages[locale].contactProject}
        <ArrowUpRight aria-hidden="true" size={17} />
      </ButtonLink>
    </section>
  );
}
