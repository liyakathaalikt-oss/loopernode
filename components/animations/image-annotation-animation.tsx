"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function ImageAnnotationAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsInView(entries[0].isIntersecting),
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion || !isInView) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Load images
    const carImg = new Image();
    carImg.src = '/car-icon.png';
    const pedImg = new Image();
    pedImg.src = '/pedestrian-icon.png';

    const resize = () => {
      if (!canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Dark background
      ctx.fillStyle = '#050510'; 
      ctx.fillRect(0, 0, w, h);

      time += 1; // logical frames
      const cycle = time % 300; // loop every 300 frames (about 5 seconds)

      // Draw subtle dot grid pattern
      ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
      for (let x = 0; x < w; x += 30) {
        for (let y = 0; y < h; y += 30) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Positions and dimensions
      // Pedestrian on left
      const pedW = Math.min(w * 0.15, 120);
      const pedH = pedW * 1.5;
      const pedX = w * 0.2;
      const pedY = h * 0.5 - pedH * 0.4;

      // Car on right
      const carW = Math.min(w * 0.4, 400);
      const carH = carW * 0.5;
      const carX = w * 0.6;
      const carY = h * 0.5 - carH * 0.2;

      // Draw Images
      if (pedImg.complete) {
        ctx.globalAlpha = 0.8;
        ctx.drawImage(pedImg, pedX - pedW/2, pedY - pedH/2, pedW, pedH);
      }
      if (carImg.complete) {
        ctx.globalAlpha = 0.8;
        ctx.drawImage(carImg, carX - carW/2, carY - carH/2, carW, carH);
      }
      ctx.globalAlpha = 1.0;

      // Draw Animated Bounding Boxes
      const drawBox = (cx: number, cy: number, bw: number, bh: number, label: string, color: string, startFrame: number) => {
        if (cycle < startFrame) return; // wait to appear
        
        const localTime = cycle - startFrame;
        const progress = Math.min(1, localTime / 60); // 60 frames to draw full box
        
        const startX = cx - bw/2;
        const startY = cy - bh/2;

        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        
        // Draw Box Edges expanding
        if (progress > 0) {
          const drawW = bw * progress;
          const drawH = bh * progress;
          
          ctx.strokeRect(startX + bw/2 - drawW/2, startY + bh/2 - drawH/2, drawW, drawH);
        }

        // Draw label and connecting line when box is fully drawn
        if (progress >= 1) {
          const lineY = startY - 40;
          ctx.beginPath();
          ctx.moveTo(cx, startY);
          ctx.lineTo(cx + 20, lineY);
          ctx.lineTo(cx + 100, lineY);
          ctx.setLineDash([2, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(cx, startY, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = '14px monospace';
          ctx.fillText(`${label} | 99%`, cx + 30, lineY - 8);
        }
      };

      // Draw Pedestrian Box (starts at frame 10)
      drawBox(pedX, pedY, pedW * 1.2, pedH * 1.1, 'pedestrian', '#06b6d4', 10);

      // Draw Car Box (starts at frame 60)
      drawBox(carX, carY, carW * 1.1, carH * 1.1, 'car', '#3b82f6', 60);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="block w-full h-full mix-blend-screen"
      />
      {/* Soft gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/90 via-[#050510]/70 to-[#050510] z-10" />
    </div>
  );
}
