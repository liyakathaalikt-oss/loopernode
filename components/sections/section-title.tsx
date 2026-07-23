import React from 'react';
import { FadeUp } from '@/components/animations/motion-wrapper';
import { cn } from '@/lib/utils';

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  highlightedWord?: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  highlightedWord,
  description,
  align = 'center',
  className,
}: SectionTitleProps) {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <FadeUp className={cn('mb-16 max-w-3xl', alignClasses, className)}>
      {eyebrow && (
        <span className="block text-sm font-semibold tracking-wider uppercase text-[#6366F1] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-slate-100 mb-6">
        {title}{' '}
        {highlightedWord && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#06B6D4]">
            {highlightedWord}
          </span>
        )}
      </h2>
      {description && (
        <p className="text-lg text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </FadeUp>
  );
}
