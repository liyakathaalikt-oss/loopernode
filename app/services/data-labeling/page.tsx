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
import { dataLabelingServices, dataLabelingOverview } from "@/content/services/data-labeling";
import { dataLabelingFAQs } from "@/content/faqs";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "AI Data Labeling Services | Loopernode",
  description: "High-precision AI data labeling and annotation services for computer vision, NLP, and generative AI models.",
  path: "/services/data-labeling",
});

function getIcon(iconName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.PenTool;
  return <IconComponent className="w-8 h-8 text-cyan-500" />;
}

export default function DataLabelingPage() {
  const serviceSchema = generateServiceSchema({
    name: "AI Data Labeling Services",
    description: dataLabelingOverview.description,
    url: "/services/data-labeling",
    serviceType: "Data Labeling"
  });

  const faqSchema = generateFAQSchema(dataLabelingFAQs);

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
          { label: "Data Labeling", href: "/services/data-labeling" }
        ]} />
      </div>

      <Hero
        headline={dataLabelingOverview.title}
        highlightedText=""
        description={dataLabelingOverview.heroDescription}
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
      />

      <section className="container-custom max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <AEOBlock 
          question={dataLabelingOverview.aeo.question} 
          answer={dataLabelingOverview.aeo.answer} 
        />
      </section>

      <section className="bg-white/[0.02] border-y border-white/5 py-16 mt-8">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {dataLabelingOverview.stats.map((stat, i) => (
              <StaggerItem key={i}>
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="container-custom max-w-7xl mx-auto px-6 py-20 md:py-28">
        <FadeUp>
          <SectionTitle title="Our Annotation Capabilities" description="Precision at scale" />
          <p className="text-slate-400 max-w-3xl mb-12 text-lg">
            {dataLabelingOverview.description}
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dataLabelingServices.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={getIcon(service.icon)}
                href={`/services/data-labeling/${service.slug}`}
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
            <FAQAccordion faqs={dataLabelingFAQs} />
          </div>
        </div>
      </section>

      {/* Internal Linking SEO Block */}
      <section className="py-16 container-custom max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-2xl font-bold text-white mb-6">Next Steps in the AI Data Pipeline</h2>
          <p className="text-slate-400 mb-8">
            With your data perfectly annotated, the final step is ensuring the dataset is structurally processed, normalized, and formatted for immediate machine learning ingestion.
          </p>
          <Link href="/services/data-processing" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-lg">
            Explore AI Data Processing Services <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </FadeUp>
      </section>

      <CTABanner
        headline="Require expert-level annotations?"
        description="Our domain experts and specialized tools ensure pixel-perfect accuracy for your AI models."
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
      />
    </main>
  );
}
