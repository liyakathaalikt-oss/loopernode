/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, MessageSquare, Zap } from "lucide-react";

import { Hero } from "@/components/sections/hero";
import { ContactForm } from "@/components/sections/contact-form";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTABanner } from "@/components/sections/cta-banner";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";
import { generatePageMetadata } from "@/lib/metadata";
import { contactFAQs } from "@/content/faqs";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us | Loopernode",
  description: "Get in touch with Loopernode. We have global offices in San Francisco, London, and Singapore ready to help you with your AI data needs.",
  path: "/contact",
});

const offices = [
  {
    city: "Bengaluru, India",
    address: "Bengaluru, Karnataka, India",
    phone: "+91 7975265394",
    email: "info@loopernode.in",
    timezone: "IST",
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1 bg-dark-950">
      <Hero
        headline="Get in Touch"
        highlightedText=""
        description="Ready to scale your AI initiatives with high-quality training data? Start a conversation with our global team of experts today."
        primaryCTA={{ label: "Message Us", href: "#" }}
      />

      <section className="py-20 md:py-28 relative z-10">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Contact Info */}
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
                  <Zap className="w-4 h-4" />
                  24-Hour Response Guarantee
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-50 mb-6">
                  Global Presence, Local Expertise
                </h2>
                
                <p className="text-slate-300 text-lg mb-12">
                  Whether you're looking for enterprise data solutions, have a question about our platform, or need technical support, our team is ready to help.
                </p>
              </FadeUp>

              <StaggerContainer className="space-y-6 mb-12">
                {offices.map((office, index) => (
                  <StaggerItem key={index}>
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-colors">
                      <h3 className="text-xl font-bold text-slate-50 mb-4">{office.city}</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-slate-300">
                          <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                          <span>{office.address}</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-300">
                          <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                          <span>{office.phone}</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-300">
                          <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                          <a href={`mailto:${office.email}`} className="hover:text-primary-400 transition-colors">
                            {office.email}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <FadeUp delay={0.3}>
                <div className="backdrop-blur-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Clock className="w-6 h-6 text-primary-400" />
                    <h3 className="text-lg font-bold text-slate-50">Business Hours</h3>
                  </div>
                  <p className="text-slate-300">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM (Local Time)
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                       <p className="text-sm text-slate-400 mb-1">General Inquiries</p>
                       <a href="mailto:info@loopernode.in" className="text-slate-50 font-medium hover:text-primary-400 transition-colors">info@loopernode.in</a>
                     </div>
                     <div>
                       <p className="text-sm text-slate-400 mb-1">Support</p>
                       <a href="mailto:liya@loopernode.in" className="text-slate-50 font-medium hover:text-primary-400 transition-colors">liya@loopernode.in</a>
                     </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:sticky lg:top-32">
              <FadeUp delay={0.2}>
                <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <MessageSquare className="w-6 h-6 text-primary-400" />
                      <h3 className="text-2xl font-bold text-slate-50">Send us a message</h3>
                    </div>
                    <ContactForm />
                  </div>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* Global Map Placeholder */}
      <section className="py-20 bg-white/[0.02] border-y border-white/[0.05]">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <SectionTitle
            title="Our Global Offices"
            description="Strategically located to serve enterprise clients worldwide with around-the-clock support."
          />
          <FadeUp>
            <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/[0.08] relative bg-dark-900 mt-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/20 via-dark-900 to-dark-950" />
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")' }} />
              <div className="relative z-10 text-center">
                <MapPin className="w-16 h-16 text-primary-500/50 mx-auto mb-4 animate-bounce" />
                <p className="text-xl font-medium text-slate-400">Interactive Map Visualization</p>
                <p className="text-sm text-slate-500 mt-2">Global Data Centers & Offices</p>
              </div>
              
              {/* Decorative map points */}
              <div className="absolute top-[30%] left-[20%] w-3 h-3 rounded-full bg-primary-400 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
              <div className="absolute top-[25%] left-[45%] w-3 h-3 rounded-full bg-secondary-400 shadow-[0_0_15px_rgba(139,92,246,0.8)]" />
              <div className="absolute top-[50%] left-[75%] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-custom max-w-3xl mx-auto px-6">
          <SectionTitle
            title="Frequently Asked Questions"
            description="Find quick answers to common questions about working with Loopernode."
          />
          <div className="mt-12">
             <FAQAccordion faqs={contactFAQs} />
          </div>
        </div>
      </section>

      <CTABanner 
        headline="Ready to build better AI?" 
        description="Join companies that trust Loopernode for their data needs."
        primaryCTA={{ label: 'Start Your Project', href: '/services' }}
      />
    </main>
  );
}
