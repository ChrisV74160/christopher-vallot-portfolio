import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { metaMessages } from "@/i18n/messages/meta";
import type { Metadata } from "next";

import ContactSection from "@/components/sections/contact-section";



export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return pageMetadata(locale, { ...metaMessages[locale].contact, path: "/contact" });
}

export default async function ContactPage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  return (
    <div className="contact-page">

      <ContactSection locale={locale} standalone />
    </div>
  );
}
