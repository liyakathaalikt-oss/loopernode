/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { CTABanner } from '@/components/sections/cta-banner';
import { FeatureCard } from '@/components/sections/feature-card';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';
import { Cookie, FileText, Shield, Eye, Globe, Mail, Lock, Scale, CheckCircle2 } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Cookie Policy',
  description: 'Understand how Loopernode uses cookies, web beacons, and tracking technologies to improve platform performance and user experience.',
  path: '/cookie',
});

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      title: 'Essential Cookies',
      icon: <Lock className="w-6 h-6 text-indigo-400" />,
      description: 'Strictly necessary for core platform functionality, security authentication, session management, and load balancing. These cannot be disabled.',
    },
    {
      title: 'Analytics Cookies',
      icon: <Eye className="w-6 h-6 text-indigo-400" />,
      description: 'Collect anonymous data on how visitors interact with our website, helping us measure page load times, error rates, and traffic sources.',
    },
    {
      title: 'Functional Cookies',
      icon: <Shield className="w-6 h-6 text-indigo-400" />,
      description: 'Remember your custom preferences, such as selected region, language settings, and interface configurations across visits.',
    },
    {
      title: 'Marketing Cookies',
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      description: 'Used to measure campaign performance, track conversion channels, and deliver relevant communications across partner networks.',
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="Cookie"
          highlightedText="Policy"
          description="Last updated: January 2025 — Learn how Loopernode utilizes cookies and tracking technologies to optimize performance and protect data."
          primaryCTA={{ label: 'Cookie Types', href: '#types-of-cookies' }}
          secondaryCTA={{ label: 'Manage Cookies', href: '#manage-cookies' }}
        />
      </section>

      {/* Main Section 1: What Are Cookies */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Cookie className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-100">What Are Cookies?</h2>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4 text-base md:text-lg">
                Cookies are small text files placed on your computer, mobile phone, or tablet when you browse websites. They are widely used to make websites work efficiently, provide personalized experiences, and report performance insights to site owners.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Cookies may be <strong>"Session Cookies"</strong> (which expire when you close your browser) or <strong>"Persistent Cookies"</strong> (which remain on your device for a specified period or until manually cleared). First-party cookies are set directly by Loopernode, while third-party cookies are served by trusted analytics or security partners.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Main Section 2: Types of Cookies We Use */}
      <section id="types-of-cookies" className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5 scroll-mt-20">
        <FadeUp>
          <SectionTitle
            eyebrow="COOKIE CATEGORIES"
            title="Types of Cookies We"
            highlightedWord="Deploy"
            description="We categorize cookies based on their technical function and operational necessity."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {cookieTypes.map((type, idx) => (
            <FeatureCard
              key={idx}
              icon={type.icon}
              title={type.title}
              description={type.description}
            />
          ))}
        </StaggerContainer>

        {/* Detailed Breakdown */}
        <div className="mt-12 max-w-4xl mx-auto space-y-4">
          <FadeUp>
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <h3 className="font-bold text-slate-100 text-lg mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Essential & Security Cookies Details
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Includes session tokens (e.g., <code className="text-cyan-400">__session</code>, <code className="text-cyan-400">csrf_token</code>) necessary to verify user log-in state, prevent cross-site request forgery attacks, and route encrypted traffic to appropriate server nodes.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <h3 className="font-bold text-slate-100 text-lg mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Analytics & Performance Details
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Utilizes aggregated identifiers (e.g., <code className="text-cyan-400">_ga</code>, <code className="text-cyan-400">_gid</code>) to measure page visit frequency, bounce rates, and navigation pathways, enabling us to continuously refine our AI platform documentation and UI.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Main Section 3 & 4: Management & Third Party */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* How to Manage Cookies */}
          <FadeUp>
            <div id="manage-cookies" className="scroll-mt-28 p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-heading text-slate-100">How to Manage & Disable Cookies</h2>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                You have the right to accept or decline non-essential cookies. You can exercise your preferences through your browser settings or our automated banner.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h3 className="font-semibold text-indigo-400 mb-2">Browser Controls</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Most web browsers (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) allow you to block or delete cookies via Privacy & Security settings menus.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h3 className="font-semibold text-indigo-400 mb-2">Impact of Disabling</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Please note that blocking essential cookies may disrupt access to secure client portals, authenticated API dashboards, or saved preference settings.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Third-Party Cookies */}
          <FadeUp>
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-heading text-slate-100">Third-Party Cookies & Integrations</h2>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                In addition to our first-party cookies, trusted third-party service providers (such as Google Analytics, Cloudflare, and Stripe) may set cookies on your device when you interact with our platform.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                These third parties operate under their own independent privacy policies. We encourage you to review their respective disclosures for details on their data practices and opt-out mechanisms.
              </p>
            </div>
          </FadeUp>

          {/* Updates to This Policy */}
          <FadeUp>
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-heading text-slate-100">Updates to This Policy</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in cookie usage, browser technology standards, or regulatory guidelines. Any modifications will be posted here with an updated "Last Updated" timestamp.
              </p>
            </div>
          </FadeUp>

          {/* Contact Section */}
          <FadeUp>
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-heading text-slate-100">Contact Us</h2>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                If you have questions regarding our use of cookies or tracking technologies, please contact our Data Protection Team:
              </p>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-400" />
                  <span className="text-slate-200">Email: <a href="mailto:privacy@loopernode.in" className="text-cyan-400 hover:underline font-semibold">privacy@loopernode.in</a></span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-indigo-400 mt-0.5" />
                  <span className="text-slate-300">HQ Address: Loopernode Privacy Office, Tech Hub Sector V, Kolkata, WB 700091, India</span>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <FadeIn>
          <CTABanner
            headline="Manage your cookie preferences"
            description="Learn how to customize your browser settings or contact our privacy team for assistance with data preferences."
            primaryCTA={{ label: 'Contact Privacy Officer', href: 'mailto:privacy@loopernode.in' }}
            secondaryCTA={{ label: 'View Privacy Policy', href: '/privacy' }}
          />
        </FadeIn>
      </section>
    </main>
  );
}
