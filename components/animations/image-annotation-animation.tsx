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

    // Helper for smooth interpolation
    const lerp = (start: number, end: number, t: number) => {
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      return start + (end - start) * Math.max(0, Math.min(1, ease));
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

    const drawTrafficLight = (cx: number, cy: number, w: number, h: number) => {
      ctx.beginPath();
      ctx.roundRect(cx + w * 0.25, cy + h * 0.1, w * 0.5, h * 0.8, 10);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + w * 0.5, cy + h * 0.3, w * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + w * 0.5, cy + h * 0.5, w * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(234, 179, 8, 0.4)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + w * 0.5, cy + h * 0.7, w * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
      ctx.fill();
    };

    const drawStopSign = (cx: number, cy: number, w: number, h: number) => {
      ctx.save();
      ctx.beginPath();
      const hw = w / 2; const hh = h / 2;
      const s = 0.414; // exact ratio for regular octagon
      ctx.moveTo(cx + hw - hw*s, cy);
      ctx.lineTo(cx + hw + hw*s, cy);
      ctx.lineTo(cx + w, cy + hh - hh*s);
      ctx.lineTo(cx + w, cy + hh + hh*s);
      ctx.lineTo(cx + hw + hw*s, cy + h);
      ctx.lineTo(cx + hw - hw*s, cy + h);
      ctx.lineTo(cx, cy + hh + hh*s);
      ctx.lineTo(cx, cy + hh - hh*s);
      ctx.closePath();
      
      ctx.fillStyle = '#dc2626'; // solid red
      ctx.fill();
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${w * 0.3}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('STOP', cx + hw, cy + hh);
      ctx.restore();
    };

    const drawBicycle = (cx: number, cy: number, w: number, h: number) => {
      const r = w * 0.2;
      ctx.lineWidth = 3;
      // wheels
      ctx.beginPath(); ctx.arc(cx + r, cy + h - r, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + w - r, cy + h - r, r, 0, Math.PI * 2); ctx.stroke();
      // frame
      ctx.beginPath();
      ctx.moveTo(cx + r, cy + h - r); // back wheel center
      ctx.lineTo(cx + w * 0.4, cy + h * 0.4); // seat post top
      ctx.lineTo(cx + w * 0.7, cy + h * 0.4); // handle bar joint
      ctx.lineTo(cx + w - r, cy + h - r); // front wheel center
      ctx.moveTo(cx + w * 0.4, cy + h * 0.4); 
      ctx.lineTo(cx + w * 0.6, cy + h - r); // pedals
      ctx.lineTo(cx + w * 0.7, cy + h * 0.4);
      ctx.stroke();
    };

    const drawRealisticCar = (cx: number, cy: number, w: number, h: number) => {
      ctx.save();
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath(); ctx.ellipse(cx + w * 0.5, cy + h * 0.85, w * 0.4, h * 0.05, 0, 0, Math.PI * 2); ctx.fill();
      
      // Car Body
      ctx.fillStyle = '#0ea5e9'; // sleek blue
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.1, cy + h * 0.7); // rear bottom
      ctx.lineTo(cx + w * 0.1, cy + h * 0.4); // rear middle
      ctx.lineTo(cx + w * 0.3, cy + h * 0.3); // rear window slope
      ctx.lineTo(cx + w * 0.5, cy + h * 0.15); // roof back
      ctx.lineTo(cx + w * 0.7, cy + h * 0.15); // roof front
      ctx.lineTo(cx + w * 0.85, cy + h * 0.4); // windshield slope
      ctx.lineTo(cx + w * 0.95, cy + h * 0.5); // hood front
      ctx.lineTo(cx + w * 0.95, cy + h * 0.7); // front bottom
      ctx.closePath();
      ctx.fill();

      // Windows
      ctx.fillStyle = '#0f172a'; // dark tint
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.35, cy + h * 0.35); // rear window bottom
      ctx.lineTo(cx + w * 0.5, cy + h * 0.2); // roof back
      ctx.lineTo(cx + w * 0.65, cy + h * 0.2); // roof front
      ctx.lineTo(cx + w * 0.65, cy + h * 0.35); // b-pillar
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.68, cy + h * 0.35); // b-pillar
      ctx.lineTo(cx + w * 0.68, cy + h * 0.2); // roof front
      ctx.lineTo(cx + w * 0.8, cy + h * 0.35); // windshield bottom
      ctx.fill();

      // Tires
      ctx.fillStyle = '#1e293b';
      const r = h * 0.2;
      ctx.beginPath(); ctx.arc(cx + w * 0.25, cy + h * 0.7, r, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + w * 0.75, cy + h * 0.7, r, 0, Math.PI * 2); ctx.fill();

      // Rims
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath(); ctx.arc(cx + w * 0.25, cy + h * 0.7, r * 0.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + w * 0.75, cy + h * 0.7, r * 0.5, 0, Math.PI * 2); ctx.fill();

      // Headlight & Taillight
      ctx.fillStyle = '#fbbf24'; // yellow headlight
      ctx.beginPath(); ctx.rect(cx + w * 0.9, cy + h * 0.45, w * 0.05, h * 0.08); ctx.fill();
      
      ctx.fillStyle = '#ef4444'; // red taillight
      ctx.beginPath(); ctx.rect(cx + w * 0.1, cy + h * 0.4, w * 0.02, h * 0.15); ctx.fill();

      ctx.restore();
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

      // 1. TRAFFIC LIGHT (Top Left)
      const lightW = Math.min(w * 0.08, 60); 
      const lightH = lightW * 3;
      const lightX = w * 0.05; 
      const lightY = h * 0.1;
      ctx.fillStyle = 'rgba(234, 179, 8, 0.1)';
      drawTrafficLight(lightX, lightY, lightW, lightH);

      // 2. STOP SIGN (Mid Left)
      const stopW = Math.min(w * 0.1, 90); 
      const stopH = stopW;
      const stopX = w * 0.05; 
      const stopY = h * 0.45;
      drawStopSign(stopX, stopY, stopW, stopH);

      // 3. CAR (Bottom Left)
      const carW = Math.min(w * 0.35, 400); 
      const carH = carW * 0.4; 
      const carX = w * 0.05; 
      const carY = h * 0.85 - carH; 
      drawRealisticCar(carX, carY, carW, carH);

      // 4. PEDESTRIAN (Top Right)
      const pedW = Math.min(w * 0.15, 150); 
      const pedH = pedW * 1.0; 
      const pedX = w * 0.95 - pedW; 
      const pedY = h * 0.1;
      if (pedImg.complete) {
        ctx.globalAlpha = 0.8;
        ctx.drawImage(pedImg, pedX, pedY, pedW, pedH);
        ctx.globalAlpha = 1.0;
      }

      // 5. BICYCLE (Mid Right)
      const bikeW = Math.min(w * 0.2, 180); 
      const bikeH = bikeW * 0.6;
      const bikeX = w * 0.95 - bikeW; 
      const bikeY = h * 0.45;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      drawBicycle(bikeX, bikeY, bikeW, bikeH);

      // 6. PACKAGE (Bottom Right)
      const pkgW = Math.min(w * 0.15, 120); 
      const pkgH = pkgW * 1.1; 
      const pkgX = w * 0.95 - pkgW; 
      const pkgY = h * 0.85 - pkgH;
      ctx.fillStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.lineWidth = 1;
      drawBoxShape(pkgX, pkgY, pkgW, pkgH);

      // Animation Timeline logic
      let cursorX = w / 2;
      let cursorY = h / 2;
      let lightProgress = 0, stopProgress = 0, carProgress = 0;
      let pedProgress = 0, bikeProgress = 0, pkgProgress = 0;

      const c0_start = { x: lightX, y: lightY };
      const c0_end = { x: lightX + lightW, y: lightY + lightH };
      const c1_start = { x: stopX, y: stopY };
      const c1_end = { x: stopX + stopW, y: stopY + stopH };
      const c2_start = { x: carX, y: carY };
      const c2_end = { x: carX + carW, y: carY + carH };
      const c3_start = { x: pedX, y: pedY };
      const c3_end = { x: pedX + pedW, y: pedY + pedH };
      const c4_start = { x: bikeX, y: bikeY };
      const c4_end = { x: bikeX + bikeW, y: bikeY + bikeH };
      const c5_start = { x: pkgX, y: pkgY };
      const c5_end = { x: pkgX + pkgW, y: pkgY + pkgH };

      // Timings
      const seq = [
        { t: 0,   len: 20, action: 'move', start: { x: w * 0.5, y: h * 0.5 }, end: c0_start },
        { t: 20,  len: 30, action: 'drag0', start: c0_start, end: c0_end },
        { t: 50,  len: 10, action: 'hold0', start: c0_end, end: c0_end },
        
        { t: 60,  len: 30, action: 'move', start: c0_end, end: c1_start },
        { t: 90,  len: 30, action: 'drag1', start: c1_start, end: c1_end },
        { t: 120, len: 10, action: 'hold1', start: c1_end, end: c1_end },
        
        { t: 130, len: 30, action: 'move', start: c1_end, end: c2_start },
        { t: 160, len: 40, action: 'drag2', start: c2_start, end: c2_end },
        { t: 200, len: 10, action: 'hold2', start: c2_end, end: c2_end },
        
        { t: 210, len: 40, action: 'move', start: c2_end, end: c3_start },
        { t: 250, len: 30, action: 'drag3', start: c3_start, end: c3_end },
        { t: 280, len: 10, action: 'hold3', start: c3_end, end: c3_end },
        
        { t: 290, len: 30, action: 'move', start: c3_end, end: c4_start },
        { t: 320, len: 30, action: 'drag4', start: c4_start, end: c4_end },
        { t: 350, len: 10, action: 'hold4', start: c4_end, end: c4_end },
        
        { t: 360, len: 30, action: 'move', start: c4_end, end: c5_start },
        { t: 390, len: 30, action: 'drag5', start: c5_start, end: c5_end },
        { t: 420, len: 180, action: 'hold5', start: c5_end, end: c5_end } // Cycle is 600
      ];

      for (const step of seq) {
        if (cycle >= step.t && cycle < step.t + step.len) {
          const t = (cycle - step.t) / step.len;
          cursorX = lerp(step.start.x, step.end.x, t);
          cursorY = lerp(step.start.y, step.end.y, t);
          
          if (step.action === 'drag0') lightProgress = t;
          if (step.action === 'drag1') stopProgress = t;
          if (step.action === 'drag2') carProgress = t;
          if (step.action === 'drag3') pedProgress = t;
          if (step.action === 'drag4') bikeProgress = t;
          if (step.action === 'drag5') pkgProgress = t;
        }
        if (cycle >= step.t + step.len) {
          if (step.action === 'drag0' || step.action === 'hold0') lightProgress = 1;
          if (step.action === 'drag1' || step.action === 'hold1') stopProgress = 1;
          if (step.action === 'drag2' || step.action === 'hold2') carProgress = 1;
          if (step.action === 'drag3' || step.action === 'hold3') pedProgress = 1;
          if (step.action === 'drag4' || step.action === 'hold4') bikeProgress = 1;
          if (step.action === 'drag5' || step.action === 'hold5') pkgProgress = 1;
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

      renderAnnotBox(lightProgress, c0_start, c0_end, '#eab308', 'TRAFFIC_LIGHT');
      renderAnnotBox(stopProgress, c1_start, c1_end, '#ef4444', 'STOP_SIGN');
      renderAnnotBox(carProgress, c2_start, c2_end, '#10b981', 'VEHICLE');
      renderAnnotBox(pedProgress, c3_start, c3_end, '#f43f5e', 'PEDESTRIAN');
      renderAnnotBox(bikeProgress, c4_start, c4_end, '#06b6d4', 'BICYCLE');
      renderAnnotBox(pkgProgress, c5_start, c5_end, '#a855f7', 'PRODUCT');

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
