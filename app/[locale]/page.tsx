import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { metaMessages } from "@/i18n/messages/meta";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  return pageMetadata(locale, { ...metaMessages[locale].home, path: "/" });
}

export default async function HomePage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  return (
    <div className="landing-page">
      <HeroSection locale={locale} />
      <ServicesSection locale={locale} />
      <ProjectsSection locale={locale} />
      <AboutSection locale={locale} />
      <ContactSection locale={locale} />
    </div>
  );
}
