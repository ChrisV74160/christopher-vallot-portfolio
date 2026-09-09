"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef, useState } from "react";

import icon from "@/app/icon.png";
import { profile } from "@/data/profile";
import { localizedHref, stripLocale, type Locale } from "@/i18n/config";
import { chromeMessages } from "@/i18n/messages/chrome";

import { SitePreferences } from "./site-preferences";
import { ButtonLink } from "./ui/button-link";
import { Container } from "./ui/container";

const sectionLinks = [
  { labelKey: "services", sectionId: "services" },
  { labelKey: "projects", sectionId: "realisations" },
  { labelKey: "expertise", sectionId: "expertise" },
] as const;

const pageLinks = [
  { labelKey: "about", href: "/a-propos" },
  { labelKey: "contact", href: "/contact" },
] as const;

type SectionId = (typeof sectionLinks)[number]["sectionId"];

export type SiteHeaderProps = Omit<
  ComponentPropsWithoutRef<"header">,
  "children"
> & { locale: Locale };

export function SiteHeader({ locale, className, ...props }: SiteHeaderProps) {
  const pathname = usePathname();
  const routePath = stripLocale(pathname);
  const messages = chromeMessages[locale];
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [observedSection, setObservedSection] = useState<SectionId | null>(null);
  const [menuState, setMenuState] = useState({ open: false, pathname });

  const menuOpen = menuState.pathname === pathname && menuState.open;

  useEffect(() => {
    const updateScrolledState = () => setScrolled(window.scrollY > 12);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    if (routePath !== "/" || !("IntersectionObserver" in window)) return;

    const sections = sectionLinks
      .map(({ sectionId }) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        const nextSection = sections.reduce<HTMLElement | null>(
          (mostVisible, section) => {
            if (!mostVisible) return visibility.get(section.id) ? section : null;
            return (visibility.get(section.id) ?? 0) > (visibility.get(mostVisible.id) ?? 0)
              ? section
              : mostVisible;
          },
          null,
        );

        setObservedSection((nextSection?.id as SectionId | undefined) ?? null);
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname, routePath]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuState({ open: false, pathname });
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen, pathname]);

  const closeMenu = () => setMenuState({ open: false, pathname });
  const toggleMenu = () => setMenuState((current) => ({
    open: !(current.pathname === pathname && current.open),
    pathname,
  }));

  const sectionHref = (sectionId: SectionId) =>
    routePath === "/" ? `#${sectionId}` : localizedHref(`/#${sectionId}`, locale);

  const headerClasses = ["site-header", "site-header--preferences", className]
    .filter(Boolean)
    .join(" ");

  const navigationLinks = (
    <>
      {sectionLinks.map(({ labelKey, sectionId }) => (
        <Link
          key={sectionId}
          aria-current={routePath === "/" && observedSection === sectionId ? "true" : undefined}
          className="nav-link"
          href={sectionHref(sectionId)}
          onClick={closeMenu}
        >
          {messages[labelKey]}
        </Link>
      ))}
      {pageLinks.map(({ labelKey, href }) => (
        <Link
          key={href}
          aria-current={routePath === href ? "page" : undefined}
          className="nav-link"
          href={localizedHref(href, locale)}
          onClick={closeMenu}
        >
          {messages[labelKey]}
        </Link>
      ))}
    </>
  );

  return (
    <header className={headerClasses} data-menu-open={menuOpen} data-scrolled={scrolled} {...props}>
      <Container>
        <div className="nav-shell">
          <Link
            aria-label={`${profile.fullName} — ${messages.home}`}
            className="wordmark"
            href={localizedHref("/", locale)}
            onClick={closeMenu}
          >
            <Image src={icon} alt="" aria-hidden="true" className="wordmark-icon" width={40} height={40} priority />
            <span className="wordmark-label">{profile.fullName}</span>
          </Link>

          <nav aria-label={messages.primaryNavigation} className="desktop-nav">
            {navigationLinks}
          </nav>

          <ButtonLink className="nav-cta" href={localizedHref("/contact", locale)} variant="accent">
            {messages.discussProject}
          </ButtonLink>

          <SitePreferences locale={locale} />

          <button
            ref={menuButtonRef}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? messages.closeMenu : messages.openMenu}
            className="mobile-menu-button"
            onClick={toggleMenu}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" focusable="false" size={20} /> : <Menu aria-hidden="true" focusable="false" size={20} />}
          </button>
        </div>

        <nav aria-label={messages.mobileNavigation} className="mobile-panel" hidden={!menuOpen} id="mobile-navigation">
          {navigationLinks}
          <ButtonLink href={localizedHref("/contact", locale)} onClick={closeMenu} variant="accent">
            {messages.discussProject}
          </ButtonLink>
          <SitePreferences locale={locale} variant="expanded" />
        </nav>
      </Container>
    </header>
  );
}

export default SiteHeader;
