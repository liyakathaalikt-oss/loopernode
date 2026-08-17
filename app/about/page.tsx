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

import { teamMembers as hardcodedTeam } from '@/content/team';

import prisma from '@/lib/prisma';

export const metadata = generatePageMetadata({ 
  title: 'About Us | Loopernode', 
  description: 'Learn about Loopernode, our mission, vision, and the global team dedicated to providing high-quality AI training data for intelligent systems.', 
  path: '/about' 
});


export const dynamic = "force-dynamic";

const parseImageUrl = (url: string) => {
  if (!url) return url;
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  return url;
};

export default async function AboutPage() {
  const dbTeamMembers = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });

  const teamMembers = dbTeamMembers.length > 0 ? dbTeamMembers : hardcodedTeam;
  const milestones = [
    { year: '2014', title: 'The Beginning', description: 'Founded by AI researchers determined to solve the industry-wide bottleneck of low-fidelity training data.' },
    { year: '2016', title: 'First Enterprise Client', description: 'Partnered with our first Fortune 150 client, scaling our operations to 100 specialized data experts.' },
    { year: '2023', title: '100M Datasets Milestone', description: 'Crossed the threshold of delivering 100 million meticulously verified ground-truth data points globally.' },
    { year: '2024', title: 'Generative AI Integration', description: 'Engineered proprietary RLHF pipelines to safely align and fine-tune next-generation Large Language Models.' },
    { year: '2025', title: 'The Future', description: 'Aggressively expanding our multimodal capabilities to power the incoming wave of embodied AI and robotics.' }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      
      {/* SECTION 1: Hero */}
      <section className="pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero 
          headline="Building the Foundation of"
          highlightedText="Ethical AI"
          description="We unite world-class data specialists, engineers, and researchers to construct the critical data infrastructure that powers the next generation of safe, reliable, and equitable AI systems."
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
              title="From a Small Lab to Global" 
              highlightedWord="Impact" 
              align="left" 
            />
            <div className="mt-8 space-y-6 text-slate-300 text-lg leading-relaxed max-w-2xl">
              <p>
                Founded in 2014, Loopernode emerged from a critical realization within a small university research lab: the true bottleneck in modern machine learning wasn't a lack of computing power or sophisticated algorithms, but the severe scarcity of high-fidelity, ethically sourced training data.
              </p>
              <p>
                Today, we operate as a global enterprise partnering with the world's most ambitious AI laboratories and Fortune 150 companies. By converging an elite global workforce with proprietary, bank-grade secure annotation platforms, we provide the foundational intelligence layer required to build safe and scalable AI models.
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
                  "To engineer the world's most accurate and ethically sourced ground truth, accelerating the deployment of safe, robust, and transformative artificial intelligence across every major industry."
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
                  "A future where AI systems operate seamlessly and equitably, grounded in training data that authentically captures the full diversity, nuance, and complexity of human experience."
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
                      <Image 
                        src={parseImageUrl(member.image)} 
                        alt={member.name} 
                        fill
                        sizes="(max-width: 768px) 160px, 160px"
                        className="object-cover object-center"
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
                    href={member.linkedinUrl ? (member.linkedinUrl.startsWith('http') ? member.linkedinUrl : `https://${member.linkedinUrl}`) : "#"}
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
              <div className="text-4xl font-bold text-white mb-2">500+</div>
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
              <p className="text-slate-400 leading-relaxed">Stagnation is anathema in the AI sector. We actively sponsor advanced certifications, fund internal R&D incubators, and mandate dedicated time for our teams to explore bleeding-edge ML literature.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-900/40 to-transparent border border-white/10 h-full">
              <Users className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold text-white tracking-tight leading-tight mb-4">Diversity & Inclusion</h3>
              <p className="text-slate-400 leading-relaxed">Equitable algorithms demand equitable origins. We systematically recruit across underrepresented demographics to dismantle echo chambers and build a workforce as varied as the data we process.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-violet-900/40 to-transparent border border-white/10 h-full">
              <Heart className="w-10 h-10 text-violet-400 mb-6" />
              <h3 className="text-xl font-bold text-white tracking-tight leading-tight mb-4">Work-Life Harmony</h3>
              <p className="text-slate-400 leading-relaxed">Burnout destroys innovation. We enforce mandatory downtime, champion asynchronous remote-first collaboration, and provide aggressive wellness subsidies to keep our top-tier talent performing optimally.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* SECTION 9: Why Clients Trust Us */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <SectionTitle 
              title="Why Industry Leaders" 
              highlightedWord="Trust Us" 
              align="left" 
            />
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mt-6 mb-8">
              We transcend the role of a traditional data vendor to become an integrated extension of your MLOps team. By combining bank-grade infrastructure with transparent, highly agile workflows, we de-risk the data pipeline for the world's most ambitious technology organizations.
            </p>
            <Link  href="/contact" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
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
                  <h4 className="font-bold text-white mb-2">Data Security & Confidentiality</h4>
                  <p className="text-sm text-slate-400">Air-gapped annotation environments and legally binding non-disclosures to secure your core intellectual property.</p>
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
                  <p className="text-sm text-slate-400">A flawless history of deploying over 100+ mission-critical enterprise datasets exactly on schedule.</p>
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
                  <p className="text-sm text-slate-400">Instantly provision thousands of specialized annotators to absorb sudden spikes in data volume.</p>
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
                  <p className="text-sm text-slate-400">Direct integration with elite technical project managers who monitor KPIs and resolve edge-cases proactively.</p>
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


