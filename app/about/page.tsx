/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata } from '@/lib/metadata';
import { 
  BrainCircuit, Eye, Lightbulb, ShieldCheck, Star, Users, 
  Zap, CheckCircle, Lock, TrendingUp, HeadphonesIcon, Target,
  Globe2, Building2, Languages, ArrowRight, Heart
} from 'lucide-react';

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { FeatureCard } from '@/components/sections/feature-card';
import { Timeline } from '@/components/sections/timeline';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';


import prisma from '@/lib/prisma';

export const metadata = generatePageMetadata({ 
  title: 'About Us | Loopernode', 
  description: 'Learn about Loopernode, our mission, vision, and the global team dedicated to providing high-quality AI training data for intelligent systems.', 
  path: '/about' 
});


export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const dbTeamMembers = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });

  const teamMembers = dbTeamMembers.length > 0 ? dbTeamMembers : [
    { name: "Placeholder", role: "Please add team members in the Admin CMS", bio: "", image: "", linkedinUrl: "" }
  ];
  const milestones = [
    { year: '2014', title: 'The Beginning', description: 'Loopernode was founded in a small university lab by researchers frustrated with the lack of quality training data.' },
    { year: '2016', title: 'First Enterprise Client', description: 'Secured our first Fortune 500 client, expanding our team to 50 dedicated data specialists.' },
    { year: '2018', title: 'Global Expansion', description: 'Opened offices in Europe and Asia to provide 24/7 localized support and multilingual datasets.' },
    { year: '2020', title: 'Proprietary Platform', description: 'Launched our proprietary annotation platform with automated QA and ML-assisted labeling tools.' },
    { year: '2021', title: 'ISO Certifications', description: 'Achieved ISO 27001 and SOC 2 Type II compliance, reinforcing our commitment to enterprise security.' },
    { year: '2023', title: '100M Datasets Milestone', description: 'Successfully delivered over 100 million precisely annotated data points across 30+ industries.' },
    { year: '2024', title: 'Generative AI Integration', description: 'Pioneered new methodologies for fine-tuning and aligning Large Language Models (LLMs) safely.' },
    { year: '2025', title: 'The Future', description: 'Continuing to lead the industry in ethical AI development and uncompromising data precision.' }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      
      {/* SECTION 1: Hero */}
      <section className="pt-20 md:pt-28 pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero 
          headline="Building the Foundation of"
          highlightedText="Ethical AI"
          description="We are a global team of data specialists, engineers, and researchers dedicated to democratizing access to high-quality AI training data."
          primaryCTA={{ label: 'Join Our Team', href: '/careers' }}
          secondaryCTA={{ label: 'Contact Us', href: '/contact' }}
        />
      </section>

      {/* SECTION 2: Company Story */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 bg-slate-800/50">
              {/* Team Image */}
              <div className="absolute inset-0 w-full h-full bg-slate-900">
                <Image
                  src="/images/about-team-latest.png"
                  alt="Loopernode Founding Team"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <SectionTitle 
              eyebrow="Our Story" 
              title="From a Small Lab to Global" 
              highlightedWord="Impact" 
              align="left" 
            />
            <div className="mt-8 space-y-6 text-slate-300 text-lg leading-relaxed max-w-2xl">
              <p>
                Founded in 2014, Loopernode began with a singular realization: the biggest bottleneck in machine learning wasn't algorithms or computing power, but the scarcity of high-quality, ethically sourced training data. What started in a cramped university research lab has rapidly grown into a global enterprise.
              </p>
              <p>
                Today, we partner with the world's most innovative technology companies, providing the critical data infrastructure necessary to train tomorrow's intelligent systems. We combine an expert global workforce with proprietary, secure annotation platforms to deliver unprecedented accuracy at massive scale.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 3: Mission & Vision */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StaggerItem>
            <div className="h-full p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-indigo-500/40 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-32 h-32 text-indigo-400" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-8 border border-indigo-500/30">
                  <Target className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight leading-tight mb-6">Our Mission</h3>
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                  "To democratize access to high-quality AI training data, enabling organizations of all sizes to build robust, ethical, and intelligent systems that solve real-world problems."
                </p>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="h-full p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Eye className="w-32 h-32 text-cyan-400" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-8 border border-cyan-500/30">
                  <Eye className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight leading-tight mb-6">Our Vision</h3>
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                  "A world where every AI system is built on ethically sourced, unbiased data, fostering a future where artificial intelligence amplifies human potential responsibly and securely."
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* SECTION 4: Values */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle 
            eyebrow="Core Principles" 
            title="The Values That" 
            highlightedWord="Drive Us" 
            align="center" 
          />
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          <FeatureCard icon={<Lightbulb className="w-6 h-6 text-indigo-400" />} title="Innovation" description="We constantly push the boundaries of data processing, developing new methodologies to tackle the most complex ML challenges." />
          <FeatureCard icon={<ShieldCheck className="w-6 h-6 text-indigo-400" />} title="Integrity" description="Ethical data sourcing and strict privacy controls are non-negotiable. We build AI foundation models the right way." />
          <FeatureCard icon={<Star className="w-6 h-6 text-indigo-400" />} title="Excellence" description="We pursue 99.9% accuracy as a baseline, not a goal. Quality is embedded in every step of our workflow." />
          <FeatureCard icon={<Users className="w-6 h-6 text-indigo-400" />} title="Collaboration" description="We operate as an extension of your team, fostering transparent communication and tight feedback loops." />
          <FeatureCard icon={<Lock className="w-6 h-6 text-indigo-400" />} title="Security" description="We protect your proprietary data with military-grade encryption, secure facilities, and stringent access controls." />
          <FeatureCard icon={<Zap className="w-6 h-6 text-indigo-400" />} title="Impact" description="We measure our success by the positive societal impact and technological advancements achieved by our clients' models." />
        </StaggerContainer>
      </section>

      {/* SECTION 5: Leadership Team */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 bg-slate-900/30">
        <FadeUp>
          <SectionTitle 
            eyebrow="Leadership" 
            title="Meet the" 
            highlightedWord="Experts" 
            align="center" 
          />
          <p className="text-center text-slate-400 max-w-2xl mx-auto mt-4 text-lg">
            Guided by industry veterans with deep expertise in machine learning, data science, and enterprise operations.
          </p>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {teamMembers.slice(0, 6).map((member: any, idx: number) => (
            <StaggerItem key={idx}>
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all text-center group">
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 p-1 mb-6 md:mb-8 transition-all duration-300">
                  {member.image ? (
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-3xl md:text-4xl font-bold text-white group-hover:bg-transparent transition-colors">
                      {member.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div className="relative pt-2">
                  <h4 className="text-xl font-bold text-white tracking-tight leading-snug mb-1 px-8">{member.name}</h4>
                  <p className="text-indigo-400 font-medium text-sm mb-5">{member.role}</p>
                  <p className="text-slate-400 text-sm">{member.bio || 'Driving innovation and strategic growth at Loopernode with over a decade of industry experience.'}</p>
                  {/* LinkedIn Icon */}
                  <a 
                    href={member.linkedin || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="absolute top-0 right-0 z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:-translate-y-1 transition-all duration-300 shadow-sm"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <LinkedinIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 6: Global Team */}
      <section className="py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-6">A Truly Global Workforce</h2>
              <p className="text-xl text-slate-300 font-light">
                Our diversity is our strength. We employ subject matter experts across the globe to ensure cultural nuance and linguistic accuracy in every dataset.
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StaggerItem className="text-center">
              <Users className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">2000+</div>
              <div className="text-slate-400 font-medium">Team Members</div>
            </StaggerItem>
            <StaggerItem className="text-center">
              <Globe2 className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-slate-400 font-medium">Countries Represented</div>
            </StaggerItem>
            <StaggerItem className="text-center">
              <Building2 className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">8</div>
              <div className="text-slate-400 font-medium">Global Offices</div>
            </StaggerItem>
            <StaggerItem className="text-center">
              <Languages className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">30+</div>
              <div className="text-slate-400 font-medium">Languages Supported</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 7: Timeline */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle 
            eyebrow="Our Journey" 
            title="A Decade of" 
            highlightedWord="Innovation" 
            align="center" 
          />
        </FadeUp>
        <div className="mt-20">
          <Timeline events={milestones} />
        </div>
      </section>

      {/* SECTION 8: Corporate Culture */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle 
            eyebrow="Life at Loopernode" 
            title="Our Corporate" 
            highlightedWord="Culture" 
            align="center" 
          />
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <StaggerItem>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-transparent border border-white/10 h-full">
              <BrainCircuit className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold text-white tracking-tight leading-tight mb-4">Continuous Learning</h3>
              <p className="text-slate-400 leading-relaxed">In the fast-paced world of AI, standing still is falling behind. We provide extensive training budgets, host internal hackathons, and encourage our team to stay at the cutting edge of ML research.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-900/40 to-transparent border border-white/10 h-full">
              <Users className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold text-white tracking-tight leading-tight mb-4">Diversity & Inclusion</h3>
              <p className="text-slate-400 leading-relaxed">Unbiased AI requires unbiased creators. We are deeply committed to building a diverse workforce that reflects the global community our models ultimately serve.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-violet-900/40 to-transparent border border-white/10 h-full">
              <Heart className="w-10 h-10 text-violet-400 mb-6" />
              <h3 className="text-xl font-bold text-white tracking-tight leading-tight mb-4">Work-Life Harmony</h3>
              <p className="text-slate-400 leading-relaxed">We believe sustainable innovation comes from rested, happy minds. We offer flexible working hours, remote-first options, and comprehensive wellness programs.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* SECTION 9: Why Clients Trust Us */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <SectionTitle 
              eyebrow="The Loopernode Standard" 
              title="Why Industry Leaders" 
              highlightedWord="Trust Us" 
              align="left" 
            />
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mt-6 mb-8">
              We don't just process data; we partner with you to ensure your AI initiatives succeed. Our enterprise-grade infrastructure and rigorous processes provide peace of mind for the world's most demanding technology teams.
            </p>
            <Link prefetch={false} href="/contact" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Speak with a data expert <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Data Security</h4>
                  <p className="text-sm text-slate-400">SOC 2 & ISO 27001 certified facilities and platforms.</p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Proven Track Record</h4>
                  <p className="text-sm text-slate-400">Over 10,000 successful projects delivered on time.</p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-violet-500/20 text-violet-400 shrink-0">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Flexible Scaling</h4>
                  <p className="text-sm text-slate-400">Rapidly scale your annotation workforce up or down.</p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
                  <HeadphonesIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Dedicated Support</h4>
                  <p className="text-sm text-slate-400">Assigned project managers ensure quality and communication.</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 10: CTA */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <FadeIn>
          <CTABanner 
            headline="Partner with Loopernode" 
            description="Ready to build the next generation of intelligent systems? Let's discuss how our data solutions can accelerate your AI roadmap."
            primaryCTA={{ label: 'Contact Sales', href: '/contact' }}
            secondaryCTA={{ label: 'Explore Careers', href: '/careers' }}
          />
        </FadeIn>
      </section>

    </main>
  );
}
