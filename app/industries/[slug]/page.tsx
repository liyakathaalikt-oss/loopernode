import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { industries } from '@/content/industries';
import { generatePageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { CTABanner } from '@/components/sections/cta-banner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};

  return generatePageMetadata({
    title: `${industry.name} AI Data Services & Annotation | Loopernode`,
    description: industry.description,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  // Related Industries
  const relatedIndustries = industries.filter((i) => i.slug !== industry.slug).slice(0, 3);

  // Schema Generation for Service
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Service',
    name: `${industry.name} AI Data Services`,
    provider: {
      '@type': 'Organization',
      name: 'Loopernode',
      url: 'https://loopernode.in'
    },
    description: industry.description,
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
          <Link  href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <span>/</span>
          <Link  href="/industries" className="hover:text-indigo-400 transition-colors">Industries</Link>
          <span>/</span>
          <span className="text-slate-200">{industry.name}</span>
        </div>

        {/* Hero Section */}
        <div className="relative p-10 md:p-16 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] mb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 relative z-10">
            <div className="md:w-2/3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <industry.iconComponent className="w-8 h-8 text-indigo-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                AI Data Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{industry.name}</span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                {industry.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link  href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  Request {industry.name} Pilot <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/3 bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4">Why Loopernode for {industry.name}?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">Domain-expert annotation workforce</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">Strict regulatory & compliance protocols</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">Enterprise-grade security infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">99%+ Guaranteed SLA accuracy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  {industry.overview}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-8">Key Use Cases in {industry.name}</h2>
              <div className="space-y-6">
                {industry.useCases.map((useCase, idx) => (
                  <div key={idx} className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-3 text-indigo-300">{useCase.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xl font-bold text-white mb-6">Our Capabilities</h3>
              <ul className="space-y-4">
                <li>
                  <Link  href="/services/data-labeling" className="flex items-center justify-between text-slate-300 hover:text-indigo-400 transition-colors group">
                    <span>Data Annotation</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link  href="/services/data-collection" className="flex items-center justify-between text-slate-300 hover:text-indigo-400 transition-colors group">
                    <span>Data Collection</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link  href="/services/data-processing" className="flex items-center justify-between text-slate-300 hover:text-indigo-400 transition-colors group">
                    <span>Data Processing</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Need a custom dataset?</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Our solutions architects can design a custom data pipeline tailored specifically to your model&apos;s requirements.
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
            headline={`Scale your ${industry.name} AI initiatives today`}
            description="Partner with Loopernode to secure the high-quality training data your models need to perform safely in the real world."
            primaryCTA={{ label: 'Start Free Pilot', href: '/contact' }}
            secondaryCTA={{ label: 'View All Industries', href: '/industries' }}
          />
        </section>

        {/* Related Industries */}
        <section className="pt-16 border-t border-white/5">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Explore Other Industries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedIndustries.map((rel) => (
              <div key={rel.slug} className="p-6 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all flex flex-col justify-between group">
                <div>
                  <rel.iconComponent className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">{rel.name}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">{rel.description}</p>
                </div>
                <Link  href={`/industries/${rel.slug}`} className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 mt-6 pt-4 border-t border-white/5 w-full justify-between">
                  View Solutions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
