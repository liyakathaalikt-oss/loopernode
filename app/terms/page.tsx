/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';
import { Scale, FileText, Lock, Shield, Globe, Mail, ChevronRight, CheckCircle2 } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Review the Terms of Service and legal agreements governing the use of Loopernode AI platforms and data services.',
  path: '/terms',
});

export default function TermsPage() {
  const sectionsList = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'services', label: '2. Description of Services' },
    { id: 'accounts', label: '3. User Accounts & Responsibilities' },
    { id: 'ip-rights', label: '4. Intellectual Property' },
    { id: 'payment', label: '5. Payment Terms' },
    { id: 'liability', label: '6. Limitation of Liability' },
    { id: 'indemnification', label: '7. Indemnification' },
    { id: 'termination', label: '8. Termination' },
    { id: 'governing-law', label: '9. Governing Law' },
    { id: 'contact', label: '10. Contact Information' },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="Terms of"
          highlightedText="Service"
          description="Last updated: January 2025 — Please read these legal terms carefully before accessing or using the Loopernode platform and annotation services."
          primaryCTA={{ label: 'Explore Terms', href: '#acceptance' }}
          secondaryCTA={{ label: 'Contact Legal', href: '#contact' }}
        />
      </section>

      {/* Table of Contents Section */}
      <section className="py-12 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-bold font-heading text-slate-100">Section Directory</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {sectionsList.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-indigo-500/30 text-slate-300 hover:text-indigo-400 transition-all duration-200 group"
                >
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Main Terms Sections as Glass Cards */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="LEGAL AGREEMENT"
            title="Terms & Conditions of"
            highlightedWord="Operation"
            description="Clear and enforceable terms governing our service level agreements, intellectual property rights, and platform use."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 gap-8 mt-16 max-w-4xl mx-auto">
          
          {/* Section 1 */}
          <StaggerItem>
            <div id="acceptance" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">1. Acceptance of Terms</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                By accessing, registering, or utilizing the services, web applications, APIs, or datasets provided by Loopernode ("Company", "we", "us"), you ("User", "Client", or "you") agree to be bound by these Terms of Service.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                If you are entering into this agreement on behalf of an enterprise entity, corporation, or partnership, you represent and warrant that you possess full legal authority to bind such entity to these Terms. If you do not agree to all terms, you must refrain from using our platform.
              </p>
            </div>
          </StaggerItem>

          {/* Section 2 */}
          <StaggerItem>
            <div id="services" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">2. Description of Services</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Loopernode provides end-to-end AI training data solutions, including but not limited to:
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300"><strong>Data Annotation & Labeling:</strong> Computer vision bounding boxes, polygon segmentation, NLP text annotation, audio transcription, and RLHF alignment.</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300"><strong>Data Collection & Sourcing:</strong> Custom multimodal data gathering across worldwide geographies under ethical consent frameworks.</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300"><strong>Quality Assurance Pipelines:</strong> Machine-assisted verification, multi-pass consensus validation, and programmatic telemetry access.</span>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Section 3 */}
          <StaggerItem>
            <div id="accounts" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">3. User Accounts & Responsibilities</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Users must maintain absolute confidentiality of their account credentials, API access tokens, and cryptographic keys. You are solely responsible for all activities occurring under your account.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <h4 className="font-semibold text-indigo-400 mb-2">Prohibited Conduct</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>• Attempting unauthorized vulnerability scanning, penetration testing, or reverse engineering of platform software.</li>
                  <li>• Uploading datasets containing unlawful, toxic, malicious code, or third-party infringing materials.</li>
                  <li>• Using automated bots or scrapers to overload infrastructure or bypass rate limits.</li>
                </ul>
              </div>
            </div>
          </StaggerItem>

          {/* Section 4 */}
          <StaggerItem>
            <div id="ip-rights" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">4. Intellectual Property Rights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-slate-100 mb-2">Client Data Ownership</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Clients retain 100% full legal ownership, title, and intellectual property rights to all raw input data supplied and the final annotated output datasets produced under their contracts.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-slate-100 mb-2">Platform Proprietary Rights</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Loopernode retains exclusive ownership of all software platform code, custom labeling interfaces, ML auto-labeling models, algorithms, trademarks, and documentation.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Section 5 */}
          <StaggerItem>
            <div id="payment" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">5. Payment Terms & Invoicing</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Services are invoiced based on agreed Statement of Work (SOW) pricing models (e.g., per-task, hourly, or subscription tiers). Invoices are payable within thirty (30) days of receipt unless otherwise specified.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Late payments are subject to interest charges of 1.5% per month or the maximum statutory rate allowed by law. Clients are responsible for applicable sales, value-added (VAT), or withholding taxes.
              </p>
            </div>
          </StaggerItem>

          {/* Section 6 */}
          <StaggerItem>
            <div id="liability" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">6. Limitation of Liability</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                To the maximum extent permitted by law, Loopernode and its affiliates shall not be liable for indirect, incidental, punitive, special, or consequential damages, including loss of profits, loss of data, or business interruption.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-slate-400 text-sm">
                  Our total cumulative liability arising out of or related to these Terms or the services provided shall in no event exceed the total aggregate fees paid by Client to Loopernode in the twelve (12) months preceding the incident.
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* Section 7 */}
          <StaggerItem>
            <div id="indemnification" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">7. Indemnification</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                You agree to defend, indemnify, and hold harmless Loopernode, its directors, officers, and employees against any third-party claims, damages, liabilities, and expenses arising out of:
              </p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Any breach of these Terms or representation made herein by Client.</li>
                <li>• Allegations that raw input datasets provided by Client infringe third-party privacy or intellectual property rights.</li>
              </ul>
            </div>
          </StaggerItem>

          {/* Section 8 */}
          <StaggerItem>
            <div id="termination" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">8. Term & Termination</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Either party may terminate an active SOW or account for convenience by providing thirty (30) days written notice. In cases of material breach, termination may occur immediately if the breach remains uncured for fourteen (14) days post notice.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Upon termination, all outstanding unpaid fees become due, and Loopernode will export and deliver all completed client annotations prior to secure data purge.
              </p>
            </div>
          </StaggerItem>

          {/* Section 9 */}
          <StaggerItem>
            <div id="governing-law" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">9. Governing Law & Dispute Resolution</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Any dispute arising out of or in connection with these Terms shall first be submitted to good-faith executive negotiation. Unresolved disputes shall be finally settled by binding arbitration in Kolkata, West Bengal.
              </p>
            </div>
          </StaggerItem>

          {/* Section 10 */}
          <StaggerItem>
            <div id="contact" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">10. Contact Information</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                For questions, formal notices, or custom contract discussions regarding these Terms of Service, please contact our Legal Counsel:
              </p>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-400" />
                  <span className="text-slate-200">Legal Contact: <a href="mailto:legal@loopernode.in" className="text-cyan-400 hover:underline font-semibold">legal@loopernode.in</a></span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-indigo-400 mt-0.5" />
                  <span className="text-slate-300">Corporate HQ: Loopernode Legal Dept, Tech Hub Sector V, Kolkata, West Bengal 700091, India</span>
                </div>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <FadeIn>
          <CTABanner
            headline="Need custom enterprise terms?"
            description="Our legal team works closely with enterprise clients to accommodate tailored SLAs, data residency mandates, and compliance frameworks."
            primaryCTA={{ label: 'Contact Legal Team', href: 'mailto:legal@loopernode.in' }}
            secondaryCTA={{ label: 'View Privacy Policy', href: '/privacy' }}
          />
        </FadeIn>
      </section>
    </main>
  );
}
