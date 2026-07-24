import { Hero } from "@/components/sections/hero";
import { SectionTitle } from "@/components/sections/section-title";
import { ServiceCard } from "@/components/sections/service-card";
import { StatCounter } from "@/components/sections/stat-counter";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTABanner } from "@/components/sections/cta-banner";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { generatePageMetadata } from "@/lib/metadata";
import { dataProcessingServices, dataProcessingOverview } from "@/content/services/data-processing";
import { dataProcessingFAQs } from "@/content/faqs";
import * as LucideIcons from "lucide-react";

export const metadata = generatePageMetadata({
  title: "Data Processing Services | Loopernode",
  description: "Advanced data cleansing, structuring, and enrichment services for machine learning pipelines.",
  path: "/services/data-processing",
});

function getIcon(iconName: string) {
  const IconComponent = (LucideIcons as unknown)[iconName] || LucideIcons.Workflow;
  return <IconComponent className="w-8 h-8 text-violet-500" />;
}

export default function DataProcessingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-dark-950 text-slate-50">
      <div className="container-custom max-w-7xl mx-auto px-6 pt-24 pb-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Data Processing", href: "/services/data-processing" }
        ]} />
      </div>

      <Hero
        headline={dataProcessingOverview.title}
        highlightedText=""
        description={dataProcessingOverview.heroDescription}
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
      />

      <section className="bg-white/[0.02] border-y border-white/5 py-16">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {dataProcessingOverview.stats.map((stat, i) => (
              <StaggerItem key={i}>
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="container-custom max-w-7xl mx-auto px-6 py-20 md:py-28">
        <FadeUp>
          <SectionTitle title="Our Processing Capabilities" description="Structure from chaos" />
          <p className="text-slate-400 max-w-3xl mb-12 text-lg">
            {dataProcessingOverview.description}
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dataProcessingServices.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={getIcon(service.icon)}
                href={`/services/data-processing/${service.slug}`}
                features={service.features.slice(0, 3)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="bg-white/[0.02] border-t border-white/5 py-20 md:py-28">
        <div className="container-custom max-w-3xl mx-auto px-6">
          <FadeUp>
            <SectionTitle title="Frequently Asked Questions" align="center" />
          </FadeUp>
          <div className="mt-12">
            <FAQAccordion faqs={dataProcessingFAQs} />
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to clean your datasets?"
        description="Transform your raw data into structured intelligence ready for seamless model integration."
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
      />
    </main>
  );
}
