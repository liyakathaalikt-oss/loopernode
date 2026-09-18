'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion';

interface RectProps {
  id: number;
  width: number;
  height: number;
  top: string;
  left: string;
  rotation: number;
  delay: number;
  duration: number;
  depth: number;
}

function FloatingRect({ 
  rect, 
  smoothMouseX, 
  smoothMouseY 
}: { 
  rect: RectProps, 
  smoothMouseX: MotionValue<number>, 
  smoothMouseY: MotionValue<number> 
}) {
  const xMove = useTransform(smoothMouseX, [-1, 1], [-80 * rect.depth, 80 * rect.depth]);
  const yMove = useTransform(smoothMouseY, [-1, 1], [-80 * rect.depth, 80 * rect.depth]);
  
  return (
    <motion.div
      className="absolute"
      style={{
        top: rect.top,
        left: rect.left,
        x: xMove,
        y: yMove,
      }}
    >
      <motion.div
        className="border border-[#1389DE] opacity-40 rounded-[10px]"
        style={{
          width: rect.width,
          height: rect.height,
          rotate: rect.rotation,
        }}
        animate={{
          y: ["-15px", "15px", "-15px"],
          x: ["-10px", "10px", "-10px"],
          rotate: [rect.rotation - 5, rect.rotation + 5, rect.rotation - 5],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: rect.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: rect.delay,
        }}
      />
    </motion.div>
  );
}

export function FloatingRectangles() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll parallax for the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  // Mouse parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate deterministic rectangles to match the reference image
  // The image shows hollow rounded rectangles in blue, slightly tilted.
  const rectangles = Array.from({ length: 45 }).map((_, i) => {
    // Semi-random deterministic values based on index
    const width = 40 + (i % 5) * 12; // 40 to 88
    const height = 30 + (i % 4) * 8; // 30 to 54
    const top = `${(i * 17) % 110 - 5}%`; // -5% to 105% to allow edge bleeding
    const left = `${(i * 23) % 110 - 5}%`;
    const rotation = -30 + (i % 7) * 10; // -30 to 30 degrees
    const delay = (i % 10) * -1.5; 
    const duration = 15 + (i % 6) * 3; // 15s to 30s float cycle
    const depth = 0.2 + (i % 4) * 0.3; // Parallax multiplier

    return { id: i, width, height, top, left, rotation, delay, duration, depth };
  });

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div style={{ y: scrollY }} className="absolute inset-0 w-full h-full">
        {rectangles.map((rect) => (
          <FloatingRect 
            key={rect.id} 
            rect={rect} 
            smoothMouseX={smoothMouseX} 
            smoothMouseY={smoothMouseY} 
          />
        ))}
      </motion.div>
      
      {/* Background radial gradient to give some depth if needed, but keeping original dark bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A1B]/50 to-[#0A0A1B]" />
    </div>
  );
}
