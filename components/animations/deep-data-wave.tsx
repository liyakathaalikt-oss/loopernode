"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function DeepDataWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion || !isInView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Grid configuration
    const rows = 40;
    const cols = 60;
    const spacing = 45;
    const perspective = 300;
    
    // Wave configuration
    const speed = 0.015;
    const waveHeight = 70;
    const waveFrequencyX = 0.08;
    const waveFrequencyZ = 0.12;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 150; // Push down to act as a floor

      // Draw the wave grid
      for (let z = 1; z < rows; z++) {
        for (let x = -cols / 2; x < cols / 2; x++) {
          
          // Calculate base 3D coordinates
          const actualX = x * spacing;
          const actualZ = z * spacing;
          
          // Calculate undulating Y based on sine waves and time
          const yOffset = 
            Math.sin(x * waveFrequencyX + time) * waveHeight + 
            Math.cos(z * waveFrequencyZ + time) * waveHeight;
            
          // 3D to 2D Projection
          const scale = perspective / (perspective + actualZ);
          const px = centerX + actualX * scale;
          const py = centerY + yOffset * scale - (actualZ * 0.4); // slant upwards for perspective

          // Calculate distance for fading out nodes in the distance
          const opacity = Math.max(0, 1 - (z / rows));
          
          // Interpolate color based on height to give a heat/depth map feel
          // Peaks are cyan (#0DBED6), valleys are deep blue (#0A4BF1)
          const heightRatio = (yOffset + waveHeight * 2) / (waveHeight * 4);
          
          ctx.beginPath();
          ctx.arc(px, py, 1.8 * scale, 0, Math.PI * 2);
          
          if (heightRatio > 0.5) {
             ctx.fillStyle = `rgba(13, 190, 214, ${opacity * 0.9})`; // #0DBED6
          } else {
             ctx.fillStyle = `rgba(10, 75, 241, ${opacity * 0.7})`; // #0A4BF1
          }
          
          ctx.fill();
        }
      }

      time -= speed; // Flow forward
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* We apply a slight gradient mask to make it fade smoothly at the top */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A1B] via-transparent to-transparent z-10 opacity-80" />
      <canvas ref={canvasRef} className="w-full h-full opacity-70" />
    </div>
  );
}
