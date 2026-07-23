import { Hero } from "@/components/sections/hero";
import { SectionTitle } from "@/components/sections/section-title";
import { ServiceCard } from "@/components/sections/service-card";
import { StatCounter } from "@/components/sections/stat-counter";
import { CTABanner } from "@/components/sections/cta-banner";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";
import { generatePageMetadata } from "@/lib/metadata";
import { Database, Image as ImageIcon, Workflow, Search, Code, CheckCircle, BarChart, Layers } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "AI Data Services | NovaMind AI",
  description: "Comprehensive AI data services including data collection, labeling, and processing for enterprise models.",
  path: "/services",
});

const PROCESS_STEPS = [
  { title: "Discovery", description: "Understand your model requirements and data needs." },
  { title: "Scoping", description: "Define parameters, quality metrics, and timelines." },
  { title: "Pilot", description: "Test execution with a small sample for alignment." },
  { title: "Scale", description: "Full-scale production with continuous QA." },
  { title: "Delivery", description: "Secure transfer of high-quality, formatted data." },
];

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-dark-950 text-slate-50">
      <Hero
        headline="Comprehensive AI Data Services"
        highlightedText=""
        description="End-to-end data pipelines to fuel your most ambitious AI models. From raw collection to structured intelligence."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />

      <section className="container-custom max-w-7xl mx-auto px-6 py-20 md:py-28">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Our Core Pillars</h2>
            <p className="text-lg text-slate-400">
              NovaMind AI delivers across three critical phases of the data lifecycle. We collect diverse datasets, annotate them with expert precision, and process them into structured formats ready for machine learning.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem>
            <ServiceCard
              title="Data Collection"
              description="Global, diverse, and ethically sourced data to form the foundation of your AI."
              icon={<Database className="w-8 h-8 text-indigo-500" />}
              href="/services/data-collection"
              features={["Text, Audio & Video", "Multilingual Sourcing", "Synthetic Data", "Custom Scraping"]}
            />
          </StaggerItem>
          <StaggerItem>
            <ServiceCard
              title="Data Labeling"
              description="High-precision human-in-the-loop annotations for complex computer vision and NLP tasks."
              icon={<ImageIcon className="w-8 h-8 text-cyan-500" />}
              href="/services/data-labeling"
              features={["Bounding Boxes", "Semantic Segmentation", "RLHF for LLMs", "Sentiment Analysis"]}
            />
          </StaggerItem>
          <StaggerItem>
            <ServiceCard
              title="Data Processing"
              description="Cleansing, formatting, and structuring raw data into ready-to-train datasets."
              icon={<Workflow className="w-8 h-8 text-violet-500" />}
              href="/services/data-processing"
              features={["Data Cleansing", "Normalization", "Format Conversion", "Entity Extraction"]}
            />
          </StaggerItem>
        </StaggerContainer>
      </section>

      <section className="bg-white/[0.02] border-y border-white/5 py-20">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <FadeUp>
            <SectionTitle title="Our Global Impact" description="Numbers that matter" align="center" />
          </FadeUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
            <StaggerItem>
              <StatCounter value={150} suffix="+" label="Languages Supported" />
            </StaggerItem>
            <StaggerItem>
              <StatCounter value={500} suffix="M+" label="Data Points Processed" />
            </StaggerItem>
            <StaggerItem>
              <StatCounter value={99} suffix="%" label="Quality Accuracy" />
            </StaggerItem>
            <StaggerItem>
              <StatCounter value={50} suffix="+" label="Domain Experts" />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="container-custom max-w-7xl mx-auto px-6 py-20 md:py-28">
        <FadeUp>
          <SectionTitle title="How We Work" description="Our proven engagement model" align="center" />
        </FadeUp>
        
        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/20 via-cyan-500/50 to-violet-500/20 -translate-y-1/2" />
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <StaggerItem key={index} className="relative z-10">
                <div className="glass-card backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl h-full flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold mb-4 font-mono">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTABanner
        headline="Ready to build better AI?"
        description="Let's discuss how our data services can accelerate your model development."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "Explore Our Work", href: "/case-studies" }}
      />
    </main>
  );
}
