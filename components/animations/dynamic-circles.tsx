"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, MotionValue, useInView } from 'framer-motion';

// Configuration for the floating circles
const CIRCLES = [
  { id: 1, size: 240, top: '10%', left: '15%', color: '#0DBED6', speedX: 0.03, speedY: 0.04, floatDuration: 6 },
  { id: 2, size: 120, top: '65%', left: '8%', color: '#0A4BF1', speedX: -0.05, speedY: -0.03, floatDuration: 5 },
  { id: 3, size: 320, top: '40%', left: '75%', color: '#0A4BF1', speedX: 0.02, speedY: -0.05, floatDuration: 8 },
  { id: 4, size: 180, top: '80%', left: '85%', color: '#0DBED6', speedX: -0.04, speedY: 0.02, floatDuration: 7 },
  { id: 5, size: 80, top: '25%', left: '60%', color: '#0DBED6', speedX: 0.06, speedY: 0.05, floatDuration: 4 },
  { id: 6, size: 150, top: '15%', left: '80%', color: '#0DBED6', speedX: -0.03, speedY: 0.06, floatDuration: 5.5 },
  { id: 7, size: 280, top: '70%', left: '30%', color: '#0A4BF1', speedX: 0.04, speedY: -0.02, floatDuration: 7.5 },
  { id: 8, size: 90, top: '50%', left: '12%', color: '#0DBED6', speedX: 0.05, speedY: 0.03, floatDuration: 4.5 },
  { id: 9, size: 200, top: '85%', left: '55%', color: '#0A4BF1', speedX: -0.02, speedY: -0.06, floatDuration: 6.5 },
  { id: 10, size: 110, top: '5%', left: '45%', color: '#0A4BF1', speedX: 0.06, speedY: -0.04, floatDuration: 5 },
  { id: 11, size: 350, top: '20%', left: '-5%', color: '#0DBED6', speedX: 0.01, speedY: 0.02, floatDuration: 9 },
  { id: 12, size: 140, top: '55%', left: '92%', color: '#0DBED6', speedX: -0.05, speedY: -0.05, floatDuration: 6 },
];

function Circle({ 
  circle, 
  smoothMouseX, 
  smoothMouseY, 
  prefersReducedMotion,
  isInView
}: { 
  circle: typeof CIRCLES[0], 
  smoothMouseX: MotionValue<number>, 
  smoothMouseY: MotionValue<number>,
  prefersReducedMotion: boolean | null,
  isInView: boolean
}) {
  const translateX = useTransform(smoothMouseX, (v) => prefersReducedMotion ? 0 : v * circle.speedX);
  const translateY = useTransform(smoothMouseY, (v) => prefersReducedMotion ? 0 : v * circle.speedY);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: circle.size,
        height: circle.size,
        top: circle.top,
        left: circle.left,
        border: `5px solid ${circle.color}`,
        opacity: 0.25, // Fallback base opacity
        x: translateX,
        y: translateY,
      }}
      animate={
        prefersReducedMotion || !isInView
          ? {}
          : {
              y: [0, -15, 0],
              x: [0, 10, 0],
              scale: [1, 1.03, 1],
              opacity: [0.25, 0.35, 0.25]
            }
      }
      transition={{
        duration: circle.floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse",
      }}
    />
  );
}

export function DynamicCircles() {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Pause animations when hero is scrolled out of view for performance
  const isInView = useInView(containerRef, { once: false, margin: "200px" });

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax effect (low intensity, gentle response)
  const springConfig = { damping: 40, stiffness: 80, mass: 2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Disable parallax interaction on mobile/tablet (< 768px)
      // or if component is out of view
      if (window.innerWidth < 768 || !isInView) return;

      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      
      mouseX.set(normalizedX * 60); // Reduced displacement intensity
      mouseY.set(normalizedY * 60);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion, isInView]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {CIRCLES.map((circle) => (
        <Circle 
          key={circle.id} 
          circle={circle} 
          smoothMouseX={smoothMouseX} 
          smoothMouseY={smoothMouseY} 
          prefersReducedMotion={prefersReducedMotion} 
          isInView={isInView}
        />
      ))}
    </div>
  );
}
