/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import {
  Shield,
  Lock,
  Key,
  Eye,
  Server,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Users,
  Globe,
  ShieldCheck,
  Check,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { FeatureCard } from '@/components/sections/feature-card';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';

export const metadata = generatePageMetadata({
  title: 'Enterprise Security & Compliance',
  description: 'Learn about Loopernode\'s enterprise-grade security architecture, compliance standards, data privacy protocols, and end-to-end protection for AI training data.',
  path: '/security'
});

export default function SecurityPage() {
  // Feature flag: set to true when certifications are officially obtained
  const SHOW_COMPLIANCE = false;

  const complianceItems = [
    {
      icon: <FileCheck className="w-10 h-10 text-indigo-400" />,
      title: 'ISO 27001 Ready',
      description: 'Built to adhere to strict international standards for Information Security Management Systems (ISMS), ensuring robust governance and risk mitigation across all data pipelines.'
    },
    {
      icon: <Shield className="w-10 h-10 text-cyan-400" />,
      title: 'SOC 2 Type II Ready',
      description: 'Comprehensive control frameworks covering security, availability, processing integrity, and confidentiality for complex enterprise ML workloads.'
    },
    {
      icon: <Globe className="w-10 h-10 text-violet-400" />,
      title: 'GDPR Compliant',
      description: 'Strict adherence to EU General Data Protection Regulations, guaranteeing transparent data subject privacy rights, consent management, and lawful data processing.'
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-emerald-400" />,
      title: 'HIPAA Capable',
      description: 'Compliant data handling capabilities for Protected Health Information (PHI) with Business Associate Agreements (BAA) and isolated annotation environments available.'
    }
  ];

  const infrastructureFeatures = [
    {
      icon: <Lock className="w-6 h-6 text-indigo-400" />,
      title: '256-bit AES Encryption at Rest',
      description: 'All stored dataset artifacts, annotations, and database records are encrypted using FIPS 140-2 validated AES-256 key management routines.'
    },
    {
      icon: <Key className="w-6 h-6 text-cyan-400" />,
      title: 'TLS 1.3 in Transit',
      description: 'Enforced HTTPS and TLS 1.3 protocols with modern cipher suites for all external API calls, database connections, and ingress/egress points.'
    },
    {
      icon: <Server className="w-6 h-6 text-violet-400" />,
      title: 'Dedicated VPC Isolation',
      description: 'Client environments run within logically isolated Virtual Private Clouds (VPC) with strict network segmentation and zero shared storage.'
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      title: 'Multi-Region Redundancy',
      description: 'High availability across geographically distributed data centers featuring automated failover and continuous automated backup strategies.'
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
      title: 'DDoS Protection',
      description: 'Edge-level protection with automated rate-limiting, Web Application Firewalls (WAF), and cloud-native volumetric DDoS mitigation.'
    },
    {
      icon: <Eye className="w-6 h-6 text-cyan-400" />,
      title: '24/7 Real-Time Monitoring',
      description: 'Continuous threat detection, automated anomaly monitoring, and immediate Security Operations Center (SOC) escalation paths.'
    }
  ];

  const accessControlFeatures = [
    {
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      title: 'Role-Based Access Control (RBAC)',
      description: 'Granular least-privilege permissions assigned strictly by role, ensuring personnel access only the data necessary for their specific annotation tasks.'
    },
    {
      icon: <Key className="w-6 h-6 text-cyan-400" />,
      title: 'Multi-Factor Authentication (MFA)',
      description: 'Mandatory multi-factor authentication enforced across all employee accounts, client portals, and VPN access nodes.'
    },
    {
      icon: <FileCheck className="w-6 h-6 text-violet-400" />,
      title: 'Immutable Audit Logs',
      description: 'Comprehensive, tamper-evident logging of every read, write, export, and administrative event with continuous SIEM integration.'
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-400" />,
      title: 'Enterprise Single Sign-On (SSO)',
      description: 'Seamless authentication integration with SAML 2.0, OpenID Connect, Okta, Azure AD, and Google Workspace for centralized identity management.'
    }
  ];

  const dataPrivacyFeatures = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      title: 'Strict Data Handling & NDAs',
      description: 'All annotators and engineers undergo rigorous background checks and operate under binding Non-Disclosure Agreements (NDAs) within secure environments.'
    },
    {
      icon: <Server className="w-6 h-6 text-cyan-400" />,
      title: 'Custom Data Retention Policies',
      description: 'Configurable automated data purging workflows post-annotation or immediate permanent destruction upon project sign-off.'
    },
    {
      icon: <Eye className="w-6 h-6 text-violet-400" />,
      title: 'Automated PII Anonymization',
      description: 'AI-assisted redaction of personally identifiable information (PII), faces, license plates, and sensitive metadata prior to human processing.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
      title: 'Right to Deletion & Portability',
      description: 'Full self-service and API tools for bulk data export and cryptographically verified permanent data deletion certificates.'
    }
  ];

  const sdlcSteps = [
    {
      step: '01',
      icon: <FileCheck className="w-6 h-6 text-indigo-400" />,
      title: 'Automated Code Review & SAST',
      description: 'Static and dynamic application security testing (SAST/DAST) embedded into every continuous integration pipeline commit.'
    },
    {
      step: '02',
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      title: 'Third-Party Penetration Testing',
      description: 'Independent cybersecurity firms regularly conduct thorough grey-box and black-box penetration tests on our platform.'
    },
    {
      step: '03',
      icon: <AlertTriangle className="w-6 h-6 text-violet-400" />,
      title: 'Continuous Vulnerability Scanning',
      description: '24/7 automated dependency scanning and container image analysis to detect and patch CVE vulnerabilities proactively.'
    },
    {
      step: '04',
      icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
      title: 'Rapid Incident Response SLA',
      description: 'Dedicated Incident Response Team adhering to strict SLAs for containment, remediation, and transparent customer notification.'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      
      {/* SECTION 1: Hero */}
      <section className="pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="Enterprise-Grade"
          highlightedText="Security"
          description="Protecting your proprietary data and AI models with defense-in-depth architecture, continuous threat monitoring, and uncompromised compliance standards."
          primaryCTA={{ label: 'Contact Security Team', href: '/contact' }}
          secondaryCTA={SHOW_COMPLIANCE ? { label: 'Explore Compliance', href: '#compliance' } : undefined}
        />
      </section>

      {/* SECTION 2: Security Overview */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            title="Unwavering Protection for Your"
            highlightedWord="AI Assets"
            description="At Loopernode, security is not an afterthought—it is embedded into every line of code, network configuration, and data labeling workflow. We understand that your dataset is your core competitive advantage."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <StaggerItem>
            <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 font-heading mb-3">Zero-Trust Architecture</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We enforce explicit verification for every request, whether originating inside or outside our network perimeter. No user or system is inherently trusted.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-indigo-400 font-medium">
                <Check className="w-4 h-4 mr-2" /> Continuous Identity Verification
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 font-heading mb-3">Complete Data Isolation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Your datasets are strictly isolated at storage and compute levels. We never use client data to train public models or cross-contaminate datasets.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-cyan-400 font-medium">
                <Check className="w-4 h-4 mr-2" /> Multi-Tenant Cryptographic Separation
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 font-heading mb-3">Proactive Defense</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Automated vulnerability scanners, continuous log auditing, and real-time anomaly detection keep our systems resilient against emerging threats.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-violet-400 font-medium">
                <Check className="w-4 h-4 mr-2" /> 24/7 Automated SecOps Shield
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* SECTION 3: Compliance & Certifications Grid */}
      {SHOW_COMPLIANCE && (
        <section id="compliance" className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 scroll-mt-24">
          <FadeUp>
          <SectionTitle
            title="Compliance &"
            highlightedWord="Certifications"
            description="We rigorously adhere to globally recognized security frameworks and privacy laws to satisfy even the most demanding enterprise compliance audits."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {complianceItems.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 flex flex-col group hover:-translate-y-1">
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 w-fit group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-100 font-heading mb-3 group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                  {item.description}
                </p>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Verified Standard <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
      )}

      {/* SECTION 4: Infrastructure Security (2 Column - text left, feature list right) */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <FadeUp>
              <SectionTitle
                title="Infrastructure Security"
                highlightedWord="Architecture"
                align="left"
              />
              <div className="space-y-6 text-slate-300 text-base leading-relaxed mt-6">
                <p>
                  Loopernode's infrastructure is engineered on enterprise cloud platforms with multi-layered defense mechanisms protecting data at rest, in motion, and during processing.
                </p>
                <p>
                  From strict network segmentation within Virtual Private Clouds (VPC) to automated edge DDoS mitigation, our environment delivers robust uptime and resilience against hostile network threats.
                </p>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-slate-900/60 border border-indigo-500/20">
                <div className="flex items-center gap-3 text-indigo-300 font-bold text-base mb-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  Military-Grade Encryption Standard
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Keys are rotated regularly using hardware security modules (HSM) with strict separation of operational duties.
                </p>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {infrastructureFeatures.map((feat, idx) => (
                <FeatureCard
                  key={idx}
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.description}
                  index={idx}
                />
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* SECTION 5: Access Control Section */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 bg-slate-900/20">
        <FadeUp>
          <SectionTitle
            title="Granular Access Control &"
            highlightedWord="Authentication"
            description="Ensure that only authorized users gain access to sensitive annotation projects through centralized authentication and strict least-privilege enforcement."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {accessControlFeatures.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-100 font-heading mb-3 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 6: Data Privacy Section */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            title="Data Privacy &"
            highlightedWord="Anonymization"
            description="Protect personal privacy and maintain complete ownership over your intellectual property with automated masking and strict retention policies."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {dataPrivacyFeatures.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 shrink-0 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100 font-heading mb-2 group-hover:text-violet-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 7: Secure Development Lifecycle */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 bg-slate-900/20">
        <FadeUp>
          <SectionTitle
            title="Secure Development"
            highlightedWord="Lifecycle"
            description="Security is baked into our software delivery pipeline from code commit through continuous deployment and live production monitoring."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {sdlcSteps.map((step, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="text-4xl font-extrabold text-white/10 font-heading absolute top-4 right-6 group-hover:text-indigo-500/20 transition-colors">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-100 font-heading mb-3 group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 8: CTA Banner */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <FadeIn>
          <CTABanner
            headline="Questions about security?"
            description="Our security specialists and compliance team are available to provide SOC 2 reports, answer vendor questionnaires, or discuss custom data isolation architecture."
            primaryCTA={{ label: 'Contact Security Team', href: '/contact' }}
            secondaryCTA={{ label: 'Explore Services', href: '/services' }}
          />
        </FadeIn>
      </section>

    </main>
  );
}

