import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { metaMessages } from "@/i18n/messages/meta";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { DecisionSection } from "@/components/sections/decision-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { InterventionCasesSection } from "@/components/sections/intervention-cases-section";
import { JourneyCtaSection } from "@/components/sections/journey-cta-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ProofStrip } from "@/components/sections/proof-strip";
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
      <ProofStrip locale={locale} />
      <ServicesSection locale={locale} />
      <InterventionCasesSection locale={locale} />
      <DecisionSection locale={locale} />
      <ProjectsSection locale={locale} />
      <ExpertiseSection locale={locale} />
      <AboutSection locale={locale} />
      <JourneyCtaSection locale={locale} />
      <FaqSection locale={locale} />
      <ContactSection locale={locale} />
    </div>
  );
}
