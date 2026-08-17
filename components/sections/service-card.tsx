'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { StaggerItem } from '@/components/animations/motion-wrapper';
import { cn } from '@/lib/utils';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  href: string;
  index?: number;
  className?: string;
}

export function ServiceCard({ title, description, icon, features, href, index = 0, className }: ServiceCardProps) {
  return (
    <StaggerItem className={cn('h-full', className)}>
      <Link  href={href} className="block h-full group">
        <div className="relative h-full flex flex-col p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.05]">
          {/* Subtle Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6366F1]/0 to-[#8B5CF6]/0 group-hover:from-[#6366F1]/10 group-hover:to-[#8B5CF6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
          
          {/* Border Glow */}
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#6366F1]/30 transition-colors duration-500 pointer-events-none" />

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-[#8B5CF6] border border-white/10">
              {icon}
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-100 tracking-tight leading-snug group-hover:text-[#6366F1] transition-colors duration-300">
              {title}
            </h3>
          </div>

          <p className="text-slate-400 mb-8 leading-relaxed flex-grow">
            {description}
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                <Check className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-sm font-semibold text-[#6366F1] mt-auto">
            <span>Explore {title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </StaggerItem>
  );
}
