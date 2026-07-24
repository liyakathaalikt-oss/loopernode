/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Database, Tag, Settings, FileCheck, PenTool, CheckCircle, Shield, Send,
  HeartPulse, ShoppingCart, Car, Tractor, Factory, Scale, DollarSign,
  Package, Cpu, Navigation, Umbrella, GraduationCap, Users, Clock, Wrench,
  Headphones, ArrowRight
} from 'lucide-react';

import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { FeatureCard } from '@/components/sections/feature-card';
import { ServiceCard } from '@/components/sections/service-card';
import { StatCounter } from '@/components/sections/stat-counter';
import { TestimonialCard } from '@/components/sections/testimonial-card';
import { FAQAccordion } from '@/components/sections/faq-accordion';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-wrapper';

import { testimonials } from '@/content/testimonials';
import { homeFAQs } from '@/content/faqs';
import { caseStudies } from '@/content/case-studies';

export default function HomePage() {
  const trustedCompanies = [
    'Meridian Autonomics', 'HealthBridge AI', 'Quantum Commerce', 
    'NeuralPath Labs', 'Apex Robotics', 'DataForge Systems', 
    'Prism Analytics', 'Vanguard ML'
  ];

  const workflowSteps = [
    { icon: <Database className="w-6 h-6 text-indigo-400" />, title: "Dataset Collection", desc: "Gathering raw, high-quality data from diverse sources." },
    { icon: <FileCheck className="w-6 h-6 text-indigo-400" />, title: "Preparation", desc: "Cleaning, formatting, and structuring the raw data." },
    { icon: <PenTool className="w-6 h-6 text-indigo-400" />, title: "Annotation", desc: "Expert human-in-the-loop labeling and tagging." },
    { icon: <CheckCircle className="w-6 h-6 text-indigo-400" />, title: "Validation", desc: "Cross-checking annotations for maximum accuracy." },
    { icon: <Shield className="w-6 h-6 text-indigo-400" />, title: "Quality Assurance", desc: "Rigorous multi-tier quality control reviews." },
    { icon: <Send className="w-6 h-6 text-indigo-400" />, title: "Delivery", desc: "Secure export of training-ready AI datasets." }
  ];

  const industries = [
    { name: "Healthcare", icon: <HeartPulse className="w-6 h-6 text-cyan-400" /> },
    { name: "Retail", icon: <ShoppingCart className="w-6 h-6 text-cyan-400" /> },
    { name: "Automotive", icon: <Car className="w-6 h-6 text-cyan-400" /> },
    { name: "Agriculture", icon: <Tractor className="w-6 h-6 text-cyan-400" /> },
    { name: "Manufacturing", icon: <Factory className="w-6 h-6 text-cyan-400" /> },
    { name: "Legal", icon: <Scale className="w-6 h-6 text-cyan-400" /> },
    { name: "Finance", icon: <DollarSign className="w-6 h-6 text-cyan-400" /> },
    { name: "E-commerce", icon: <Package className="w-6 h-6 text-cyan-400" /> },
    { name: "Robotics", icon: <Cpu className="w-6 h-6 text-cyan-400" /> },
    { name: "Autonomous Vehicles", icon: <Navigation className="w-6 h-6 text-cyan-400" /> },
    { name: "Insurance", icon: <Umbrella className="w-6 h-6 text-cyan-400" /> },
    { name: "Education", icon: <GraduationCap className="w-6 h-6 text-cyan-400" /> },
  ];

  const technologies = [
    "TensorFlow", "PyTorch", "AWS", "GCP", "Azure", "Kubernetes", 
    "CVAT", "Label Studio", "Labelbox", "Hugging Face", "OpenCV", "scikit-learn"
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      
      {/* SECTION 1: Hero */}
      <section className="pt-20 md:pt-28 pb-10 border-b border-white/5">
        <Hero 
          headline="Enterprise AI Data Services That Power"
          highlightedText="Intelligent Systems"
          description="From data collection to annotation and processing, we provide end-to-end AI data solutions trusted by leading technology companies worldwide."
          primaryCTA={{ label: 'Get Started', href: '/contact' }}
          secondaryCTA={{ label: 'Explore Services', href: '/services' }}
          stats={[
            { value: '500M+', label: 'Data Points Processed' },
            { value: '99.7%', label: 'Accuracy Rate' },
            { value: '200+', label: 'Enterprise Clients' }
          ]}
        />
      </section>

      {/* SECTION 2: Trusted By */}
      <section className="py-12 border-b border-white/5 overflow-hidden bg-white/5 backdrop-blur-sm">
        <FadeIn>
          <div className="container mx-auto px-4 mb-6 text-center text-sm font-semibold tracking-wider text-slate-400 uppercase">
            Trusted by innovative companies worldwide
          </div>
          <div className="relative flex overflow-x-hidden group">
            <div className="animate-marquee whitespace-nowrap flex items-center space-x-12 px-6">
              {[...trustedCompanies, ...trustedCompanies].map((company, idx) => (
                <div 
                  key={idx} 
                  className="text-xl font-bold text-slate-500 opacity-60 hover:opacity-100 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {company}
                </div>
              ))}
            </div>
            {/* Note: The marquee animation needs to be defined in global CSS or tailwind config */}
          </div>
        </FadeIn>
      </section>

      {/* SECTION 3: Company Overview */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <SectionTitle 
              eyebrow="About Loopernode" 
              title="Architecting the Future of AI with" 
              highlightedWord="Precision" 
              align="left" 
            />
            <p className="text-lg text-slate-300 leading-relaxed mt-6 mb-8">
              At Loopernode, we understand that the intelligence of your AI system is directly proportional to the quality of its training data. For over a decade, we have been at the forefront of the AI revolution, providing meticulous data services that form the foundational layer of state-of-the-art machine learning models. Our global workforce and proprietary infrastructure ensure that your models learn from the best data possible.
            </p>
            <Link href="/about" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Learn more about our mission <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-2 gap-6">
            <StaggerItem>
              <StatCounter value={10} suffix="+" label="Years of Excellence" icon={<Clock className="w-5 h-5 text-indigo-400" />} />
            </StaggerItem>
            <StaggerItem>
              <StatCounter value={2000} suffix="+" label="Team Members" icon={<Users className="w-5 h-5 text-indigo-400" />} />
            </StaggerItem>
            <StaggerItem>
              <StatCounter value={500} suffix="M+" label="Data Points" icon={<Database className="w-5 h-5 text-indigo-400" />} />
            </StaggerItem>
            <StaggerItem>
              <StatCounter value={50} suffix="+" label="Countries Served" icon={<Navigation className="w-5 h-5 text-indigo-400" />} />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 4: Services Overview */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <FadeUp>
          <SectionTitle 
            eyebrow="Our Services" 
            title="Comprehensive AI Data" 
            highlightedWord="Solutions" 
            align="center" 
          />
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative z-10">
          <FadeUp delay={0.1}>
            <ServiceCard 
              title="Data Collection" 
              description="Ethically sourced, diverse, and unbiased datasets tailored for your specific machine learning requirements across text, image, audio, and video modalities."
              icon={<Database className="w-8 h-8" />} 
              features={["Custom Data Sourcing", "Multilingual Datasets", "Synthetic Data Generation", "Compliance & Privacy"]} 
              href="/services/data-collection" 
            />
          </FadeUp>
          <FadeUp delay={0.2}>
            <ServiceCard 
              title="Data Labeling" 
              description="High-precision human-in-the-loop annotation and tagging services that transform raw unstructured data into ground-truth training material."
              icon={<Tag className="w-8 h-8" />} 
              features={["Bounding Boxes & Polygons", "Semantic Segmentation", "NLP Text Annotation", "Audio Transcription"]} 
              href="/services/data-labeling" 
            />
          </FadeUp>
          <FadeUp delay={0.3}>
            <ServiceCard 
              title="Data Processing" 
              description="Advanced processing pipelines to clean, normalize, and structure your data, ensuring it is perfectly formatted for your model ingestion."
              icon={<Settings className="w-8 h-8" />} 
              features={["Data Cleaning & De-duplication", "Format Conversion", "Anomaly Detection", "Automated Quality Scoring"]} 
              href="/services/data-processing" 
            />
          </FadeUp>
        </div>
      </section>

      {/* SECTION 5: AI Workflow */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle 
            eyebrow="How We Work" 
            title="Our Proven Data" 
            highlightedWord="Workflow" 
            align="center" 
          />
        </FadeUp>
        <div className="mt-20 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/20 via-cyan-500/50 to-violet-500/20 -translate-y-1/2 z-0" />
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {workflowSteps.map((step, index) => (
              <StaggerItem key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10 transform transition-transform hover:-translate-y-2">
                  {step.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400 px-2">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 6: Industries */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 bg-slate-900/30">
        <FadeUp>
          <SectionTitle 
            eyebrow="Industries We Serve" 
            title="Powering Innovation Across" 
            highlightedWord="Sectors" 
            align="center" 
          />
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
          {industries.map((industry, index) => (
            <StaggerItem key={index}>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer h-full">
                <div className="p-3 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors mb-4">
                  {industry.icon}
                </div>
                <h3 className="font-semibold text-slate-200">{industry.name}</h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 7: Why Choose Us */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle 
            eyebrow="The Loopernode Advantage" 
            title="Why Choose" 
            highlightedWord="Us" 
            align="center" 
          />
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-indigo-400" />} 
            title="Enterprise Security" 
            description="SOC 2 Type II, ISO 27001, and GDPR compliant. Your proprietary data is protected by bank-grade security protocols." 
          />
          <FeatureCard 
            icon={<Users className="w-6 h-6 text-indigo-400" />} 
            title="Scalable Workforce" 
            description="Access our vetted network of 2000+ domain-expert annotators globally, ready to scale with your project demands." 
          />
          <FeatureCard 
            icon={<CheckCircle className="w-6 h-6 text-indigo-400" />} 
            title="Quality Assurance" 
            description="Rigorous multi-tier review processes and automated consensus scoring guarantee industry-leading 99.7% accuracy." 
          />
          <FeatureCard 
            icon={<Clock className="w-6 h-6 text-indigo-400" />} 
            title="Fast Turnaround" 
            description="Agile project management enabling rapid 24-48 hour kickoffs and accelerated delivery without compromising quality." 
          />
          <FeatureCard 
            icon={<Wrench className="w-6 h-6 text-indigo-400" />} 
            title="Custom Solutions" 
            description="We don't believe in one-size-fits-all. Every pipeline is engineered specifically for your model's unique architecture." 
          />
          <FeatureCard 
            icon={<Headphones className="w-6 h-6 text-indigo-400" />} 
            title="24/7 Support" 
            description="Dedicated project managers and technical support engineers available round-the-clock across all time zones." 
          />
        </StaggerContainer>
      </section>

      {/* SECTION 8: Technologies */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-500/5 blur-[150px] rounded-full pointer-events-none" />
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Seamless Integration with Your Tech Stack</h3>
            <p className="text-slate-400">We plug directly into your existing machine learning ecosystem, supporting all major frameworks and platforms.</p>
          </div>
        </FadeUp>
        <StaggerContainer className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto relative z-10">
          {technologies.map((tech, idx) => (
            <StaggerItem key={idx}>
              <div className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-slate-300 font-medium hover:bg-white/10 hover:border-violet-500/50 hover:text-white transition-all duration-300 cursor-default shadow-sm shadow-black/50">
                {tech}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 9: Statistics */}
      <section className="py-20 container mx-auto px-4 border-b border-white/5 bg-gradient-to-b from-transparent to-indigo-900/10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StaggerItem>
            <StatCounter value={500} suffix="M+" label="Data Points Processed" />
          </StaggerItem>
          <StaggerItem>
            <StatCounter value={10} suffix="K+" label="Projects Completed" />
          </StaggerItem>
          <StaggerItem>
            <StatCounter value={99.7} suffix="%" label="Accuracy Rate" />
          </StaggerItem>
          <StaggerItem>
            <StatCounter value={150} suffix="+" label="Enterprise Clients" />
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* SECTION 10: Case Studies */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <div className="flex justify-between items-end mb-16">
            <SectionTitle 
              eyebrow="Success Stories" 
              title="Real-World" 
              highlightedWord="Impact" 
              align="left" 
            />
            <Link href="/case-studies" className="hidden md:inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              View All Case Studies <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.slice(0, 3).map((study: any, index: number) => (
            <StaggerItem key={index}>
              <div className="h-full flex flex-col p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/40 transition-all duration-500 group">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 w-max">
                  {study.industry || 'AI Development'}
                </span>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">{study.title}</h3>
                <p className="text-sm text-cyan-400 font-medium mb-4">{study.client}</p>
                <p className="text-slate-400 text-sm mb-8 flex-grow">
                  {study.challengeExcerpt || study.excerpt || 'Discover how we accelerated their AI pipeline with precision data services.'}
                </p>
                <Link href={`/case-studies/${study.slug || 'detail'}`} className="inline-flex items-center text-white text-sm font-semibold hover:text-indigo-400 transition-colors mt-auto">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="mt-10 text-center md:hidden">
          <Link href="/case-studies" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            View All Case Studies <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* SECTION 11: Testimonials */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 overflow-hidden">
        <FadeUp>
          <SectionTitle 
            eyebrow="Client Feedback" 
            title="Trusted by Industry" 
            highlightedWord="Leaders" 
            align="center" 
          />
        </FadeUp>
        <div className="mt-16">
          <TestimonialCard testimonials={testimonials} />
        </div>
      </section>

      {/* SECTION 12: FAQ */}
      <section className="py-20 md:py-28 container mx-auto px-4 max-w-4xl border-b border-white/5">
        <FadeUp>
          <SectionTitle 
            eyebrow="Got Questions?" 
            title="Frequently Asked" 
            highlightedWord="Questions" 
            align="center" 
          />
        </FadeUp>
        <div className="mt-16">
          <FAQAccordion faqs={homeFAQs} generateSchema={true} />
        </div>
      </section>

      {/* SECTION 13: Final CTA */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <ScaleIn>
          <CTABanner 
            headline="Ready to Accelerate Your AI Development?" 
            description="Join 200+ companies that trust Loopernode for their data needs. Get started with a free consultation today."
            primaryCTA={{ label: 'Start Your Project', href: '/contact' }}
            secondaryCTA={{ label: 'View Our Services', href: '/services' }}
          />
        </ScaleIn>
      </section>

    </main>
  );
}
