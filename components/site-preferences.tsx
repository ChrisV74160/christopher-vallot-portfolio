"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

import { localeCookieName, localizedHref, type Locale } from "@/i18n/config";
import { chromeMessages } from "@/i18n/messages/chrome";

const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function persistLocale(nextLocale: Locale) {
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${localeCookieName}=${nextLocale}; Path=/; Max-Age=${LANGUAGE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  } catch {
    // Navigation remains available when browser preferences block cookies.
  }
}

export type SitePreferencesProps = {
  locale: Locale;
  variant?: "compact" | "expanded";
};

export function SitePreferences({ locale, variant = "compact" }: SitePreferencesProps) {
  const pathname = usePathname();
  const messages = chromeMessages[locale];

  function languageDestination(nextLocale: Locale) {
    return localizedHref(
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
      nextLocale,
    );
  }

  function selectLanguage(event: MouseEvent<HTMLAnchorElement>, nextLocale: Locale) {
    const destination = languageDestination(nextLocale);
    event.currentTarget.href = destination;
    persistLocale(nextLocale);

    // Native navigation keeps the locale layout and modified clicks consistent.
  }

  return (
    <div className={`site-preferences site-preferences--${variant}`}>
      <div className="site-languages" role="group" aria-label={messages.language}>
        {(["fr", "en"] as const).map((nextLocale, index) => (
          <span className="site-language-item" key={nextLocale}>
            {index > 0 ? <span className="site-language-divider" aria-hidden="true">|</span> : null}
            <a
              className="site-language-link"
              href={localizedHref(pathname, nextLocale)}
              hrefLang={nextLocale}
              lang={nextLocale}
              aria-current={locale === nextLocale ? "page" : undefined}
              aria-label={nextLocale === "fr" ? messages.french : messages.english}
              onClick={(event) => selectLanguage(event, nextLocale)}
              onFocus={(event) => { event.currentTarget.href = languageDestination(nextLocale); }}
              onPointerEnter={(event) => { event.currentTarget.href = languageDestination(nextLocale); }}
            >
              {nextLocale.toUpperCase()}
            </a>
          </span>
        ))}
      </div>

    </div>
  );
}
