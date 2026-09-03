"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef, useState } from "react";

import { profile } from "@/data/profile";

import { ButtonLink } from "./ui/button-link";
import { Container } from "./ui/container";
import { IdentityMark } from "./ui/identity-mark";

const sectionLinks = [
  { label: "Services", sectionId: "services" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Expertise", sectionId: "expertise" },
] as const;

const pageLinks = [
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

type SectionId = (typeof sectionLinks)[number]["sectionId"];

export type SiteHeaderProps = Omit<
  ComponentPropsWithoutRef<"header">,
  "children"
>;

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
  const pathname = usePathname();
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
    if (pathname !== "/" || !("IntersectionObserver" in window)) {
      return;
    }

    const sections = sectionLinks
      .map(({ sectionId }) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        const nextSection = sections.reduce<HTMLElement | null>((mostVisible, section) => {
          if (!mostVisible) {
            return visibility.get(section.id) ? section : null;
          }

          return (visibility.get(section.id) ?? 0) >
            (visibility.get(mostVisible.id) ?? 0)
            ? section
            : mostVisible;
        }, null);

        setObservedSection((nextSection?.id as SectionId | undefined) ?? null);
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setMenuState({ open: false, pathname });
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen, pathname]);

  const closeMenu = () => setMenuState({ open: false, pathname });
  const toggleMenu = () =>
    setMenuState((current) => ({
      open: !(current.pathname === pathname && current.open),
      pathname,
    }));
  const sectionHref = (sectionId: SectionId) =>
    pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
  const headerClasses = ["site-header", className].filter(Boolean).join(" ");

  const navigationLinks = (
    <>
      {sectionLinks.map(({ label, sectionId }) => {
        const active = pathname === "/" && observedSection === sectionId;

        return (
          <Link
            key={sectionId}
            aria-current={active ? "true" : undefined}
            className="nav-link"
            href={sectionHref(sectionId)}
            onClick={closeMenu}
          >
            {label}
          </Link>
        );
      })}
      {pageLinks.map(({ label, href }) => {
        const active = pathname === href;

        return (
          <Link
            key={href}
            aria-current={active ? "true" : undefined}
            className="nav-link"
            href={href}
            onClick={closeMenu}
          >
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <header
      className={headerClasses}
      data-menu-open={menuOpen}
      data-scrolled={scrolled}
      {...props}
    >
      <Container>
        <div className="nav-shell">
          <Link
            aria-label={`${profile.fullName} — Accueil`}
            className="wordmark"
            href="/"
            onClick={closeMenu}
          >
            <IdentityMark />
            <span className="wordmark-label">{profile.fullName}</span>
          </Link>

          <nav aria-label="Navigation principale" className="desktop-nav">
            {navigationLinks}
          </nav>

          <ButtonLink className="nav-cta" href="/contact" variant="accent">
            Discuter de votre projet
          </ButtonLink>

          <button
            ref={menuButtonRef}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="mobile-menu-button"
            onClick={toggleMenu}
            type="button"
          >
            {menuOpen ? (
              <X aria-hidden="true" focusable="false" size={20} />
            ) : (
              <Menu aria-hidden="true" focusable="false" size={20} />
            )}
          </button>
        </div>

        <nav
          aria-label="Navigation mobile"
          className="mobile-panel"
          hidden={!menuOpen}
          id="mobile-navigation"
        >
          {navigationLinks}
          <ButtonLink href="/contact" onClick={closeMenu} variant="accent">
            Discuter de votre projet
          </ButtonLink>
        </nav>
      </Container>
    </header>
  );
}

export default SiteHeader;
