/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import {
  Briefcase,
  MapPin,
  Clock,
  Heart,
  BookOpen,
  DollarSign,
  Users,
  Rocket,
  Globe,
  Code,
  Award,
  ArrowRight,
  Quote
} from 'lucide-react';

import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { FeatureCard } from '@/components/sections/feature-card';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';

export const metadata = generatePageMetadata({
  title: 'Careers | Join Our Team',
  description: 'Help us build the future of AI data infrastructure. Explore open positions, our culture, benefits, and remote-first career opportunities at Loopernode.',
  path: '/careers',
});


import prisma from '@/lib/prisma';


export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const dbJobs = await prisma.jobPosting.findMany({
    where: { status: 'OPEN' },
    orderBy: { order: 'asc' }
  });

  // Fallback if no jobs exist yet
  const jobs = dbJobs.length > 0 ? dbJobs : [
    { title: "No Open Roles", slug: "", department: "General", type: "Full-Time", location: "Remote", description: "We currently don't have any open positions, but check back soon!" }
  ];
  const whyUsItems = [
    {
      icon: <Rocket className="w-6 h-6 text-indigo-400" />,
      title: 'Innovation Culture',
      description: 'Work on cutting-edge synthetic data generation, multimodal annotation, and LLM fine-tuning pipelines. We encourage experimentation and creative problem solving.'
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      title: 'Global Impact',
      description: 'Your work powers high-stakes AI applications in healthcare, autonomous driving, robotics, and natural language processing across Fortune 500 enterprises worldwide.'
    },
    {
      icon: <Award className="w-6 h-6 text-violet-400" />,
      title: 'Growth Opportunities',
      description: 'Continuous mentorship, structured career progression tracks, conference sponsorships, and leadership pathways tailored to help you reach your full potential.'
    }
  ];

  const benefits = [
    {
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      title: 'Remote-First',
      description: 'Work from anywhere in the world with flexible remote setups and an annual home office equipment stipend.'
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      title: 'Health & Wellness',
      description: 'Comprehensive medical, dental, and vision insurance plus monthly wellness & gym membership allowances.'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
      title: 'Learning Budget',
      description: '$2,500 annual stipend for courses, technical books, certifications, and attending global industry conferences.'
    },
    {
      icon: <Clock className="w-6 h-6 text-emerald-400" />,
      title: 'Flexible Hours',
      description: 'Asynchronous work environment with flexible scheduling, trusting you to manage your time and deliver output.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-amber-400" />,
      title: 'Stock Options',
      description: 'Competitive compensation with meaningful equity grants so every team member shares in our long-term success.'
    },
    {
      icon: <Users className="w-6 h-6 text-violet-400" />,
      title: 'Team Events',
      description: 'Annual all-inclusive global company retreats, regional hackathons, and frequent virtual social hangouts.'
    }
  ];

  const getJobIcon = (title: string) => {
    if (title.includes('Engineer') || title.includes('Developer')) return <Code className="w-5 h-5 text-indigo-400" />;
    if (title.includes('Manager') || title.includes('Lead')) return <Award className="w-5 h-5 text-emerald-400" />;
    if (title.includes('QA')) return <Clock className="w-5 h-5 text-amber-400" />;
    if (title.includes('Business')) return <DollarSign className="w-5 h-5 text-pink-400" />;
    return <Briefcase className="w-5 h-5 text-cyan-400" />;
  };

  const cultureHighlights = [
    {
      quote: "Building cutting-edge AI infrastructure alongside world-class teammates who care deeply about quality and ethics is unlike anywhere else I've worked.",
      author: 'Elena Rostova',
      role: 'Principal ML Architect',
      tag: 'Technical Excellence'
    },
    {
      quote: "The autonomy and remote flexibility allow me to maintain a healthy work-life balance while delivering real impact to global enterprise clients.",
      author: 'Marcus Chen',
      role: 'Senior Data Operations Lead',
      tag: 'Work-Life Harmony'
    },
    {
      quote: "At Loopernode, your ideas are heard from day one. Continuous learning isn't just a buzzword here—it's built into our weekly cadence.",
      author: 'Sarah Jenkins',
      role: 'Full-Stack Lead Engineer',
      tag: 'Growth & Ownership'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      
      {/* SECTION 1: Hero */}
      <section className="pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="Join Our"
          highlightedText="Team"
          description="Help us build the next-generation AI data infrastructure. We are on a mission to empower machine learning teams around the world with pristine, high-impact datasets."
          primaryCTA={{ label: 'Explore Positions', href: '/careers#open-positions' }}
          secondaryCTA={{ label: 'Why Loopernode', href: '#why-us' }}
        />
      </section>

      {/* SECTION 2: Why Loopernode */}
      <section id="why-us" className="scroll-mt-24 py-20 md:py-28 container mx-auto px-4 border-b border-white/5 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
        <FadeUp>
          <SectionTitle
            eyebrow="WHY LOOPERNODE"
            title="Empowering You to"
            highlightedWord="Excel"
            description="Discover what makes working at Loopernode a truly unique, collaborative, and fulfilling career experience."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {whyUsItems.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 3: Benefits Grid */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="PERKS & BENEFITS"
            title="Everything You Need to"
            highlightedWord="Thrive"
            description="We offer competitive perks designed to support your work-life balance, health, financial future, and continuous professional growth."
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

      {/* SECTION 4: Open Positions */}
      <section id="open-positions" className="scroll-mt-24 py-20 md:py-28 container mx-auto px-4 border-b border-white/5 relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
        <FadeUp>
          <SectionTitle
            eyebrow="CAREER OPPORTUNITIES"
            title="Explore Open"
            highlightedWord="Positions"
            description="Find the role where you can make your biggest impact. We're actively hiring across engineering, operations, product, and growth."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {jobs.map((job) => (
            <StaggerItem key={job.slug}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {getJobIcon(job.title)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex items-center text-xs text-slate-400 gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>{job.location}</span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {job.description}
                  </p>
                </div>

                <Link prefetch={false}
                  href={`/careers/${job.slug}`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                >
                  <span>View Details & Apply</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 5: Life at Loopernode */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="LIFE AT LOOPERNODE"
            title="Inside Our"
            highlightedWord="Culture"
            description="Hear directly from our team members about what drives our culture and day-to-day collaboration."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {cultureHighlights.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between relative">
                <div>
                  <Quote className="w-8 h-8 text-indigo-500/30 mb-4" />
                  <p className="text-slate-300 text-base italic leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>
                <div>
                  <span className="inline-block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                    {item.tag}
                  </span>
                  <h4 className="text-white font-bold text-lg">{item.author}</h4>
                  <p className="text-slate-400 text-sm">{item.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 6: CTABanner */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <FadeIn>
          <CTABanner
            headline="Don't see your role?"
            description="We are always looking for extraordinary talent. Send us your resume and tell us how you can contribute to building the future of AI data."
            primaryCTA={{ label: 'Send Open Application', href: '/contact' }}
            secondaryCTA={{ label: 'Contact Hiring Team', href: '/contact' }}
          />
        </FadeIn>
      </section>

    </main>
  );
}

