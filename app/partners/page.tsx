/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import {
  Handshake,
  Building2,
  Globe,
  Zap,
  Award,
  BookOpen,
  DollarSign,
  Megaphone,
  Code,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Layers
} from 'lucide-react';

import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { FeatureCard } from '@/components/sections/feature-card';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';

export const metadata = generatePageMetadata({
  title: 'Technology Partners & Ecosystem',
  description: 'Collaborate with Loopernode to build next-generation AI solutions. Explore our technology, integration, and channel partnership programs.',
  path: '/partners',
});

export default function PartnersPage() {
  const partnershipTypes = [
    {
      icon: <Building2 className="w-6 h-6 text-indigo-400" />,
      title: 'Technology Partners',
      description: 'Integrate Loopernode\'s dataset pipeline and labeling engines directly into your AI/ML platform, cloud workspace, or data storage infrastructure.',
      highlights: ['Deep API Integration', 'Co-engineered Solutions', 'Joint Technical Roadmap']
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: 'Integration Partners',
      description: 'Build seamless workflows, custom connectors, and automation tools between your enterprise software suite and our annotation ecosystem.',
      highlights: ['SDK Access & Docs', 'Developer Support', 'Turnkey Connectors']
    },
    {
      icon: <Globe className="w-6 h-6 text-violet-400" />,
      title: 'Channel Partners',
      description: 'Resell, co-sell, or consult on Loopernode AI data services as part of your digital transformation and enterprise AI consulting practices.',
      highlights: ['Competitive Margins', 'Deal Registration', 'Sales Enablement']
    }
  ];

  const benefits = [
    {
      icon: <Megaphone className="w-6 h-6 text-indigo-400" />,
      title: 'Co-Marketing',
      description: 'Joint webinars, case studies, press releases, and co-branded event sponsorships to expand market reach.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-amber-400" />,
      title: 'Revenue Share',
      description: 'Attractive margin structures, referral incentives, and recurring joint revenue streams for qualified deals.'
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: 'Technical Support',
      description: 'Dedicated partner engineering team, priority API integration support, and 24/7 technical escalation channels.'
    },
    {
      icon: <Rocket className="w-6 h-6 text-pink-400" />,
      title: 'Early Access',
      description: 'Preview access to upcoming platform capabilities, proprietary ML models, and beta dataset releases.'
    },
    {
      icon: <Handshake className="w-6 h-6 text-emerald-400" />,
      title: 'Joint Solutions',
      description: 'Create packaged enterprise offerings combining Loopernode data capabilities with your software stack.'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-violet-400" />,
      title: 'Training & Certification',
      description: 'Comprehensive sales and technical enablement, official partner badges, and developer workshops.'
    }
  ];

  const featuredPartners = [
    {
      name: 'NeuralPath Labs',
      category: 'AI Platform Partner',
      icon: <Code className="w-8 h-8 text-indigo-400" />,
      description: 'Leading AI Research & LLM Fine-Tuning Platform integrating Loopernode ground-truth datasets.'
    },
    {
      name: 'DataForge Systems',
      category: 'Cloud Infrastructure',
      icon: <Building2 className="w-8 h-8 text-cyan-400" />,
      description: 'Enterprise Cloud Data Warehousing & Automated ETL Infrastructure for high-volume pipelines.'
    },
    {
      name: 'Prism Analytics',
      category: 'Computer Vision',
      icon: <Award className="w-8 h-8 text-violet-400" />,
      description: 'Advanced Computer Vision & Predictive Analytics Suite powered by Loopernode annotated media.'
    },
    {
      name: 'Vanguard ML',
      category: 'Robotics & Autonomy',
      icon: <Rocket className="w-8 h-8 text-emerald-400" />,
      description: 'Autonomous Systems & Sensor Fusion Data Orchestration platform driving next-gen mobility.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Apply',
      icon: <Handshake className="w-6 h-6 text-indigo-400" />,
      description: 'Submit your partner application online. Tell us about your company, technical stack, and joint strategic goals.'
    },
    {
      step: '02',
      title: 'Evaluate',
      icon: <Award className="w-6 h-6 text-cyan-400" />,
      description: 'Meet with our partnership team to evaluate technical synergy, co-marketing opportunities, and business alignment.'
    },
    {
      step: '03',
      title: 'Launch',
      icon: <Rocket className="w-6 h-6 text-violet-400" />,
      description: 'Execute agreement, complete partner onboarding & technical certification, and go to market together.'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      
      {/* SECTION 1: Hero */}
      <section className="pt-20 md:pt-28 pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="Technology"
          highlightedText="Partners"
          description="Join our global partnership ecosystem. We collaborate with leading cloud providers, AI platforms, and technology innovators to deliver integrated data solutions at scale."
          primaryCTA={{ label: 'Become a Partner', href: '#become-a-partner' }}
          secondaryCTA={{ label: 'Partnership Programs', href: '#partnership-types' }}
        />
      </section>

      {/* SECTION 2: Partnership Types */}
      <section id="partnership-types" className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
        <FadeUp>
          <SectionTitle
            eyebrow="PARTNERSHIP PROGRAMS"
            title="Tailored for Your"
            highlightedWord="Business"
            description="Whether you build software platforms, provide advisory services, or deliver enterprise solutions, we have a partnership model built for you."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {partnershipTypes.map((type, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                    {type.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <ul className="space-y-2">
                    {type.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 3: Partner Benefits Grid */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="PARTNER ADVANTAGES"
            title="Why Partner with"
            highlightedWord="Loopernode"
            description="Unlock joint growth opportunities, dedicated technical support, and exclusive access to next-generation AI data capabilities."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {benefits.map((benefit, idx) => (
            <FeatureCard
              key={idx}
              index={idx}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 4: Featured Partners */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
        <FadeUp>
          <SectionTitle
            eyebrow="OUR ECOSYSTEM"
            title="Trusted by Industry"
            highlightedWord="Leaders"
            description="We partner with top-tier technology companies driving the next wave of artificial intelligence."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {featuredPartners.map((partner, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300">
                  {partner.icon}
                </div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                  {partner.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {partner.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {partner.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 5: Become a Partner */}
      <section id="become-a-partner" className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="HOW IT WORKS"
            title="Three Simple Steps to"
            highlightedWord="Partner"
            description="Our streamlined onboarding process gets your organization up and running quickly."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {processSteps.map((step, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 relative group">
                <div className="text-4xl font-extrabold text-white/10 font-heading mb-4 group-hover:text-indigo-500/20 transition-colors">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 6: CTABanner */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <FadeIn>
          <CTABanner
            headline="Ready to partner with us?"
            description="Join our ecosystem today and start delivering superior AI solutions to your customers."
            primaryCTA={{ label: 'Apply for Partnership', href: '/contact' }}
            secondaryCTA={{ label: 'Schedule a Call', href: '/contact' }}
          />
        </FadeIn>
      </section>

    </main>
  );
}
