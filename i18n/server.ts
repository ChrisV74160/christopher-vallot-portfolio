import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";

export type LocalePageProps = { params: Promise<{ locale: string }> };

export function requireLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}
