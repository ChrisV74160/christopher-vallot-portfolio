import { type Locale } from "@/i18n/config";
import { sectionMessages } from "@/i18n/messages/sections";
import { getContent } from "@/i18n/content";
import ContactForm from "@/components/contact-form";

export function ContactSection({ locale = "fr" }: { locale?: Locale }) {
  const t = sectionMessages[locale].contact;
  const { profile } = getContent(locale);

  return (
    <section
      id="contact"
      className="contact-section section-shell--compact"
      aria-labelledby="contact-heading"
    >
      <div className="container-shell">
        <div className="contact-panel">
          <div className="contact-copy">
            <span className="eyebrow">{t.label}</span>
            <h2 id="contact-heading">{t.title}</h2>
            <p>
              {t.description}</p>

            <div className="contact-direct" role="group" aria-label={t.direct}>
              <a href={`mailto:${profile.contact.email}`}>
                {profile.contact.email}
              </a>
              <a
                href={profile.contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.linkedinProfile} ${profile.fullName}${t.newTab}`}
              >
                LinkedIn
              </a>
            </div>
          </div>

          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
