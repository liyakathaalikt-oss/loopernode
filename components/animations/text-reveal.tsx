import React from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  return (
    <span
      className={cn('inline-block animate-fade-up opacity-0', className)}
      style={{ 
        animationFillMode: 'forwards',
        animationDelay: `${delay}s` 
      }}
    >
      {text}
    </span>
  );
}
