'use client';

import React from 'react';
import Link from 'next/link';
import { FadeUp, ScaleIn } from '@/components/animations/motion-wrapper';
import { AnimatedGradientBg } from '@/components/ui/animated-gradient-bg';
import { FloatingBadge } from '@/components/ui/floating-badge';
import { cn } from '@/lib/utils';

export interface HeroProps {
  headline: string;
  highlightedText: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  stats?: Array<{ value: string; label: string }>;
  showGradientBg?: boolean;
}

export function Hero({
  headline,
  highlightedText,
  description,
  primaryCTA,
  secondaryCTA,
  stats,
  showGradientBg = true,
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A1B] text-slate-200">
      {/* Background Layer */}
      {showGradientBg && <AnimatedGradientBg />}
      <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] opacity-10" style={{ backgroundSize: '40px 40px' }} />

      {/* Floating Badges */}
      {stats && stats.length > 0 && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden max-w-7xl mx-auto hidden lg:block">
          {stats.map((stat, idx) => {
            const positions = [
              { top: '20%', left: '10%' },
              { top: '60%', right: '15%' },
              { bottom: '25%', left: '20%' },
            ];
            const pos = positions[idx % positions.length];
            return (
              <div key={idx} className="absolute" style={pos}>
                <FloatingBadge value={stat.value} label={stat.label} delay={idx * 0.5} />
              </div>
            );
          })}
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-20 container mx-auto px-6 py-20 text-center max-w-5xl">
        <ScaleIn>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#F8FAFC]">
            {headline}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4]">
              {highlightedText}
            </span>
          </h1>
        </ScaleIn>
        
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>
        </FadeUp>

        <FadeUp delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCTA.href}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold shadow-lg hover:brightness-110 transition-all duration-300 hover:scale-105"
          >
            {primaryCTA.label}
          </Link>
          
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="w-full sm:w-auto px-8 py-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
