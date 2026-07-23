'use client';

import React from 'react';
import { StaggerItem } from '@/components/animations/motion-wrapper';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
  className?: string;
}

export function FeatureCard({ icon, title, description, index = 0, className }: FeatureCardProps) {
  return (
    <StaggerItem className={cn('h-full group', className)}>
      <div className="relative h-full p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] transition-all duration-300 overflow-hidden hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] hover:-translate-y-1">
        {/* Hover Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/0 via-transparent to-[#06B6D4]/0 group-hover:from-[#6366F1]/20 group-hover:to-[#06B6D4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
        
        <div className="relative z-10 flex flex-col h-full">
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
      </div>
    </StaggerItem>
  );
}
