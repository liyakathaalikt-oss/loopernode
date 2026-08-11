/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/content/case-studies';
import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-wrapper';
import { ArrowRight, CheckCircle2, Database, Users, ShieldCheck, Layers, Building2 } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Enterprise Case Studies',
  description: 'Discover how leading AI enterprises partner with Loopernode for high-precision data collection, annotation, and model validation datasets.',
  path: '/case-studies',
});


export const revalidate = 0;
// Opt out of Next.js static caching to ensure CMS updates are instant

export default function CaseStudiesPage() {
  const featuredStudy = caseStudies[0];
  const statsData = [
    { value: '500M+', label: 'Data Points Processed', icon: <Database className="w-6 h-6 text-indigo-400" /> },
    { value: '200+', label: 'Enterprise Clients', icon: <Users className="w-6 h-6 text-cyan-400" /> },
    { value: '99.7%', label: 'Annotation Accuracy', icon: <ShieldCheck className="w-6 h-6 text-violet-400" /> },
    { value: '6', label: 'Core Industries', icon: <Layers className="w-6 h-6 text-indigo-400" /> },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      {/* 1. Hero Section */}
      <section className="pt-20 md:pt-28 pb-10 border-b border-white/5">
        <Hero
          headline="Enterprise Case"
          highlightedText="Studies"
          description="Real-world results from AI organizations leveraging Loopernode's scalable data pipeline, custom annotation teams, and rigorous quality control."
          primaryCTA={{ label: 'Schedule Consultation', href: '/contact' }}
          secondaryCTA={{ label: 'Explore Services', href: '/services' }}
        />
      </section>

      {/* 2. Featured Case Study */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="FEATURED SUCCESS STORY"
            title="Setting New Benchmarks in"
            highlightedWord="AI Scale"
            description="Explore how our dedicated expert teams deliver transformative results for market leaders."
            align="center"
          />
        </FadeUp>

        <FadeUp delay={0.2} className="mt-12">
          <div className="relative rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 items-center">
              {/* Image Placeholder / Visual */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900 border border-white/10 flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_70%)]" />
                <div className="relative z-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                    {featuredStudy.industry}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug mb-2">{featuredStudy.client}</h3>
                  <p className="text-xs text-slate-400 max-w-xs">{featuredStudy.results[0]}</p>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-full">
                  Featured Case Study
                </div>
              </div>

              {/* Text Column */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
                    {featuredStudy.industry}
                  </span>
                  <span className="text-sm text-slate-400">• {featuredStudy.client}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold font-heading text-slate-50 tracking-tight leading-tight mb-4 group-hover:text-indigo-300 transition-colors">
                  {featuredStudy.title}
                </h3>

                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  {featuredStudy.challenge}
                </p>

                <div className="space-y-3 mb-8">
                  {featuredStudy.results.slice(0, 2).map((res, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <Link prefetch={false}
                    href={`/case-studies/${featuredStudy.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold shadow-lg hover:brightness-110 transition-all duration-300 group/btn"
                  >
                    <span>Read {featuredStudy.client} Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* 3. All Case Studies Grid (3 columns) */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="PORTFOLIO OF IMPACT"
            title="All Case"
            highlightedWord="Studies"
            description="Browse our complete archive of customer success stories across specialized domains."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16">
          {caseStudies.map((study) => (
            <StaggerItem key={study.slug} className="h-full">
              <div className="h-full flex flex-col justify-between p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-300 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                      {study.industry}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {study.results.length} Outcomes
                    </span>
                  </div>

                  <p className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">
                    {study.client}
                  </p>
                  <h3 className="text-xl font-bold font-heading text-slate-100 tracking-tight leading-snug mb-4 group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {study.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {study.challenge}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {study.results.length} Key Results
                  </span>
                  <Link prefetch={false}
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group/link"
                  >
                    <span>Read {study.client} Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. Stats Section */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="PROVEN PERFORMANCE"
            title="Impact by the"
            highlightedWord="Numbers"
            description="Our quantitative track record speaks to our ability to deliver quality at global volume."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {statsData.map((stat, idx) => (
            <StaggerItem key={idx}>
              <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] text-center hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300 group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-400 font-medium text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 5. CTA Section */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <FadeIn>
          <CTABanner
            headline="Ready to see similar results?"
            description="Transform your model performance with Loopernode's custom data collection and high-fidelity labeling."
            primaryCTA={{ label: 'Schedule a Consultation', href: '/contact' }}
            secondaryCTA={{ label: 'Explore Services', href: '/services' }}
          />
        </FadeIn>
      </section>
    </main>
  );
}
