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

export default function HomePage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <ProofStrip />
      <ServicesSection />
      <InterventionCasesSection />
      <DecisionSection />
      <ProjectsSection />
      <ExpertiseSection />
      <AboutSection />
      <JourneyCtaSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
