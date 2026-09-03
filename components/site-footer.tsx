import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { profile } from "@/data/profile";

import { Container } from "./ui/container";
import { IdentityMark } from "./ui/identity-mark";

const navigationLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Expertise", href: "/#expertise" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export type SiteFooterProps = Omit<
  ComponentPropsWithoutRef<"footer">,
  "children"
>;

export function SiteFooter({ className, ...props }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const footerClasses = ["footer", className].filter(Boolean).join(" ");

  return (
    <footer className={footerClasses} {...props}>
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              aria-label={`${profile.fullName} — Accueil`}
              className="wordmark"
              href="/"
            >
              <IdentityMark />
              <span className="wordmark-label">{profile.fullName}</span>
            </Link>
            <p>{profile.shortSummary}</p>
          </div>

          <nav aria-label="Navigation du pied de page" className="footer-column">
            <h2>Navigation</h2>
            <ul className="footer-links">
              {navigationLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-column">
            <h2>Me contacter</h2>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${profile.contact.email}`}>
                  {profile.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.linkedinUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>
              <li>
                <a download href={profile.contact.cvUrl}>
                  Télécharger mon CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {currentYear} {profile.fullName}. Tous droits réservés.
          </span>
          <nav aria-label="Informations légales">
            <Link href="/mentions-legales">Mentions légales</Link>
            {" · "}
            <Link href="/politique-confidentialite">
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

export default SiteFooter;
