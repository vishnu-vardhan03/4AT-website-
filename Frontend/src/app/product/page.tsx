import type { Metadata } from "next";

import ProductHero from "@/components/product/ProductHero";
import { Nav } from "@/components/layout/MainNav";
import AgentsSection from "@/components/product/AgentsSection";
import CapabilitiesSection from "@/components/product/CapabilitiesSection";
import { Footer } from "@/components/layout/Footer";
import GlimpseSection from "@/components/product/GlimpseSection";
import HowItWorksSection from "@/components/product/HowItWorksSection";
import HybridSection from "@/components/product/HybridSection";
import IntegrationsSection from "@/components/product/IntegrationsSection";
import {
  FaqSection,
  PricingSection,
  SecuritySection,
} from "@/components/product/OtherSections";
import WhySection from "@/components/product/WhySection";
import MouseGlow from "@/components/ui/MouseGlow";
import Reveal from "@/components/ui/Reveal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProductCTA from "@/components/product/ProductCta";

export const metadata: Metadata = {
  title: "4AT AI | Finance Automation Platform",
  description:
    "Finance-native AI for reconciliation, compliance, and reporting. Purpose-built for your numbers.",
};

export default function ProductPage() {
  return (
    <main>
      <ScrollProgress />
      <MouseGlow />
      <Nav />
      <ProductHero />

      <SectionWrapper>
        <Reveal>
          <GlimpseSection />
        </Reveal>
      </SectionWrapper>

      <SectionWrapper>
        <Reveal>
          <CapabilitiesSection />
        </Reveal>
      </SectionWrapper>

      <SectionWrapper>
        <Reveal>
          <WhySection />
        </Reveal>
      </SectionWrapper>

      <SectionWrapper>
        <Reveal>
          <AgentsSection />
        </Reveal>
      </SectionWrapper>

      <SectionWrapper>
        <Reveal>
          <HowItWorksSection />
        </Reveal>
      </SectionWrapper>

      <SectionWrapper>
        <Reveal>
          <IntegrationsSection />
        </Reveal>
      </SectionWrapper>

      <SectionWrapper>
        <Reveal>
          <PricingSection />
        </Reveal>
      </SectionWrapper>

      <SectionWrapper>
        <Reveal>
          <SecuritySection />
        </Reveal>
      </SectionWrapper>

      <SectionWrapper>
        <Reveal>
          <HybridSection />
        </Reveal>
      </SectionWrapper>

      <FaqSection />
      <ProductCTA />
      <Footer />
    </main>
  );
}
