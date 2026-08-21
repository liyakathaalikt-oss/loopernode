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

    // Helper for smooth interpolation
    const lerp = (start: number, end: number, t: number) => {
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      return start + (end - start) * Math.max(0, Math.min(1, ease));
    };

    const drawCarShape = (cx: number, cy: number, w: number, h: number) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy + h);
      ctx.lineTo(cx, cy + h * 0.3);
      ctx.lineTo(cx + w * 0.2, cy + h * 0.3);
      ctx.lineTo(cx + w * 0.4, cy);
      ctx.lineTo(cx + w * 0.7, cy);
      ctx.lineTo(cx + w * 0.9, cy + h * 0.4);
      ctx.lineTo(cx + w, cy + h * 0.4);
      ctx.lineTo(cx + w, cy + h);
      ctx.closePath();
      ctx.fill();
    };



    const drawBoxShape = (cx: number, cy: number, w: number, h: number) => {
      ctx.beginPath();
      ctx.rect(cx + w * 0.1, cy + h * 0.2, w * 0.8, h * 0.8);
      ctx.moveTo(cx + w * 0.1, cy + h * 0.2);
      ctx.lineTo(cx + w * 0.3, cy);
      ctx.lineTo(cx + w * 0.9, cy);
      ctx.lineTo(cx + w * 0.9, cy + h * 0.8);
      ctx.lineTo(cx + w * 0.7, cy + h);
      ctx.moveTo(cx + w * 0.9, cy);
      ctx.lineTo(cx + w * 0.7, cy + h * 0.2);
      ctx.stroke();
      ctx.fill();
    };

    const draw = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Dark background
      ctx.fillStyle = '#050510'; 
      ctx.fillRect(0, 0, w, h);

      time += 1; // logical frames
      const cycleTime = 600; // total animation loop
      const cycle = time % cycleTime;

      // Subtle dot grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let x = 0; x < w; x += 40) {
        for (let y = 0; y < h; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 1. CAR (Autonomous Driving)
      const carW = 180; const carH = 70;
      const carX = w * 0.3 - carW/2; const carY = h * 0.5 - carH/2;
      ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
      drawCarShape(carX, carY, carW, carH);

      // 2. PACKAGE (Retail CV)
      const boxW = 80; const boxH = 90;
      const boxX = w * 0.7 - boxW/2; const boxY = h * 0.5 - boxH/2;
      ctx.fillStyle = 'rgba(234, 179, 8, 0.1)';
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.1)';
      ctx.lineWidth = 1;
      drawBoxShape(boxX, boxY, boxW, boxH);

      // Animation Timeline logic
      let cursorX = w / 2;
      let cursorY = h / 2;
      let carProgress = 0, retProgress = 0;

      // Margins around the bounding box targets
      const p = 15;
      
      const c1_start = { x: carX - p, y: carY - p };
      const c1_end = { x: carX + carW + p, y: carY + carH + p };
      
      const c3_start = { x: boxX - p, y: boxY - p };
      const c3_end = { x: boxX + boxW + p, y: boxY + boxH + p };

      // Timings
      const seq = [
        { t: 0,   len: 40, action: 'move', start: { x: w * 0.1, y: h * 0.1 }, end: c1_start },
        { t: 40,  len: 50, action: 'drag1', start: c1_start, end: c1_end },
        { t: 90,  len: 40, action: 'hold1', start: c1_end, end: c1_end },
        { t: 130, len: 40, action: 'move', start: c1_end, end: c3_start },
        { t: 170, len: 50, action: 'drag3', start: c3_start, end: c3_end },
        { t: 220, len: 380, action: 'hold3', start: c3_end, end: c3_end }
      ];

      for (const step of seq) {
        if (cycle >= step.t && cycle < step.t + step.len) {
          const t = (cycle - step.t) / step.len;
          cursorX = lerp(step.start.x, step.end.x, t);
          cursorY = lerp(step.start.y, step.end.y, t);
          
          if (step.action === 'drag1') carProgress = t;
          if (step.action === 'drag3') retProgress = t;
        }
        if (cycle >= step.t + step.len) {
          if (step.action === 'drag1' || step.action === 'hold1') carProgress = 1;
          if (step.action === 'drag3' || step.action === 'hold3') retProgress = 1;
        }
      }

      // Draw Animated Boxes function
      const renderAnnotBox = (progress: number, start: {x: number, y: number}, end: {x: number, y: number}, color: string, label: string) => {
        if (progress <= 0) return;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        const currentW = (end.x - start.x) * progress;
        const currentH = (end.y - start.y) * progress;
        ctx.strokeRect(start.x, start.y, currentW, currentH);

        if (progress >= 1) {
          ctx.fillStyle = color;
          ctx.fillRect(start.x, start.y - 22, 110, 22);
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 11px monospace';
          ctx.fillText(`${label} | 99%`, start.x + 6, start.y - 6);
        }
      };

      renderAnnotBox(carProgress, c1_start, c1_end, '#06b6d4', 'VEHICLE');
      renderAnnotBox(retProgress, c3_start, c3_end, '#eab308', 'PRODUCT');

      // Draw Cursor (Crosshair)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cursorX - 10, cursorY); ctx.lineTo(cursorX + 10, cursorY);
      ctx.moveTo(cursorX, cursorY - 10); ctx.lineTo(cursorX, cursorY + 10);
      ctx.stroke();

      // Tool guide lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cursorX, 0); ctx.lineTo(cursorX, h);
      ctx.moveTo(0, cursorY); ctx.lineTo(w, cursorY);
      ctx.stroke();
      ctx.setLineDash([]);

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
        className="block w-full h-full mix-blend-screen opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/80 via-[#050510]/40 to-[#050510] z-10" />
    </div>
  );
}
