import ContactForm from "@/components/contact-form";
import { profile } from "@/data/profile";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-section section-shell--compact"
      aria-labelledby="contact-heading"
    >
      <div className="container-shell">
        <div className="contact-panel">
          <div className="contact-copy">
            <span className="eyebrow">Contact</span>
            <h2 id="contact-heading">Vous avez un projet data ? Parlons-en.</h2>
            <p>
              Décrivez le point de blocage, vos contraintes et le résultat
              attendu. Je vous répondrai avec une première lecture du besoin.
            </p>

            <div className="contact-direct" aria-label="Contacts directs">
              <a href={`mailto:${profile.contact.email}`}>
                {profile.contact.email}
              </a>
              <a
                href={profile.contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Profil LinkedIn de ${profile.fullName} (nouvel onglet)`}
              >
                LinkedIn
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
