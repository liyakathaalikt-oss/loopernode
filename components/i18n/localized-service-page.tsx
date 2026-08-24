'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Database, Image, Video, FileText, Mic, Box, Shield, BarChart3, Users, Globe2, ArrowRight } from 'lucide-react';

type ServiceType = 'dataAnnotation' | 'dataCollection' | 'dataProcessing';

export function LocalizedServicePage({ service }: { service: ServiceType }) {
  const t = useTranslations(`services.${service}`);
  const cta = useTranslations('cta');

  const showCapabilities = service === 'dataAnnotation';

  const capabilities = showCapabilities ? [
    { icon: Image, title: t('imageAnnotation'), desc: t('imageAnnotationDesc') },
    { icon: Video, title: t('videoAnnotation'), desc: t('videoAnnotationDesc') },
    { icon: FileText, title: t('textAnnotation'), desc: t('textAnnotationDesc') },
    { icon: Mic, title: t('audioAnnotation'), desc: t('audioAnnotationDesc') },
    { icon: Box, title: t('lidarAnnotation'), desc: t('lidarAnnotationDesc') },
  ] : [];

  return (
    <main className="flex min-h-screen flex-col bg-dark-950 text-slate-50">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.1),transparent_70%)]" />
        <div className="container-custom max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-6">
            <Database className="w-4 h-4" />
            <span>{t('title')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
            {t('heroH1')}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mb-8">
            {t('description')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-semibold rounded-xl transition-colors">
              {cta('requestQuote')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-slate-300 rounded-xl transition-colors">
              {cta('learnMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      {service === 'dataAnnotation' && (
        <section className="py-20 border-t border-white/5">
          <div className="container-custom max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">{t('overviewTitle')}</h2>
            <p className="text-lg text-slate-400 max-w-3xl">{t('overviewText')}</p>
          </div>
        </section>
      )}

      {/* Capabilities */}
      {showCapabilities && (
        <section className="py-20 bg-white/[0.02] border-y border-white/5">
          <div className="container-custom max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">{t('capabilitiesTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((cap, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <cap.icon className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
                  <p className="text-slate-400">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Loopernode */}
      {service === 'dataAnnotation' && (
        <section className="py-20">
          <div className="container-custom max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">{t('whyLoopernodeTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, label: t('qualityTitle') },
                { icon: BarChart3, label: t('industriesTitle') },
                { icon: Users, label: 'Enterprise' },
                { icon: Globe2, label: 'Global' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/[0.08]">
                  <item.icon className="w-8 h-8 text-cyan-400 mb-3" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-t border-white/5">
        <div className="container-custom max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{cta('getStarted')}</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">{t('description')}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-semibold rounded-xl transition-colors text-lg">
            {cta('contactSales')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
