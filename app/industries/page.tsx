import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';
import { industries } from '@/content/industries';
import { ArrowRight, Box } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Industries We Serve | Enterprise AI Data Solutions',
  description: 'Discover how Loopernode provides specialized AI data annotation and collection services tailored for Healthcare, Automotive, Retail, Finance, and more.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      
      {/* SECTION 1: Hero */}
      <section className="pt-20 md:pt-28 pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="AI Data Solutions by"
          highlightedText="Industry"
          description="We provide highly specialized, domain-expert data annotation and collection tailored to the unique regulatory and technical requirements of your specific vertical."
          primaryCTA={{ label: 'Explore Our Work', href: '#industries-grid' }}
          secondaryCTA={{ label: 'Talk to an Expert', href: '/contact' }}
        />
      </section>

      {/* SECTION 2: Industries Grid */}
      <section id="industries-grid" className="scroll-mt-24 py-20 md:py-28 container mx-auto px-4 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
        
        <FadeUp>
          <SectionTitle
            eyebrow="DOMAIN EXPERTISE"
            title="Tailored Solutions for Every"
            highlightedWord="Sector"
            description="From strictly regulated HIPAA compliance in healthcare to the massive scale of autonomous vehicle perception, we have the domain expertise to handle it."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {industries.map((industry) => (
            <StaggerItem key={industry.slug}>
              <div className="h-full p-8 rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] hover:border-indigo-500/40 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all duration-300 flex flex-col group">
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <industry.iconComponent className="w-6 h-6 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all">
                    {industry.name}
                  </h3>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {industry.description}
                </p>

                <div className="space-y-3 mb-8">
                  {industry.useCases.slice(0, 2).map((useCase, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Box className="w-4 h-4 text-indigo-500/70 flex-shrink-0 mt-0.5" />
                      <span>{useCase.title}</span>
                    </div>
                  ))}
                </div>

                <Link prefetch={false} 
                  href={`/industries/${industry.slug}`}
                  className="mt-auto inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                >
                  <span>Explore {industry.name} Solutions</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 3: Bottom CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <FadeIn>
            <CTABanner
              headline="Don't see your specific industry?"
              description="We build custom data pipelines for highly niche use cases across dozens of emerging verticals. Contact our solutions architecture team to discuss your specific data requirements."
              primaryCTA={{ label: 'Request Custom Solution', href: '/contact' }}
              secondaryCTA={{ label: 'View Case Studies', href: '/case-studies' }}
            />
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
