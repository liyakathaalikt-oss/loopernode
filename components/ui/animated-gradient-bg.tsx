'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedGradientBg() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.2)_0%,_transparent_70%)] blur-3xl mix-blend-screen"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)] blur-3xl mix-blend-screen"
      />

      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 100, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)] blur-3xl mix-blend-screen"
      />
    </div>
  );
}
