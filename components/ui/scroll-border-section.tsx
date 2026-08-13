"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollBorderSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  scrollThreshold?: number;
}

export function ScrollBorderSection({ 
  children, 
  className,
  scrollThreshold = 10,
  ...props 
}: ScrollBorderSectionProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  return (
    <section 
      className={cn(
        className,
        "border-b transition-colors duration-500"
      )}
      style={{
        borderBottomColor: scrolled ? 'rgba(255,255,255,0.05)' : 'transparent',
        ...props.style
      }}
      {...props}
    >
      {children}
    </section>
  );
}
