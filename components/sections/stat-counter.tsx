'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCounter({ value, suffix = '', label, icon, className }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000; // 2 seconds

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      // easeOutExpo
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(easeProgress * value));

      if (progress < duration) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <div 
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] text-center",
        className
      )}
    >
      {icon && (
        <div className="w-10 h-10 flex items-center justify-center text-[#6366F1] mb-3">
          {icon}
        </div>
      )}
      <div className="text-4xl md:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#06B6D4] mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
