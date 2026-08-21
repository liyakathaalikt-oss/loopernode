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

    // Annotation Data
    const annotations = [
      {
        type: 'polygon',
        label: 'VEHICLE | 99%',
        color: '#06b6d4', // cyan
        points: [
          {x: 0.2, y: 0.6}, {x: 0.25, y: 0.55}, {x: 0.35, y: 0.55}, 
          {x: 0.4, y: 0.6}, {x: 0.4, y: 0.7}, {x: 0.2, y: 0.7}
        ],
        drawSpeed: 0.02,
        offset: 0
      },
      {
        type: 'bbox',
        label: 'TUMOR | 95%',
        color: '#ef4444', // red
        x: 0.6, y: 0.3, w: 0.15, h: 0.2,
        drawSpeed: 0.05,
        offset: 100
      },
      {
        type: 'mask',
        label: 'PRODUCT | 98%',
        color: '#eab308', // yellow
        cx: 0.75, cy: 0.7, r: 0.1,
        points: Array.from({length: 12}).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return {
            dx: Math.cos(angle) * (0.8 + Math.random() * 0.4),
            dy: Math.sin(angle) * (0.8 + Math.random() * 0.4)
          };
        }),
        drawSpeed: 0.03,
        offset: 200
      }
    ];

    const draw = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Dark background
      ctx.fillStyle = '#050510'; 
      ctx.fillRect(0, 0, w, h);

      time += 1; // logical frames

      // Draw subtle grid (image pixels)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x += 40) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 40) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Draw faint underlying objects (Car silhouette for the polygon)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      // Simple car silhouette relative to polygon coordinates
      // polygon is roughly x: 0.2 to 0.4, y: 0.55 to 0.7
      const cx1 = 0.21 * w; const cy1 = 0.69 * h;
      const cw = 0.18 * w; const ch = 0.14 * h;
      ctx.moveTo(cx1, cy1); // bottom left
      ctx.lineTo(cx1, cy1 - ch * 0.3); // back bumper
      ctx.lineTo(cx1 + cw * 0.2, cy1 - ch * 0.4); // trunk
      ctx.lineTo(cx1 + cw * 0.3, cy1 - ch * 0.9); // back window
      ctx.lineTo(cx1 + cw * 0.6, cy1 - ch * 0.95); // roof
      ctx.lineTo(cx1 + cw * 0.8, cy1 - ch * 0.5); // windshield
      ctx.lineTo(cx1 + cw, cy1 - ch * 0.4); // hood
      ctx.lineTo(cx1 + cw, cy1); // front bumper
      ctx.closePath();
      ctx.fill();

      // Draw underlying object (Person silhouette for the mask)
      // mask is roughly cx: 0.75, cy: 0.7, r: 0.1
      ctx.beginPath();
      const px = 0.75 * w; const py = 0.7 * h; const pr = 0.1 * h;
      ctx.arc(px, py - pr * 1.5, pr * 0.4, 0, Math.PI * 2); // head
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(px - pr * 0.5, py - pr * 0.8); // shoulder left
      ctx.lineTo(px + pr * 0.5, py - pr * 0.8); // shoulder right
      ctx.lineTo(px + pr * 0.3, py + pr * 1.2); // hip right
      ctx.lineTo(px - pr * 0.3, py + pr * 1.2); // hip left
      ctx.closePath();
      ctx.fill();

      // Render annotations
      annotations.forEach((ann) => {
        const localTime = Math.max(0, time - ann.offset);
        const progress = Math.min(1, localTime * ann.drawSpeed);
        
        ctx.strokeStyle = ann.color;
        ctx.fillStyle = ann.color;
        ctx.lineWidth = 2;

        if (ann.type === 'polygon') {
          ctx.beginPath();
          const pts = ann.points as {x: number, y: number}[];
          const totalPts = pts.length;
          const drawCount = Math.floor(progress * totalPts);
          const remainder = (progress * totalPts) % 1;

          if (drawCount > 0) {
            ctx.moveTo(pts[0].x * w, pts[0].y * h);
            for (let i = 1; i < drawCount; i++) {
              ctx.lineTo(pts[i].x * w, pts[i].y * h);
            }
            if (drawCount < totalPts) {
              const p1 = pts[drawCount - 1];
              const p2 = pts[drawCount];
              const curX = p1.x + (p2.x - p1.x) * remainder;
              const curY = p1.y + (p2.y - p1.y) * remainder;
              ctx.lineTo(curX * w, curY * h);
              
              // Draw active cursor dot
              ctx.beginPath();
              ctx.arc(curX * w, curY * h, 4, 0, Math.PI * 2);
              ctx.fill();
              ctx.beginPath(); // reset for stroke
            } else if (progress >= 1) {
              ctx.closePath();
              ctx.globalAlpha = 0.2;
              ctx.fill();
              ctx.globalAlpha = 1;
            }
            ctx.stroke();
          }

          // Draw points
          if (progress >= 1) {
            pts.forEach(p => {
              ctx.beginPath();
              ctx.arc(p.x * w, p.y * h, 3, 0, Math.PI * 2);
              ctx.fill();
            });
            // Draw label
            ctx.fillStyle = ann.color;
            ctx.fillRect(pts[0].x * w, pts[0].y * h - 20, 100, 18);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px monospace';
            ctx.fillText(ann.label, pts[0].x * w + 4, pts[0].y * h - 7);
          }
        } 
        else if (ann.type === 'bbox') {
          const bx = ann.x! * w;
          const by = ann.y! * h;
          const bw = ann.w! * w * progress;
          const bh = ann.h! * h * progress;

          if (progress > 0) {
            ctx.strokeRect(bx, by, bw, bh);
            
            // Corner handles
            if (progress >= 1) {
              const cl = 6;
              [-1, 1].forEach(dx => {
                [-1, 1].forEach(dy => {
                  ctx.fillRect(bx + (dx > 0 ? bw : 0) - cl/2, by + (dy > 0 ? bh : 0) - cl/2, cl, cl);
                });
              });

              // Label
              ctx.fillStyle = ann.color;
              ctx.fillRect(bx, by - 20, 90, 18);
              ctx.fillStyle = '#fff';
              ctx.font = 'bold 10px monospace';
              ctx.fillText(ann.label, bx + 4, by - 7);
            }
          }
        }
        else if (ann.type === 'mask') {
          const cx = ann.cx! * w;
          const cy = ann.cy! * h;
          const r = ann.r! * Math.min(w, h);

          if (progress > 0) {
            ctx.beginPath();
            const pts = ann.points as {dx: number, dy: number}[];
            pts.forEach((p, i) => {
              // Add slight organic breathing
              const breathe = 1 + Math.sin(time * 0.05 + i) * 0.05;
              const px = cx + p.dx * r * progress * breathe;
              const py = cy + p.dy * r * progress * breathe;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            });
            ctx.closePath();
            
            ctx.globalAlpha = 0.3 * progress;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.stroke();

            if (progress >= 1) {
              // Crosshair at center
              ctx.beginPath();
              ctx.moveTo(cx - 10, cy); ctx.lineTo(cx + 10, cy);
              ctx.moveTo(cx, cy - 10); ctx.lineTo(cx, cy + 10);
              ctx.stroke();

              // Label
              ctx.fillStyle = ann.color;
              ctx.fillRect(cx - 45, cy - r - 20, 100, 18);
              ctx.fillStyle = '#fff';
              ctx.font = 'bold 10px monospace';
              ctx.fillText(ann.label, cx - 41, cy - r - 7);
            }
          }
        }
      });

      // Reset animation loop slowly
      if (time > 400) time = 0;

      // Overlay UI elements (Simulate Annotation Tool)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '12px monospace';
      ctx.fillText(`TOOL: SMART_POLYGON`, 20, h - 20);
      
      // Cursor crosshair tracking
      const mx = w * 0.4 + Math.sin(time * 0.02) * w * 0.2;
      const my = h * 0.5 + Math.cos(time * 0.03) * h * 0.2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(mx, 0); ctx.lineTo(mx, h);
      ctx.moveTo(0, my); ctx.lineTo(w, my);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.beginPath();
      ctx.arc(mx, my, 8, 0, Math.PI * 2);
      ctx.stroke();

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
        className="block w-full h-full opacity-70 mix-blend-screen"
      />
      {/* Soft gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/80 via-[#050510]/60 to-[#050510] z-10" />
    </div>
  );
}
