'use client';

import React from 'react';
import { FadeUp } from '@/components/animations/motion-wrapper';
import { cn } from '@/lib/utils';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("relative container mx-auto px-4 py-12", className)}>
      {/* Vertical line - hidden on mobile, shown on md+ */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

      <div className="space-y-12 md:space-y-0 relative">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              
              {/* Glowing Dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#111128] border-2 border-[#6366F1] shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10 group-hover:scale-150 group-hover:bg-[#6366F1] transition-all duration-300" />
              
              {/* Spacer for desktop alignment */}
              <div className="hidden md:block w-1/2" />

              <div className={cn(
                "w-full md:w-[45%]",
                isEven ? "md:pr-12 md:text-right" : "md:pl-12"
              )}>
                <FadeUp delay={index * 0.1}>
                  <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl hover:bg-white/[0.05] transition-colors relative">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#6366F1]/20 text-[#6366F1] text-sm font-bold mb-4 font-mono">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold text-slate-100 font-heading mb-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-400">
                      {event.description}
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
