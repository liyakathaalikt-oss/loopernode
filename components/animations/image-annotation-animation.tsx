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

      // Helper for smooth interpolation
      const lerp = (start: number, end: number, t: number) => {
        // ease in out cubic
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        return start + (end - start) * Math.max(0, Math.min(1, ease));
      };

      // Animation Timeline logic
      let cursorX = w / 2;
      let cursorY = h / 2;
      let pedProgress = 0; // 0 to 1
      let carProgress = 0; // 0 to 1

      const pedStartX = pedX - (pedW * 1.2)/2;
      const pedStartY = pedY - (pedH * 1.1)/2;
      const pedEndX = pedStartX + (pedW * 1.2);
      const pedEndY = pedStartY + (pedH * 1.1);

      const carStartX = carX - (carW * 1.1)/2;
      const carStartY = carY - (carH * 1.1)/2;
      const carEndX = carStartX + (carW * 1.1);
      const carEndY = carStartY + (carH * 1.1);

      if (cycle < 30) {
        // Move to ped start
        const t = cycle / 30;
        cursorX = lerp(w * 0.1, pedStartX, t);
        cursorY = lerp(h * 0.1, pedStartY, t);
      } else if (cycle < 80) {
        // Drag ped box
        const t = (cycle - 30) / 50;
        cursorX = lerp(pedStartX, pedEndX, t);
        cursorY = lerp(pedStartY, pedEndY, t);
        pedProgress = t;
      } else if (cycle < 100) {
        // Hold at ped end
        cursorX = pedEndX;
        cursorY = pedEndY;
        pedProgress = 1;
      } else if (cycle < 130) {
        // Move to car start
        const t = (cycle - 100) / 30;
        cursorX = lerp(pedEndX, carStartX, t);
        cursorY = lerp(pedEndY, carStartY, t);
        pedProgress = 1;
      } else if (cycle < 180) {
        // Drag car box
        const t = (cycle - 130) / 50;
        cursorX = lerp(carStartX, carEndX, t);
        cursorY = lerp(carStartY, carEndY, t);
        pedProgress = 1;
        carProgress = t;
      } else {
        // Hold
        cursorX = carEndX;
        cursorY = carEndY;
        pedProgress = 1;
        carProgress = 1;
      }

      // Draw Pedestrian Box
      if (pedProgress > 0) {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        const currentW = (pedW * 1.2) * pedProgress;
        const currentH = (pedH * 1.1) * pedProgress;
        ctx.strokeRect(pedStartX, pedStartY, currentW, currentH);

        if (pedProgress >= 1) {
          const lineY = pedStartY - 40;
          ctx.beginPath();
          ctx.moveTo(pedX, pedStartY); ctx.lineTo(pedX + 20, lineY); ctx.lineTo(pedX + 100, lineY);
          ctx.setLineDash([2, 4]); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath(); ctx.arc(pedX, pedStartY, 3, 0, Math.PI * 2); ctx.fill();
          ctx.font = '14px monospace'; ctx.fillText('pedestrian | 99%', pedX + 30, lineY - 8);
        }
      }

      // Draw Car Box
      if (carProgress > 0) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        const currentW = (carW * 1.1) * carProgress;
        const currentH = (carH * 1.1) * carProgress;
        ctx.strokeRect(carStartX, carStartY, currentW, currentH);

        if (carProgress >= 1) {
          const lineY = carStartY - 40;
          ctx.beginPath();
          ctx.moveTo(carX, carStartY); ctx.lineTo(carX + 20, lineY); ctx.lineTo(carX + 100, lineY);
          ctx.setLineDash([2, 4]); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle = '#3b82f6';
          ctx.beginPath(); ctx.arc(carX, carStartY, 3, 0, Math.PI * 2); ctx.fill();
          ctx.font = '14px monospace'; ctx.fillText('car | 99%', carX + 30, lineY - 8);
        }
      }

      // Draw Cursor (Crosshair)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cursorX - 10, cursorY); ctx.lineTo(cursorX + 10, cursorY);
      ctx.moveTo(cursorX, cursorY - 10); ctx.lineTo(cursorX, cursorY + 10);
      ctx.stroke();

      // Draw tracking lines from cursor to edges (simulating a tool)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cursorX, 0); ctx.lineTo(cursorX, h);
      ctx.moveTo(0, cursorY); ctx.lineTo(w, cursorY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tool Label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '12px monospace';
      ctx.fillText(`TOOL: BBOX_DRAW`, 20, h - 20);

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
