/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';
import { FileText, Shield, Cookie, Eye, Globe, Mail, Scale, Lock, ChevronRight, CheckCircle2 } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Learn how Loopernode collects, uses, protects, and manages your personal data and privacy rights in accordance with global regulations.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const tableOfContents = [
    { id: 'info-collect', label: '1. Information We Collect' },
    { id: 'how-we-use', label: '2. How We Use Your Information' },
    { id: 'data-sharing', label: '3. Data Sharing & Third Parties' },
    { id: 'cookies', label: '4. Cookies & Tracking Technologies' },
    { id: 'your-rights', label: '5. Your Rights' },
    { id: 'data-retention', label: '6. Data Retention' },
    { id: 'international-transfers', label: '7. International Transfers' },
    { id: 'childrens-privacy', label: '8. Children\'s Privacy' },
    { id: 'policy-changes', label: '9. Changes to This Policy' },
    { id: 'contact-info', label: '10. Contact Information' },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      {/* Hero Section */}
      <section className="pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="Privacy"
          highlightedText="Policy"
          description="Last updated: January 2025 — Learn how Loopernode respects your privacy and safeguards your personal data across all our platforms."
          primaryCTA={{ label: 'View Your Rights', href: '#your-rights' }}
          secondaryCTA={{ label: 'Contact Privacy Team', href: '#contact-info' }}
        />
      </section>

      {/* Table of Contents Section */}
      <section className="py-12 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-bold font-heading text-slate-100">Table of Contents</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {tableOfContents.map((item) => (
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

      {/* Main Privacy Sections */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            title="Comprehensive Privacy"
            highlightedWord="Framework"
            description="Our commitments to data protection, user autonomy, and compliance with GDPR, CCPA, and global privacy standards."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 gap-8 mt-16 max-w-4xl mx-auto">
          
          {/* Section 1 */}
          <StaggerItem>
            <div id="info-collect" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">1. Information We Collect</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                We collect personal information necessary to deliver, enhance, and secure our AI data pipeline services. Depending on your interactions with Loopernode, we process the following categories of data:
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Personal Data
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Full name, enterprise email address, phone number, organization name, job title, and billing information provided during account creation or inquiries.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Usage & Technical Data
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    IP address, device identifiers, browser type, operating system, timestamp logs, API request payloads, and navigation pathways across our web portal.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Telemetry & Cookies Data
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Session state tokens, preference indicators, security event telemetry, and cookies required for authentication and analytics performance.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Section 2 */}
          <StaggerItem>
            <div id="how-we-use" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">2. How We Use Your Information</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Your data is processed strictly for legitimate operational, security, and contractual purposes, including:
              </p>
              <ul className="space-y-3 text-slate-300 text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span><strong>Service Delivery & Execution:</strong> Provisioning dataset annotation tools, API endpoints, user authentication, and billing management.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span><strong>Platform Improvement:</strong> Monitoring platform performance, debugging system bugs, and refining ML data quality verification algorithms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span><strong>Communication & Support:</strong> Responding to client inquiries, issuing critical security alerts, and providing technical support updates.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span><strong>Security & Compliance:</strong> Preventing unauthorized access, verifying legal eligibility, and complying with statutory recordkeeping.</span>
                </li>
              </ul>
            </div>
          </StaggerItem>

          {/* Section 3 */}
          <StaggerItem>
            <div id="data-sharing" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">3. Data Sharing & Third Parties</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                <strong className="text-indigo-400">We do not sell, rent, or monetize your personal data.</strong> Data is shared only under strict contractual safeguards with the following entities:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-slate-100 mb-2">Vetted Service Subprocessors</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Cloud infrastructure providers (AWS, GCP), security telemetry services, and payment gateway providers operating under executed Data Processing Agreements (DPAs).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-slate-100 mb-2">Legal & Regulatory Mandates</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Government authorities, auditors, or law enforcement bodies when compelled by valid legal subpoenas, court orders, or statutory obligations.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Section 4 */}
          <StaggerItem>
            <div id="cookies" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Cookie className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">4. Cookies & Tracking Technologies</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Cookies are small text files stored on your device when you visit web pages. Loopernode utilizes cookies to maintain active login sessions, remember system preferences, and evaluate website performance.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-4">
                <p className="text-slate-300 text-sm">
                  You can configure or adjust cookie consent options at any time via your browser settings or by visiting our dedicated <Link  href="/cookie" className="text-cyan-400 hover:underline font-semibold">Cookie Policy Page</Link>.
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* Section 5 */}
          <StaggerItem>
            <div id="your-rights" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">5. Your Privacy Rights</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Under GDPR, CCPA, and international data privacy laws, you possess legal rights regarding your personal information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-indigo-400 mb-1">Right to Access</h4>
                  <p className="text-slate-400">Request confirmation and copies of personal data held about you.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-indigo-400 mb-1">Right to Rectification</h4>
                  <p className="text-slate-400">Correct incomplete or inaccurate records in our systems.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-indigo-400 mb-1">Right to Erasure</h4>
                  <p className="text-slate-400">Request complete data deletion ("Right to be Forgotten").</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="font-semibold text-indigo-400 mb-1">Right to Portability</h4>
                  <p className="text-slate-400">Receive your data in a structured, machine-readable JSON/CSV export.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] sm:col-span-2">
                  <h4 className="font-semibold text-indigo-400 mb-1">Right to Object & Opt-Out</h4>
                  <p className="text-slate-400">Object to data processing based on legitimate interests or withdraw consent anytime.</p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Section 6 */}
          <StaggerItem>
            <div id="data-retention" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">6. Data Retention & Destruction</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                We retain personal data only for as long as necessary to fulfill the operational purposes outlined in this policy or as required by applicable tax, audit, and legal mandates.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Active client records are retained for the duration of the service contract plus up to 3 years for legal auditing. Upon contract termination or valid erasure requests, data undergoes automated cryptographic purge protocols and physical disk sanitization.
              </p>
            </div>
          </StaggerItem>

          {/* Section 7 */}
          <StaggerItem>
            <div id="international-transfers" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">7. International Data Transfers</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Loopernode operates globally. Personal data may be transferred to and processed in countries outside your jurisdiction, including the United States, European Economic Area (EEA), and India.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                To guarantee adequate data protection during cross-border transfers, we rely on EU Standard Contractual Clauses (SCCs), UK Addenda, and strict encryption mechanisms compliant with global framework guidelines.
              </p>
            </div>
          </StaggerItem>

          {/* Section 8 */}
          <StaggerItem>
            <div id="childrens-privacy" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">8. Children's Privacy</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Our services are directed exclusively to business enterprises and adults aged 18 and older. We do not knowingly market to or solicit personal data from children under 16. If we discover that a minor under 16 has submitted personal information, we immediately purge the data from our repositories.
              </p>
            </div>
          </StaggerItem>

          {/* Section 9 */}
          <StaggerItem>
            <div id="policy-changes" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">9. Changes to This Privacy Policy</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                We may periodically update this Privacy Policy to reflect regulatory updates or changes in our operational procedures. Material updates will be announced via registered email notifications or prominent banners on our platform at least 30 days prior to implementation.
              </p>
            </div>
          </StaggerItem>

          {/* Section 10 */}
          <StaggerItem>
            <div id="contact-info" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-100">10. Contact Information</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                If you have questions, concerns, or wish to exercise your legal data privacy rights, please reach out to our Data Protection Officer:
              </p>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-400" />
                  <span className="text-slate-200">Email: <a href="mailto:privacy@loopernode.in" className="text-cyan-400 hover:underline font-semibold">privacy@loopernode.in</a></span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-indigo-400 mt-0.5" />
                  <span className="text-slate-300">Address: Loopernode Data Protection Team, Tech Hub Sector V, Kolkata, West Bengal 700091, India</span>
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
            headline="Questions about your data?"
            description="Our Data Protection Team is available to help you understand your rights and manage your privacy preferences."
            primaryCTA={{ label: 'Contact Privacy Team', href: 'mailto:privacy@loopernode.in' }}
            secondaryCTA={{ label: 'View Terms of Service', href: '/terms' }}
          />
        </FadeIn>
      </section>
    </main>
  );
}

