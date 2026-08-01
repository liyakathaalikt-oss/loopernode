'use client';

import React from 'react';
import { StaggerItem } from '@/components/animations/motion-wrapper';
import { cn } from '@/lib/utils';

import { SpotlightCard } from '@/components/animations/spotlight-card';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
  className?: string;
}

export function FeatureCard({ icon, title, description, index = 0, className }: FeatureCardProps) {
  return (
    <StaggerItem className={cn('h-full', className)}>
      <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.15)">
        <div className="flex flex-col h-full group">
          <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#06B6D4] mb-6 group-hover:scale-110 group-hover:text-[#6366F1] transition-all duration-300">
            {icon}
          </div>
          
          <h3 className="text-xl font-bold text-slate-100 font-heading mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>
          
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        </div>
      </SpotlightCard>
    </StaggerItem>
  );
}
