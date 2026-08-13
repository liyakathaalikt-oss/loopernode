"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

// Configuration for the floating circles
const CIRCLES = [
  { id: 1, size: 240, top: '10%', left: '15%', color: '#0DBED6', speedX: 0.03, speedY: 0.04, floatDuration: 6 },
  { id: 2, size: 120, top: '65%', left: '8%', color: '#0A4BF1', speedX: -0.05, speedY: -0.03, floatDuration: 5 },
  { id: 3, size: 320, top: '40%', left: '75%', color: '#0A4BF1', speedX: 0.02, speedY: -0.05, floatDuration: 8 },
  { id: 4, size: 180, top: '80%', left: '85%', color: '#0DBED6', speedX: -0.04, speedY: 0.02, floatDuration: 7 },
  { id: 5, size: 80, top: '25%', left: '60%', color: '#0DBED6', speedX: 0.06, speedY: 0.05, floatDuration: 4 },
];

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
      
      mouseX.set(normalizedX * 100); // 100px max displacement
      mouseY.set(normalizedY * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {CIRCLES.map((circle) => {
        // Individual parallax transforms based on mouse position and circle speed
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const translateX = useTransform(smoothMouseX, (v) => prefersReducedMotion ? 0 : v * circle.speedX);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const translateY = useTransform(smoothMouseY, (v) => prefersReducedMotion ? 0 : v * circle.speedY);

        return (
          <motion.div
            key={circle.id}
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
      })}
    </div>
  );
}
