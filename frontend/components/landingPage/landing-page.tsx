"use client";

import { PublicHeader } from "@/components/landingPage/public-header";
import { HeroSection } from "@/components/landingPage/hero-section";
import { HowItWorksSection } from "@/components/landingPage/how-it-works-section";
import { StatsSection } from "@/components/landingPage/stats-section";
import { TestimonialsSection } from "@/components/landingPage/testimonials-section";
import { FaqSection } from "@/components/landingPage/faq-section";
import { FinalCtaSection } from "@/components/landingPage/final-cta-section";
import { PublicFooter } from "@/components/landingPage/public-footer";
import { BenefitsSection } from "./benefits-section";
import { MethodologyPreviewSection } from "./methoodologyPreview";
import { TechSignature } from "./TechnicalSignature";
import { DashboardPreviewSection } from "../dashboard/dashboard-overview";

/**
 * LANDING PAGE ARCHITECTURE
 * -------------------------
 * Theme: Modern Eco-Tech / Deep Zinc
 * Primary Color: Emerald-500
 * Font Strategy: Black (Sans) + Mono (Technical Labels)
 */

export function LandingPage() {
  return (
    // Updated background to zinc-950 to ensure no light-mode "leaks" between sections
    <div className="min-h-screen bg-zinc-950 antialiased selection:bg-emerald-500/30">
      {/* Fixed Navigation Layer */}
      <PublicHeader />

      <main className="relative flex flex-col w-full overflow-x-hidden">
        <HeroSection />
        <DashboardPreviewSection/>
        <HowItWorksSection />

        <BenefitsSection />

        <MethodologyPreviewSection/>

        <StatsSection />

        <TestimonialsSection />

        <FaqSection />

        <FinalCtaSection />
        <TechSignature/>
      </main>

      <PublicFooter />
    </div>
  );
}
