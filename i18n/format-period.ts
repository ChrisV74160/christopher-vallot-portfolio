import type { Locale } from "./config";

/** Month precision matches the CV. Dates are shared, only their display is translated. */
export function formatExperiencePeriod(start: string, end: string | null, locale: Locale) {
  const format = (month: string) => new Intl.DateTimeFormat(locale, {
    month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${month}-01T00:00:00Z`));
  return end ? `${format(start)} — ${format(end)}` : `${locale === "fr" ? "Depuis" : "Since"} ${format(start)}`;
}
