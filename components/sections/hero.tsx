import React from 'react';
import Link from 'next/link';
import { StaggerContainer, StaggerItem, ScaleIn } from '@/components/animations/motion-wrapper';
import { AnimatedGradientBg } from '@/components/ui/animated-gradient-bg';
import { NeuralNetwork } from '@/components/animations/neural-network';
import { FloatingBadge } from '@/components/ui/floating-badge';
import { TextReveal } from '@/components/animations/text-reveal';
import { cn } from '@/lib/utils';

export interface HeroProps {
  headline: string;
  highlightedText: string;
  titleLine2?: string;
  headlineClassName?: string;
  description: string;
  primaryCTA: { label: string; href?: string; onClick?: () => void };
  secondaryCTA?: { label: string; href?: string; onClick?: () => void };
  stats?: Array<{ value: string; label: string }>;
  showGradientBg?: boolean;
}

export function Hero({
  headline,
  highlightedText,
  titleLine2,
  headlineClassName,
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
      <NeuralNetwork />
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
      <StaggerContainer className="relative z-20 container mx-auto px-6 py-20 text-center max-w-5xl lg:max-w-7xl flex flex-col items-center justify-center">
        {titleLine2 ? (
          <StaggerItem className="mb-6 flex flex-col items-center justify-center gap-y-3 w-full">
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-[#F8FAFC]">
              <TextReveal text={headline} />
            </h1>
            <div className="font-heading text-3xl md:text-5xl font-bold tracking-tight leading-[1.2] text-[#F8FAFC] flex flex-wrap justify-center gap-x-3 gap-y-2">
              <TextReveal text={titleLine2} />
              <TextReveal 
                text={highlightedText} 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] pb-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
              />
            </div>
          </StaggerItem>
        ) : (
          <StaggerItem className={cn("font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-[#F8FAFC] flex flex-wrap justify-center gap-x-3 gap-y-2", headlineClassName)}>
            <TextReveal text={headline} />
            {highlightedText && (
              <TextReveal 
                text={highlightedText} 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] pb-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
              />
            )}
          </StaggerItem>
        )}
        
        <StaggerItem>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCTA.onClick ? (
              <button
                onClick={primaryCTA.onClick}
                className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-white font-semibold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-[150%] group-hover:animate-shimmer" />
                <span className="relative z-10">{primaryCTA.label}</span>
              </button>
            ) : primaryCTA.href ? (
              <Link prefetch={false}
                href={primaryCTA.href}
                className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-white font-semibold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 block text-center"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-[150%] group-hover:animate-shimmer" />
                <span className="relative z-10">{primaryCTA.label}</span>
              </Link>
            ) : null}
            
            {secondaryCTA && (
              secondaryCTA.onClick ? (
               <button
                  onClick={secondaryCTA.onClick}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-slate-300 font-semibold hover:bg-white/10 hover:text-white hover:border-white/30 hover:-translate-y-1 hover:scale-[1.02] shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
                >
                  {secondaryCTA.label}
                </button>
              ) : secondaryCTA.href ? (
                <Link prefetch={false}
                  href={secondaryCTA.href}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-slate-300 font-semibold hover:bg-white/10 hover:text-white hover:border-white/30 hover:-translate-y-1 hover:scale-[1.02] shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 block text-center"
                >
                  {secondaryCTA.label}
                </Link>
              ) : null
            )}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
