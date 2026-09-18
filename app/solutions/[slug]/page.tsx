import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { solutions } from '@/content/solutions';
import { generatePageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Boxes } from 'lucide-react';
import { CTABanner } from '@/components/sections/cta-banner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutions.map((sol) => ({ slug: sol.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return {};

  return generatePageMetadata({
    title: `${solution.title} | Enterprise AI Infrastructure | Loopernode`,
    description: solution.description,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  // Schema Generation for Service
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Service',
    name: `${solution.title}`,
    provider: {
      '@type': 'Organization',
      name: 'Loopernode',
      url: 'https://loopernode.in'
    },
    description: solution.description,
    areaServed: 'Worldwide',
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200 pt-28">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 pb-20">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-slate-400 mb-8 gap-2">
          <Link  href="/" className="hover:text-violet-400 transition-colors">Home</Link>
          <span>/</span>
          <Link  href="/solutions" className="hover:text-violet-400 transition-colors">Solutions</Link>
          <span>/</span>
          <span className="text-slate-200">{solution.title}</span>
        </div>

        {/* Hero Section */}
        <div className="relative p-10 md:p-16 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] mb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 relative z-10">
            <div className="md:w-2/3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <solution.iconComponent className="w-8 h-8 text-violet-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {solution.title}
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                {solution.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link  href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                  Consult an Architect <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/3 bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4">Structural Benefits</h3>
              <ul className="space-y-4">
                {solution.benefits.slice(0, 4).map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Operational Overview</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  {solution.overview}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-8">Architectural Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {solution.features.map((feature, idx) => (
                  <div key={idx} className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/30 transition-colors">
                    <Boxes className="w-6 h-6 text-violet-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3 text-violet-300">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-violet-900/40 to-black border border-violet-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Ready to scale?</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Our solutions architecture team is ready to analyze your ML pipeline and design a custom operational model.
              </p>
              <Link  href="/contact" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="mb-20">
          <CTABanner
            headline={`Deploy ${solution.title} Today`}
            description="Partner with Loopernode to operationalize your AI pipelines with unparalleled security, speed, and accuracy."
            primaryCTA={{ label: 'Start Free Pilot', href: '/contact' }}
            secondaryCTA={{ label: 'View All Solutions', href: '/solutions' }}
          />
        </section>

      </div>
    </main>
  );
}
