/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import { 
  BookOpen, 
  FileText, 
  Code, 
  Database, 
  Shield, 
  Workflow, 
  HelpCircle, 
  Download, 
  Headphones,
  ArrowRight,
  CheckCircle2,
  Terminal
} from 'lucide-react';

import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';

export const metadata = generatePageMetadata({
  title: 'Documentation & Resources Portal',
  description: 'Explore developer guides, API specifications, SDK documentation, dataset workflows, annotation rubrics, and data security policies for Loopernode.',
  path: '/docs'
});

export default function DocumentationPage() {
  const gettingStartedCards = [
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      tag: "5 min read • Core Concepts",
      title: "Platform Overview",
      description: "Understand the core architecture of Loopernode, our multi-stage dataset pipeline model, automated QA loops, and human-in-the-loop workflows.",
      linkText: "Learn Platform Architecture",
      href: "#categories"
    },
    {
      icon: <Workflow className="w-6 h-6 text-cyan-400" />,
      tag: "10 min guide • Walkthrough",
      title: "Quick Start Guide",
      description: "Step-by-step tutorial to create your first dataset project, upload raw media assets via API or dashboard, define label taxonomies, and launch labeling.",
      linkText: "Start Quick Tutorial",
      href: "#categories"
    },
    {
      icon: <Shield className="w-6 h-6 text-violet-400" />,
      tag: "3 min setup • Admin & Security",
      title: "Account Setup",
      description: "Configure enterprise workspaces, invite team members, set fine-grained RBAC permissions, generate API tokens, and configure webhook receivers.",
      linkText: "Configure Workspace",
      href: "#categories"
    }
  ];

  const docCategories = [
    {
      icon: <Database className="w-6 h-6 text-indigo-400" />,
      title: "AI Data Services",
      description: "Ingest, structure, and optimize raw unstructured data across vision, text, speech, LiDAR, and sensor modalities for enterprise AI models.",
      topics: [
        "Multi-Modal Raw Data Ingestion & Indexing",
        "Synthetic Data Generation & Data Augmentation",
        "Automated Pre-labeling & Quality Filtering",
        "Dataset Balancing & Bias Reduction Metrics"
      ]
    },
    {
      icon: <Workflow className="w-6 h-6 text-cyan-400" />,
      title: "Dataset Workflow",
      description: "Design resilient dataset lifecycles with dataset versioning, consensus scoring, active learning loops, and automated pipeline triggers.",
      topics: [
        "End-to-End Pipeline Architecture Design",
        "Dataset Versioning, Snapshotting & Rollbacks",
        "Consensus Validation & Active Learning",
        "Edge Case Escalation & Anomaly Routing"
      ]
    },
    {
      icon: <FileText className="w-6 h-6 text-violet-400" />,
      title: "Annotation Guidelines",
      description: "Comprehensive rubrics, class taxonomy definitions, boundary precision rules, and RLHF prompt-response evaluation specifications.",
      topics: [
        "Taxonomy Definition & Hierarchy Mapping",
        "Bounding Box, Polygon & Keypoint Rules",
        "RLHF & Multimodal LLM Alignment Rubrics",
        "Inter-Annotator Agreement (IAA) Benchmarks"
      ]
    },
    {
      icon: <Code className="w-6 h-6 text-indigo-400" />,
      title: "API Integration Guide",
      description: "Programmatic RESTful APIs for automated batch uploading, asynchronous status queries, taxonomy sync, and callback webhooks.",
      topics: [
        "RESTful API Endpoint Reference Specs",
        "Real-Time Webhooks & Status Event Streaming",
        "OAuth2 & High-Entropy API Token Auth",
        "Rate Limits, Throttling & Batch Parallelism"
      ]
    },
    {
      icon: <Terminal className="w-6 h-6 text-cyan-400" />,
      title: "SDK Overview",
      description: "Official open-source client libraries and command-line tools for Python, Node.js, and Go with deep ML framework integrations.",
      topics: [
        "Python SDK & PyTorch/TensorFlow Connectors",
        "TypeScript & Node.js Enterprise Client",
        "Go High-Throughput Ingestion Library",
        "CLI Tools & Automated Batch Import Scripts"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-violet-400" />,
      title: "Data Security",
      description: "Enterprise security architecture, SOC 2 Type II compliance controls, zero-retention policies, and HIPAA/GDPR data protection.",
      topics: [
        "SOC 2 Type II & ISO 27001 Security Frameworks",
        "End-to-End TLS 1.3 & AES-256 Encryption",
        "Automated PII, Face & License Plate Redaction",
        "On-Premise & Isolated VPC Worker Nodes"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I authenticate API requests with Loopernode?",
      answer: "All API requests require HTTPS and must include a Bearer token in the request header: 'Authorization: Bearer YOUR_API_KEY'. You can issue and revoke API keys from your Organization Settings page."
    },
    {
      question: "What are the rate limits for programmatic dataset uploads?",
      answer: "Standard accounts support up to 500 requests per minute with bulk ingestion batching up to 10,000 files per payload. Dedicated tier customers enjoy customized high-throughput limits and private API gateways."
    },
    {
      question: "Can we deploy processing nodes inside our own private cloud or VPC?",
      answer: "Yes! Loopernode supports hybrid and fully air-gapped deployments. Enterprise clients can run our processing workers inside AWS VPC, GCP, Azure, or on-premise Kubernetes clusters."
    },
    {
      question: "How does Loopernode ensure human-in-the-loop annotator security?",
      answer: "Annotators operate within strictly isolated, browser-based sandboxes with download prevention, session watermarking, screen capture blocking, and automated PII blurring prior to human review."
    },
    {
      question: "How do we connect Loopernode directly to our Cloud Storage buckets?",
      answer: "Loopernode natively integrates with AWS S3, Google Cloud Storage, and Azure Blob Storage via IAM Roles or Service Accounts, permitting direct zero-copy read/write operations for your raw assets."
    }
  ];

  const downloadableResources = [
    {
      icon: <FileText className="w-8 h-8 text-indigo-400" />,
      title: "Enterprise AI Data Quality Whitepaper",
      meta: "PDF • 4.2 MB",
      description: "An in-depth whitepaper detailing multi-stage quality control algorithms, active learning strategies, and consensus mechanisms for zero-bias dataset curation.",
      downloadUrl: "#"
    },
    {
      icon: <Code className="w-8 h-8 text-cyan-400" />,
      title: "Complete API & OpenAPI 3.0 Specification",
      meta: "JSON / Postman • 1.8 MB",
      description: "Full technical specification including OpenAPI schemas, JSON payloads, response status codes, and ready-to-import Postman collections for rapid testing.",
      downloadUrl: "#"
    },
    {
      icon: <Shield className="w-8 h-8 text-violet-400" />,
      title: "Data Security & Integration Guide",
      meta: "PDF • 2.5 MB",
      description: "Detailed compliance report covering SOC 2 Type II controls, ISO 27001 policies, HIPAA safeguards, and GDPR data subject request procedures.",
      downloadUrl: "#"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      
      {/* SECTION 1: Hero */}
      <section className="pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="Documentation & Resources"
          highlightedText="Portal"
          description="Everything you need to integrate, scale, and manage high-quality AI training data pipelines with Loopernode APIs, SDKs, and enterprise platform tools."
          primaryCTA={{ label: 'Quick Start Guide', href: '#getting-started' }}
          secondaryCTA={{ label: 'Explore API Docs', href: '#categories' }}
        />
      </section>

      {/* SECTION 2: Getting Started */}
      <section id="getting-started" className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <SectionTitle
          eyebrow="GETTING STARTED"
          title="Kickstart Your AI Data Pipeline in"
          highlightedWord="Minutes"
          description="Essential guides and walk-throughs to help your engineering and data science teams configure workspaces and launch annotation workflows."
          align="center"
        />
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {gettingStartedCards.map((card, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-100 mb-3 group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <a href={card.href} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                    {card.linkText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 3: Documentation Categories Grid */}
      <section id="categories" className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <SectionTitle
          eyebrow="DOCUMENTATION CATEGORIES"
          title="Explore In-Depth Guides &"
          highlightedWord="Technical Reference"
          description="Detailed documentation covering data operations, SDK usage, RESTful APIs, annotation guidelines, and enterprise security compliance."
          align="center"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {docCategories.map((cat, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-100 mb-3 group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                      Key Sub-Topics:
                    </span>
                    {cat.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                    Browse Category
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 4: FAQ Section */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <SectionTitle
          eyebrow="DOCUMENTATION FAQ"
          title="Frequently Asked"
          highlightedWord="Questions"
          description="Clear answers to common questions regarding API integration, sandbox security, rate limits, and cloud deployment."
          align="center"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {faqs.map((faq, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-slate-100 pt-1">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed pl-14">
                  {faq.answer}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 5: Downloadable Resources */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <SectionTitle
          eyebrow="DOWNLOADABLE RESOURCES"
          title="Technical Specifications &"
          highlightedWord="Downloads"
          description="Access comprehensive offline documentation, OpenAPI specifications, and security whitepapers."
          align="center"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {downloadableResources.map((res, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {res.icon}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {res.meta}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-100 mb-3 group-hover:text-white transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <a
                    href={res.downloadUrl}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-300"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                    Download Resource
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 6: Contact Support CTA */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <FadeIn>
          <div className="flex items-center justify-center gap-2 text-indigo-400 mb-6 font-semibold text-sm uppercase tracking-wider">
            <Headphones className="w-5 h-5" /> 24/7 Developer Support & Architecture Advisory
          </div>
          <CTABanner
            headline="Need Custom Technical Assistance?"
            description="Our team of AI solutions architects, solutions engineers, and data ops managers are available 24/7 to help design custom pipeline integrations for your enterprise."
            primaryCTA={{ label: 'Contact Technical Support', href: '/contact' }}
            secondaryCTA={{ label: 'Schedule Architecture Call', href: '/contact' }}
          />
        </FadeIn>
      </section>

    </main>
  );
}

