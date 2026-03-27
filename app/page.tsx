import { BenefitsStrip } from "@/components/marketing/benefits-strip";
import { FAQSection } from "@/components/marketing/faq-section";
import { FeaturesGrid } from "@/components/marketing/features-grid";
import { FinalCTASection } from "@/components/marketing/final-cta-section";
import { Header } from "@/components/marketing/header";
import { HeroSection } from "@/components/marketing/hero-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { SocialProofBar } from "@/components/marketing/social-proof-bar";
import { StatsGrid } from "@/components/marketing/stats-grid";
import { StepsSection } from "@/components/marketing/steps-section";
import { StickyMobileCTA } from "@/components/marketing/sticky-mobile-cta";
import { TemplateFooter } from "@/components/marketing/template-footer";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { TrustBar } from "@/components/marketing/trust-bar";
import { WhyFreeSection } from "@/components/marketing/why-free-section";
import { GlowOrb } from "@/components/ui/glow-orb";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Reveal } from "@/components/ui/reveal";

export default function Page() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#040714] text-white">
      <ScrollProgress />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GlowOrb className="left-[-8rem] top-[-8rem] h-[24rem] w-[24rem] bg-cyan-400/20" />
        <GlowOrb className="right-[-6rem] top-[8rem] h-[22rem] w-[22rem] bg-fuchsia-500/20" />
        <GlowOrb className="bottom-[-10rem] left-[20%] h-[26rem] w-[26rem] bg-blue-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.16),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(168,85,247,0.16),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,128,255,0.18),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <Header />

      <main className="relative z-10 pb-24 lg:pb-0">
        <HeroSection />

        <Reveal>
          <SocialProofBar />
        </Reveal>

        <Reveal delay={0.03}>
          <TrustBar />
        </Reveal>

        <Reveal delay={0.05}>
          <StatsGrid />
        </Reveal>

        <Reveal delay={0.06}>
          <FeaturesGrid />
        </Reveal>

        <Reveal delay={0.08}>
          <BenefitsStrip />
        </Reveal>

        <Reveal delay={0.1}>
          <StepsSection />
        </Reveal>

        <Reveal delay={0.12}>
          <PricingSection />
        </Reveal>

        <Reveal delay={0.14}>
          <TestimonialsSection />
        </Reveal>

        <Reveal delay={0.16}>
          <WhyFreeSection />
        </Reveal>

        <Reveal delay={0.18}>
          <FinalCTASection />
        </Reveal>

        <Reveal delay={0.2}>
          <FAQSection />
        </Reveal>
      </main>

      <TemplateFooter />
      <StickyMobileCTA />
    </div>
  );
}