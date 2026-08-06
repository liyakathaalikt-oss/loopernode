import React from 'react';
import Link from 'next/link';
import { FadeUp } from '@/components/animations/motion-wrapper';
import { cn } from '@/lib/utils';

export interface CTABannerProps {
  headline: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  className?: string;
}

export function CTABanner({
  headline,
  description,
  primaryCTA,
  secondaryCTA,
  className,
}: CTABannerProps) {
  return (
    <section className={cn("relative py-24 overflow-hidden rounded-3xl bg-gradient-to-br from-[#6366F1]/20 via-[#111128] to-[#8B5CF6]/20 border border-white/10", className)}>
      {/* Decorative floating blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#06B6D4]/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight leading-tight mb-6">
            {headline}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link prefetch={false}
              href={primaryCTA.href}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              {primaryCTA.label}
            </Link>
            
            {secondaryCTA && (
              <Link prefetch={false}
                href={secondaryCTA.href}
                className="w-full sm:w-auto px-8 py-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
