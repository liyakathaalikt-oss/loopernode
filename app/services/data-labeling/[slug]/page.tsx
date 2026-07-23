import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { SectionTitle } from "@/components/sections/section-title";
import { FeatureCard } from "@/components/sections/feature-card";
import { CTABanner } from "@/components/sections/cta-banner";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { generatePageMetadata } from "@/lib/metadata";
import { dataLabelingServices } from "@/content/services/data-labeling";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return dataLabelingServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = dataLabelingServices.find((s) => s.slug === slug);
  if (!service) return {};

  return generatePageMetadata({
    title: `${service.title} | Data Labeling | NovaMind AI`,
    description: service.description,
    path: `/services/data-labeling/${slug}`,
  });
}

export default async function DataLabelingServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = dataLabelingServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = dataLabelingServices
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col bg-dark-950 text-slate-50">
      <div className="container-custom max-w-7xl mx-auto px-6 pt-24 pb-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Data Labeling", href: "/services/data-labeling" },
          { label: service.title, href: `/services/data-labeling/${service.slug}` }
        ]} />
      </div>

      <Hero
        headline={service.title}
        highlightedText=""
        description={service.description}
        primaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />

      <section className="container-custom max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeUp>
            <SectionTitle title="Overview" />
            <div className="prose prose-invert max-w-none prose-lg text-slate-300">
              <p>{service.longDescription}</p>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="glass-card backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-6 font-heading">Key Benefits</h3>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-cyan-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-white/[0.02] border-y border-white/5 py-20">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <FadeUp>
            <SectionTitle title="Features" align="center" />
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {service.features.map((feature, idx) => (
              <StaggerItem key={idx}>
                <FeatureCard
                  title={feature}
                  description="High fidelity annotation capabilities designed to meet the rigorous demands of enterprise AI."
                  icon={<CheckCircle2 className="w-6 h-6 text-indigo-400" />}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="container-custom max-w-7xl mx-auto px-6 py-20">
        <FadeUp>
          <SectionTitle title="Common Use Cases" />
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {service.useCases.map((useCase, idx) => (
            <FadeUp key={idx} delay={idx * 0.1}>
              <div className="flex items-center gap-4 p-6 glass-card backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                <span className="text-lg text-slate-200">{useCase}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-white/[0.02] border-t border-white/5 py-20">
          <div className="container-custom max-w-7xl mx-auto px-6">
            <FadeUp>
              <SectionTitle title="Related Services" />
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {relatedServices.map((related) => (
                <Link key={related.slug} href={`/services/data-labeling/${related.slug}`} className="group block">
                  <div className="glass-card backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.05] hover:border-cyan-500/50">
                    <h4 className="text-xl font-semibold mb-2 flex items-center justify-between">
                      {related.title}
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-slate-400 line-clamp-2">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        headline={`Get started with ${service.title}`}
        description="Elevate your model performance with our expert human-in-the-loop annotation services."
        primaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </main>
  );
}
