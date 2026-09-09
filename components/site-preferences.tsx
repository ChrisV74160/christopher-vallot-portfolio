"use client";

import { Check, Contrast } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type MouseEvent } from "react";

import { localeCookieName, localizedHref, type Locale } from "@/i18n/config";
import { chromeMessages } from "@/i18n/messages/chrome";

export const COLOR_MODE_STORAGE_KEY = "portfolio-colors";
export const COLOR_MODE_ATTRIBUTE = "data-color-mode";
const COLOR_MODE_EVENT = "portfolio-color-mode-change";
const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type ColorMode = "accessible" | "default";

function persistLocale(nextLocale: Locale) {
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${localeCookieName}=${nextLocale}; Path=/; Max-Age=${LANGUAGE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  } catch {
    // Navigation remains available when browser preferences block cookies.
  }
}

function getColorMode(): ColorMode {
  return document.documentElement.getAttribute(COLOR_MODE_ATTRIBUTE) === "accessible"
    ? "accessible"
    : "default";
}

function getServerColorMode(): ColorMode {
  return "default";
}

/** Keep every displayed switch and other open tabs in sync with the same mode. */
function subscribeColorMode(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== COLOR_MODE_STORAGE_KEY && event.key !== null) return;
    document.documentElement.setAttribute(
      COLOR_MODE_ATTRIBUTE,
      event.newValue === "accessible" ? "accessible" : "default",
    );
    onChange();
  };

  window.addEventListener(COLOR_MODE_EVENT, onChange);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(COLOR_MODE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export type SitePreferencesProps = {
  locale: Locale;
  variant?: "compact" | "expanded";
};

export function SitePreferences({ locale, variant = "compact" }: SitePreferencesProps) {
  const pathname = usePathname();
  const messages = chromeMessages[locale];
  const colorMode = useSyncExternalStore(subscribeColorMode, getColorMode, getServerColorMode);
  const accessibleColors = colorMode === "accessible";

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

    // Locale layouts own <html>. Native navigation reruns the pre-paint colour
    // bootstrap, including on a language change, and preserves modified clicks.
  }

  function toggleColors() {
    const nextMode: ColorMode = accessibleColors ? "default" : "accessible";
    document.documentElement.setAttribute(COLOR_MODE_ATTRIBUTE, nextMode);

    try {
      localStorage.setItem(COLOR_MODE_STORAGE_KEY, nextMode);
    } catch {
      // The current-page setting also works without persistent browser storage.
    }

    window.dispatchEvent(new Event(COLOR_MODE_EVENT));
  }

  return (
    <div className={`site-preferences site-preferences--${variant}`} role="group" aria-label={messages.preferences}>
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

      <button
        className="site-color-toggle"
        type="button"
        aria-label={messages.accessibleColors}
        aria-pressed={accessibleColors}
        title={messages.accessibleColors}
        onClick={toggleColors}
      >
        <Contrast size={17} aria-hidden="true" focusable="false" />
        <span className="site-color-label">{messages.accessibleColors}</span>
        <span className="site-color-state" aria-hidden="true">
          {accessibleColors ? <Check size={12} focusable="false" /> : <span className="site-color-state__empty" />}
        </span>
        <span className="site-color-state-label" aria-hidden="true">
          {accessibleColors ? messages.colorsEnabled : messages.colorsDisabled}
        </span>
      </button>
    </div>
  );
}
