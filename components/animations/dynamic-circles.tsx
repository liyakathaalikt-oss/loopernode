"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, MotionValue } from 'framer-motion';

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
  prefersReducedMotion 
}: { 
  circle: typeof CIRCLES[0], 
  smoothMouseX: MotionValue<number>, 
  smoothMouseY: MotionValue<number>,
  prefersReducedMotion: boolean | null
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
        opacity: 0.25,
        x: translateX,
        y: translateY,
      }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -15, 0],
              x: [0, 10, 0],
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

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax effect
  const springConfig = { damping: 30, stiffness: 100, mass: 2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      
      mouseX.set(normalizedX * 100);
      mouseY.set(normalizedY * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {CIRCLES.map((circle) => (
        <Circle 
          key={circle.id} 
          circle={circle} 
          smoothMouseX={smoothMouseX} 
          smoothMouseY={smoothMouseY} 
          prefersReducedMotion={prefersReducedMotion} 
        />
      ))}
    </div>
  );
}
