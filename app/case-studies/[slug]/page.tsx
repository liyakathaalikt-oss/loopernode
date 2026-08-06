/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { caseStudies } from '@/content/case-studies';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { SectionTitle } from '@/components/sections/section-title';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-wrapper';
import { CheckCircle2, ArrowLeft, Building2, Target, Lightbulb } from 'lucide-react';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${study.title} | Loopernode Case Study`,
    description: study.challenge,
    openGraph: {
      title: `${study.title} - ${study.client}`,
      description: study.challenge,
      type: 'article',
      images: study.image ? [study.image] : undefined,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Case Studies', href: '/case-studies' },
    { label: study.title, href: `/case-studies/${study.slug}` },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      {/* Top Header / Hero Area */}
      <section className="pt-24 md:pt-32 pb-16 border-b border-white/5 relative overflow-hidden">
        {/* Ambient glow background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          {/* 1. Breadcrumb */}
          <Breadcrumb items={breadcrumbs} className="mb-8" />

          {/* Back link */}
          <Link prefetch={false}
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Case Studies</span>
          </Link>

          {/* 2. Hero Area with Industry Tag, Title, Client Name */}
          <FadeUp>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold tracking-wide border border-indigo-500/20 uppercase">
                {study.industry}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-sm text-slate-300 font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                {study.client}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-slate-50 mb-8 leading-tight">
              {study.title}
            </h1>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08]">
              <div>
                <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Client</p>
                <p className="text-sm md:text-base font-semibold text-slate-100">{study.client}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Industry</p>
                <p className="text-sm md:text-base font-semibold text-slate-100">{study.industry}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Impact Deliverables</p>
                <p className="text-sm md:text-base font-semibold text-indigo-400">{study.results.length} Key Results</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Status</p>
                <p className="text-sm md:text-base font-semibold text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Delivered
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-5xl space-y-12">
        {/* 3. Challenge Section (glass card) */}
        <FadeUp>
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-50">
                The Challenge
              </h2>
            </div>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              {study.challenge}
            </p>
          </div>
        </FadeUp>

        {/* 4. Solution Section (glass card) */}
        <FadeUp delay={0.1}>
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-50">
                Loopernode's Solution
              </h2>
            </div>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              {study.solution}
            </p>
          </div>
        </FadeUp>

        {/* 5. Results Section (numbered list with check icons) */}
        <div className="pt-6">
          <FadeUp>
            <SectionTitle
              eyebrow="MEASURABLE IMPACT"
              title="Key Business"
              highlightedWord="Results"
              description="Quantifiable breakthroughs achieved through Loopernode's dedicated data engineering pipeline."
              align="left"
              className="mb-10 max-w-full"
            />
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {study.results.map((resultText, index) => {
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <StaggerItem key={index} className="h-full">
                  <div className="h-full backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 flex items-start gap-5 hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-300 group">
                    {/* Numbered badge */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <span className="text-2xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                        {formattedIndex}
                      </span>
                    </div>

                    {/* Check icon & content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 text-indigo-400">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Outcome Met</span>
                      </div>
                      <p className="text-slate-200 text-base md:text-lg font-medium leading-relaxed">
                        {resultText}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* 6. CTA Section */}
        <div className="pt-12">
          <FadeIn>
            <CTABanner
              headline="Ready to achieve similar breakthroughs?"
              description="Partner with Loopernode to accelerate your AI datasets, custom annotation guidelines, and model performance."
              primaryCTA={{ label: 'Get Started', href: '/contact' }}
              secondaryCTA={{ label: 'View All Case Studies', href: '/case-studies' }}
            />
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
