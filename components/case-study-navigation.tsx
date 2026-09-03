"use client";

import { useEffect, useState } from "react";

export interface CaseNavigationItem {
  id: string;
  index: string;
  label: string;
}

interface CaseStudyNavigationProps {
  items: readonly CaseNavigationItem[];
}

/**
 * Lightweight scrollspy for case-study anchors. IntersectionObserver and one
 * requestAnimationFrame per scroll frame keep the state accurate during smooth
 * anchor navigation without introducing a scroll-animation dependency.
 */
export function CaseStudyNavigation({ items }: CaseStudyNavigationProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const itemIds = new Set(items.map(({ id }) => id));
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);

      if (itemIds.has(hash)) {
        setActiveId(hash);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let observer: IntersectionObserver | undefined;
    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      const header = document.querySelector<HTMLElement>(".site-header");
      const anchorLine = (header?.getBoundingClientRect().height ?? 76) + 32;
      let currentSection = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top > anchorLine + 2) {
          break;
        }

        currentSection = section;
      }

      if (currentSection) {
        setActiveId(currentSection.id);
      }
    };

    const scheduleActiveUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const observeSections = () => {
      observer?.disconnect();

      const header = document.querySelector<HTMLElement>(".site-header");
      const topOffset = Math.round((header?.getBoundingClientRect().height ?? 76) + 28);

      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(scheduleActiveUpdate, {
          rootMargin: `-${topOffset}px 0px -58% 0px`,
          threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
        });

        sections.forEach((section) => observer?.observe(section));
      }

      scheduleActiveUpdate();
    };

    observeSections();

    const header = document.querySelector<HTMLElement>(".site-header");
    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(observeSections) : null;

    if (header) {
      resizeObserver?.observe(header);
    }
    window.addEventListener("scroll", scheduleActiveUpdate, { passive: true });

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleActiveUpdate);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [items]);

  return (
    <nav className="case-study-nav" aria-label="Sommaire de l’étude de cas">
      {items.map(({ id, index, label }) => {
        const active = id === activeId;

        return (
          <a
            aria-current={active ? "location" : undefined}
            href={`#${id}`}
            key={id}
            onClick={() => setActiveId(id)}
          >
            <span aria-hidden="true">{index}</span>
            <span>{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
