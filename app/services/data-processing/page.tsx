import { Hero } from "@/components/sections/hero";
import { SectionTitle } from "@/components/sections/section-title";
import { ServiceCard } from "@/components/sections/service-card";
import { StatCounter } from "@/components/sections/stat-counter";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTABanner } from "@/components/sections/cta-banner";
import { AEOBlock } from "@/components/sections/aeo-block";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { generatePageMetadata } from "@/lib/metadata";
import { generateServiceSchema, generateFAQSchema } from "@/lib/schema";
import { dataProcessingServices, dataProcessingOverview } from "@/content/services/data-processing";
import { dataProcessingFAQs } from "@/content/faqs";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "AI Data Processing Services | Loopernode",
  description: "Advanced data cleansing, structuring, and enrichment services for machine learning and generative AI pipelines.",
  path: "/services/data-processing",
});

function getIcon(iconName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Workflow;
  return <IconComponent className="w-8 h-8 text-violet-500" />;
}

export default function DataProcessingPage() {
  const serviceSchema = generateServiceSchema({
    name: "AI Data Processing Services",
    description: dataProcessingOverview.description,
    url: "/services/data-processing",
    serviceType: "Data Processing"
  });

  const faqSchema = generateFAQSchema(dataProcessingFAQs);

  return (
    <main className="flex min-h-screen flex-col bg-dark-950 text-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
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

      <section className="container-custom max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <AEOBlock 
          question={dataProcessingOverview.aeo.question} 
          answer={dataProcessingOverview.aeo.answer} 
        />
      </section>

      <section className="bg-white/[0.02] border-y border-white/5 py-16 mt-8">
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
                features={service.features.slice(0, 3).map(f => f.title)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="bg-white/[0.02] border-y border-white/5 py-20 md:py-28">
        <div className="container-custom max-w-3xl mx-auto px-6">
          <FadeUp>
            <SectionTitle title="Frequently Asked Questions" align="center" />
          </FadeUp>
          <div className="mt-12">
            <FAQAccordion faqs={dataProcessingFAQs} />
          </div>
        </div>
      </section>

      {/* Internal Linking SEO Block */}
      <section className="py-16 container-custom max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Train Your Models?</h2>
          <p className="text-slate-400 mb-8">
            Now that your data is fully collected, precision-labeled, and structurally processed, it is ready to be ingested into your machine learning pipelines.
          </p>
          <Link href="/contact" className="inline-flex items-center text-violet-400 hover:text-violet-300 font-semibold transition-colors text-lg">
            Connect With Our AI Experts <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </FadeUp>
      </section>

      <CTABanner
        headline="Ready to clean your datasets?"
        description="Transform your raw data into structured intelligence ready for seamless model integration."
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
      />
    </main>
  );
}
