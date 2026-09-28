import { type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import ContactForm from "@/components/contact-form";
import { DashboardArtwork } from "@/components/visuals/data-artwork";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

export function ContactSection({ locale = "fr", standalone = false }: { locale?: Locale; standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const t = sectionMessages[locale].contact;
  const { profile } = getContent(locale);

  return (
    <section
      id="contact"
      className={standalone ? "contact-section contact-section--standalone" : "contact-section section-shell--compact"}
      aria-labelledby="contact-heading"
    >
      <div className="container-shell">
        <div className="contact-panel">
          <div className="contact-copy">
            <span className="eyebrow">{t.label}</span>
            <Heading id="contact-heading">{t.title.split("Data & BI").map((part, index) => index === 0 ? part : <span key={index}><span className="contact-title-accent">Data &amp; BI</span>{part}</span>)}</Heading>
            <p>
              {t.description}</p>

            <div className="contact-direct" role="group" aria-label={t.direct}>
              <a href={`mailto:${profile.contact.email}`}>
                <Mail size={19} aria-hidden="true" />
                <span>{profile.contact.email}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href={profile.contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.linkedinProfile} ${profile.fullName}${t.newTab}`}
              >
                <FaLinkedinIn size={19} aria-hidden="true" />
                <span>LinkedIn</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <DashboardArtwork className="contact-artwork" variant="contact" />
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
