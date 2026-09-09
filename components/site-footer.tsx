import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { profile } from "@/data/profile";
import { localizedHref, type Locale } from "@/i18n/config";
import { chromeMessages } from "@/i18n/messages/chrome";

import { Container } from "./ui/container";
import { IdentityMark } from "./ui/identity-mark";

const navigationLinks = [
  { labelKey: "home", href: "/" },
  { labelKey: "services", href: "/#services" },
  { labelKey: "projects", href: "/#realisations" },
  { labelKey: "expertise", href: "/#expertise" },
  { labelKey: "about", href: "/a-propos" },
  { labelKey: "contact", href: "/contact" },
] as const;

export type SiteFooterProps = Omit<
  ComponentPropsWithoutRef<"footer">,
  "children"
> & { locale: Locale };

export function SiteFooter({ locale, className, ...props }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const footerClasses = ["footer", className].filter(Boolean).join(" ");
  const messages = chromeMessages[locale];

  return (
    <footer className={footerClasses} {...props}>
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link aria-label={`${profile.fullName} — ${messages.home}`} className="wordmark" href={localizedHref("/", locale)}>
              <IdentityMark />
              <span className="wordmark-label">{profile.fullName}</span>
            </Link>
            <p>{messages.summary}</p>
          </div>

          <nav aria-label={messages.footerNavigation} className="footer-column">
            <h2>{messages.navigationHeading}</h2>
            <ul className="footer-links">
              {navigationLinks.map(({ labelKey, href }) => (
                <li key={href}>
                  <Link href={localizedHref(href, locale)}>{messages[labelKey]}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-column">
            <h2>{messages.contactHeading}</h2>
            <ul className="footer-links">
              <li><a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></li>
              <li>
                <a href={profile.contact.linkedinUrl} rel="noreferrer" target="_blank">
                  LinkedIn<span className="sr-only">{messages.newTab}</span>
                </a>
              </li>
              <li><a download href={profile.contact.cvUrl}>{messages.downloadCv}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} {profile.fullName}. {messages.rightsReserved}</span>
          <nav aria-label={messages.legalNavigation}>
            <Link href={localizedHref("/mentions-legales", locale)}>{messages.legalNotice}</Link>
            {" · "}
            <Link href={localizedHref("/politique-confidentialite", locale)}>{messages.privacyPolicy}</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

export default SiteFooter;
