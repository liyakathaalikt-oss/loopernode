import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';
import { solutions } from '@/content/solutions';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Enterprise AI Solutions | Human-in-the-loop & Workforce | Loopernode',
  description: 'Discover Loopernode\'s enterprise structural solutions for scaling AI data operations, including Dedicated AI Workforces and Human-in-the-Loop pipelines.',
  path: '/solutions',
});

export default function SolutionsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      
      {/* SECTION 1: Hero */}
      <section className="pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="Operational Architecture for"
          highlightedText="Enterprise AI"
          description="Move beyond raw data. We provide the structural solutions required to operationalize, scale, and maintain your machine learning pipelines in production."
          primaryCTA={{ label: 'Explore Solutions', href: '#solutions-grid' }}
          secondaryCTA={{ label: 'Consult an Architect', href: '/contact' }}
        />
      </section>

      {/* SECTION 2: Solutions Grid */}
      <section id="solutions-grid" className="scroll-mt-24 py-20 md:py-28 container mx-auto px-4 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
        
        <FadeUp>
          <SectionTitle
            eyebrow="STRUCTURAL CAPABILITIES"
            title="How We Power Your"
            highlightedWord="Pipelines"
            description="Whether you need to instantly scale a dedicated annotation team or integrate real-time human QA into your active learning loops, we provide the enterprise infrastructure."
            align="center"
          />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <FadeUp key={solution.slug} delay={index * 0.1}>
              <div className="h-full p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] hover:border-violet-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                  <solution.iconComponent className="w-48 h-48 text-violet-400 -rotate-12 translate-x-1/4 -translate-y-1/4" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <solution.iconComponent className="w-8 h-8 text-violet-400 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {solution.title}
                  </h3>
                  
                  <p className="text-slate-400 text-base leading-relaxed mb-8">
                    {solution.description}
                  </p>

                  <div className="space-y-4 mb-10 flex-grow">
                    {solution.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-violet-500/70 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Link prefetch={false} 
                    href={`/solutions/${solution.slug}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/50 text-white rounded-xl font-semibold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                  >
                    View Architecture <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* SECTION 3: Bottom CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <FadeIn>
            <CTABanner
              headline="Ready to scale your AI operations?"
              description="Speak with our solutions architecture team to design a custom data pipeline or dedicated workforce model tailored to your exact specifications."
              primaryCTA={{ label: 'Contact Architecture Team', href: '/contact' }}
              secondaryCTA={{ label: 'Explore Industries', href: '/industries' }}
            />
          </FadeIn>
        </div>
      </section>

    </main>
  );
}

