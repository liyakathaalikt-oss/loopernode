"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function AuroraOrbs() {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // The base duration for the breathing/morphing effect
  const duration = prefersReducedMotion ? 0 : 15;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050510]">
      {/* 
        We use heavily blurred, large border-radius absolute divs 
        and animate their position/scale to simulate fluid, morphing light.
      */}
      
      {/* Orb 1: Cyan (Top Left) */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(13, 190, 214, 0.4) 0%, rgba(13, 190, 214, 0) 70%)',
          filter: 'blur(80px)',
        }}
        animate={prefersReducedMotion ? {} : {
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orb 2: Deep Blue (Bottom Right) */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(10, 75, 241, 0.3) 0%, rgba(10, 75, 241, 0) 70%)',
          filter: 'blur(100px)',
        }}
        animate={prefersReducedMotion ? {} : {
          x: [0, -150, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: duration * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Orb 3: Purple (Center) */}
      <motion.div
        className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0) 70%)',
          filter: 'blur(90px)',
        }}
        animate={prefersReducedMotion ? {} : {
          x: [0, 150, -100, 0],
          y: [0, 150, -100, 0],
          scale: [1, 1.5, 0.7, 1],
        }}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Orb 4: Indigo/Secondary Blue (Top Right) */}
      <motion.div
        className="absolute top-[-15%] right-[10%] w-[45vw] h-[45vw] rounded-full mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%)',
          filter: 'blur(80px)',
        }}
        animate={prefersReducedMotion ? {} : {
          x: [0, -100, 100, 0],
          y: [0, 100, -100, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: duration * 1.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </div>
  );
}
