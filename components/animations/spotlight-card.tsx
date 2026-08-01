'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({ 
  children, 
  className,
  spotlightColor = 'rgba(99, 102, 241, 0.15)' // Default indigo glow
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the mouse movement for a premium feel
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    // Calculate mouse position relative to the card's center for a natural effect
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative h-full rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5",
        "transition-transform duration-500 ease-out hover:-translate-y-1",
        className
      )}
    >
      {/* The glowing spotlight effect that follows the mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${springX}px ${springY}px,
              ${spotlightColor},
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative h-full z-10 p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
