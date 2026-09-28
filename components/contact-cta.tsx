import { MessageCircle } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { localizedHref, type Locale } from "@/i18n/config";
import { projectMessages } from "@/i18n/messages/projects";
import { ConversationArtwork } from "@/components/visuals/data-artwork";

interface ContactCtaProps {
  description: string;
  eyebrow: string;
  headingId: string;
  title: string;
  locale?: Locale;
  variant?: "default" | "similar";
}

/** Shared compact conversion block; the contact flow remains the /contact page. */
export function ContactCta({
  description,
  eyebrow,
  headingId,
  title,
  locale = "fr",
  variant = "default",
}: ContactCtaProps) {
  const titleBreak = variant === "similar" ? title.indexOf("?") + 1 : 0;
  return (
    <section className={`contact-cta${variant === "similar" ? " contact-cta--similar" : ""}`} aria-labelledby={headingId}>
      <div className="contact-cta__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={headingId}>{titleBreak > 0 ? <>{title.slice(0, titleBreak)}<span className="contact-cta__accent">{title.slice(titleBreak)}</span></> : title}</h2>
        <p>{description}</p>
      </div>
      <ButtonLink href={localizedHref("/contact", locale)} variant="accent">
        {projectMessages[locale].contactProject}
        <MessageCircle aria-hidden="true" size={18} />
      </ButtonLink>
      <ConversationArtwork className="cta-artwork" variant={variant} />
    </section>
  );
}
