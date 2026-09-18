'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useState } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    // Check user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        // If reduced motion is preferred, disable the smoothing effect (lerp = 1)
        lerp: isReducedMotion ? 1 : 0.08,
        duration: isReducedMotion ? 0 : 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing curve
        smoothWheel: !isReducedMotion,
        wheelMultiplier: 1, // Standard, predictable wheel speed
        touchMultiplier: 2, // Responsive touch scrolling
        syncTouch: true, // Native-feeling touch synchronization
      }}
    >
      {children}
    </ReactLenis>
  );
}
