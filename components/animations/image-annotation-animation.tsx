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

    const carImg = new Image();
    carImg.src = '/car-icon-v2.png';
    const pedImg = new Image();
    pedImg.src = '/pedestrian-icon-v2.png';

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

    // HUD Corner Bracket drawing
    const drawBracket = (x: number, y: number, w: number, h: number, color: string, alpha: number) => {
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 2;
      const s = 15; // bracket size
      ctx.beginPath();
      // Top Left
      ctx.moveTo(x, y + s); ctx.lineTo(x, y); ctx.lineTo(x + s, y);
      // Top Right
      ctx.moveTo(x + w - s, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + s);
      // Bottom Right
      ctx.moveTo(x + w, y + h - s); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - s, y + h);
      // Bottom Left
      ctx.moveTo(x + s, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + h - s);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    };

    const draw = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Deep dark background
      ctx.fillStyle = '#020617'; 
      ctx.fillRect(0, 0, w, h);

      time += 1;
      const cycleTime = 400; // 400 frames
      const cycle = time % cycleTime;
      const scanX = (cycle / cycleTime) * (w + 400) - 200; // scanning line moving left to right

      // High-tech grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x += 50) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0; y < h; y += 50) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // System Metrics Text (HUD)
      ctx.fillStyle = 'rgba(14, 165, 233, 0.5)';
      ctx.font = '10px monospace';
      ctx.fillText(`SYS.MONITOR // LIVE_FEED`, 30, 30);
      ctx.fillText(`FRAME: ${14400 + time}`, 30, 45);
      ctx.fillText(`LATENCY: ${Math.floor(12 + Math.random() * 5)}ms`, 30, 60);

      ctx.textAlign = 'right';
      ctx.fillText(`AI.VISION.ENGINE_v4.2`, w - 30, 30);
      ctx.fillText(`CONFIDENCE_THRESH: 0.95`, w - 30, 45);
      ctx.textAlign = 'left';

      // Object 1: Car
      const carW = Math.min(w * 0.4, 450); 
      const carH = carW * 0.4; 
      const carX = w * 0.15; 
      const carY = h * 0.6 - carH/2; 
      if (carImg.complete) {
        ctx.globalAlpha = 0.9;
        ctx.drawImage(carImg, carX, carY, carW, carH);
        ctx.globalAlpha = 1.0;
      }

      // Object 2: Pedestrian
      const pedW = Math.min(w * 0.15, 180); 
      const pedH = pedW * 1.0; 
      const pedX = w * 0.75; 
      const pedY = h * 0.6 - pedH/2;
      if (pedImg.complete) {
        ctx.globalAlpha = 0.9;
        ctx.drawImage(pedImg, pedX, pedY, pedW, pedH);
        ctx.globalAlpha = 1.0;
      }

      // Draw active bounding boxes if the scanning line has passed them
      const renderHudBox = (bx: number, by: number, bw: number, bh: number, color: string, label: string) => {
        if (scanX > bx + bw * 0.2) {
          // Fill tint
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.1;
          ctx.fillRect(bx, by, bw, bh);
          
          // HUD brackets
          drawBracket(bx, by, bw, bh, color, 0.8);
          
          // Outer thin line
          ctx.strokeStyle = color;
          ctx.globalAlpha = 0.3;
          ctx.lineWidth = 1;
          ctx.strokeRect(bx, by, bw, bh);
          ctx.globalAlpha = 1.0;

          // HUD Label Badge
          ctx.fillStyle = color;
          ctx.fillRect(bx, by - 24, 130, 24);
          ctx.fillStyle = '#020617'; // dark text on bright badge
          ctx.font = 'bold 11px monospace';
          ctx.fillText(`${label} [${(0.95 + Math.random()*0.04).toFixed(3)}]`, bx + 8, by - 8);
        }
      };

      // Draw Bounding Boxes perfectly tight
      renderHudBox(carX, carY, carW, carH, '#10b981', 'VEHICLE');
      renderHudBox(pedX, pedY, pedW, pedH, '#0ea5e9', 'PEDESTRIAN');

      // Draw the scanning line and its fade gradient
      const grad = ctx.createLinearGradient(scanX - 150, 0, scanX, 0);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0)');
      grad.addColorStop(1, 'rgba(14, 165, 233, 0.15)');
      ctx.fillStyle = grad;
      ctx.fillRect(scanX - 150, 0, 150, h);

      // Solid scan line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, h);
      ctx.stroke();
      
      // Scanning laser dots at intersections
      ctx.fillStyle = '#fff';
      for (let y = 0; y < h; y += 100) {
        ctx.beginPath();
        ctx.arc(scanX, y, 2, 0, Math.PI*2);
        ctx.fill();
      }

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
        className="block w-full h-full mix-blend-screen opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/40 to-[#020617] z-10" />
    </div>
  );
}
