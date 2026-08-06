'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { FadeUp } from '@/components/animations/motion-wrapper';
import { cn } from '@/lib/utils';

export interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image?: string;
  className?: string;
}

export function BlogCard({ title, excerpt, date, readTime, category, slug, image, className }: BlogCardProps) {
  return (
    <FadeUp className={cn("h-full", className)}>
      <Link prefetch={false} href={`/blog/${slug}`} className="group block h-full">
        <div className="h-full flex flex-col rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] hover:-translate-y-2">
          {/* Image Area */}
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-[#111128] to-[#1A1A3E]">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6366F1] via-[#111128] to-transparent group-hover:scale-110 transition-transform duration-700" />
            )}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[#6366F1] text-white text-xs font-semibold uppercase tracking-wider">
                {category}
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-slate-100 font-heading mb-3 group-hover:text-[#06B6D4] transition-colors line-clamp-2">
              {title}
            </h3>
            
            <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
              {excerpt}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/10 mt-auto">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </FadeUp>
  );
}
