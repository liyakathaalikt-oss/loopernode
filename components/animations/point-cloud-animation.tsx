"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function PointCloudAnimation() {
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

    // Point cloud setup
    const points: { x: number; y: number; z: number; color: string; isBox?: boolean }[] = [];
    
    // Colors for semantic segmentation
    const colors = {
      ground: '#3b82f6', // blue-500
      vehicle: '#ef4444', // red-500
      pedestrian: '#eab308', // yellow-500
      vegetation: '#22c55e', // green-500
      building: '#64748b' // slate-500
    };

    // Generate ground (grid of points)
    for (let i = 0; i < 600; i++) {
      points.push({
        x: (Math.random() - 0.5) * 2000,
        y: 200 + (Math.random() * 20), // ground level
        z: (Math.random() - 0.5) * 2000,
        color: colors.ground
      });
    }

    // Generate vegetation and buildings
    for (let i = 0; i < 200; i++) {
      points.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 2000,
        color: Math.random() > 0.5 ? colors.vegetation : colors.building
      });
    }

    // Generate bounding boxes (Vehicles)
    const boxes = [
      { cx: -300, cy: 100, cz: 200, w: 200, h: 100, d: 400, color: colors.vehicle },
      { cx: 400, cy: 100, cz: -300, w: 180, h: 120, d: 350, color: colors.vehicle },
      { cx: 100, cy: 50, cz: 600, w: 100, h: 150, d: 100, color: colors.pedestrian }, // Pedestrian box
    ];

    // Add points inside boxes to simulate object points
    boxes.forEach(box => {
      for(let i=0; i < 150; i++) {
        points.push({
          x: box.cx + (Math.random() - 0.5) * box.w,
          y: box.cy + (Math.random() - 0.5) * box.h,
          z: box.cz + (Math.random() - 0.5) * box.d,
          color: box.color
        });
      }
    });

    const fov = 400;

    const draw = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Dark background
      ctx.fillStyle = '#050510'; // match dark-950
      ctx.fillRect(0, 0, w, h);

      time += 0.003;
      const cx = w / 2;
      const cy = h / 2;

      // Camera rotation
      const cosY = Math.cos(time);
      const sinY = Math.sin(time);

      // Draw points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Rotate around Y axis
        const rx = p.x * cosY - p.z * sinY;
        const rz = p.z * cosY + p.x * sinY + 1000; // Move forward in Z

        if (rz < 50) continue; // Behind camera

        const scale = fov / rz;
        const px = cx + rx * scale;
        const py = cy + p.y * scale;

        // Depth fading
        const alpha = Math.min(1, Math.max(0.1, 1500 / rz));
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        
        // Draw tiny rectangle instead of arc for better performance
        const size = Math.max(1, 3 * scale);
        ctx.fillRect(px, py, size, size);
      }

      // Draw Cuboids
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 1.5;
      
      boxes.forEach(box => {
        const vertices = [
          {x: box.cx - box.w/2, y: box.cy - box.h/2, z: box.cz - box.d/2},
          {x: box.cx + box.w/2, y: box.cy - box.h/2, z: box.cz - box.d/2},
          {x: box.cx + box.w/2, y: box.cy + box.h/2, z: box.cz - box.d/2},
          {x: box.cx - box.w/2, y: box.cy + box.h/2, z: box.cz - box.d/2},
          {x: box.cx - box.w/2, y: box.cy - box.h/2, z: box.cz + box.d/2},
          {x: box.cx + box.w/2, y: box.cy - box.h/2, z: box.cz + box.d/2},
          {x: box.cx + box.w/2, y: box.cy + box.h/2, z: box.cz + box.d/2},
          {x: box.cx - box.w/2, y: box.cy + box.h/2, z: box.cz + box.d/2},
        ];

        const projected = vertices.map(v => {
          const rx = v.x * cosY - v.z * sinY;
          const rz = v.z * cosY + v.x * sinY + 1000;
          if (rz < 50) return null;
          const scale = fov / rz;
          return {
            x: cx + rx * scale,
            y: cy + v.y * scale
          };
        });

        // If any vertex is behind camera, don't draw box
        if (projected.includes(null)) return;
        
        const p = projected as {x: number, y: number}[];

        ctx.strokeStyle = box.color;
        ctx.beginPath();
        
        // Back face
        ctx.moveTo(p[0].x, p[0].y); ctx.lineTo(p[1].x, p[1].y);
        ctx.lineTo(p[2].x, p[2].y); ctx.lineTo(p[3].x, p[3].y); ctx.closePath();
        
        // Front face
        ctx.moveTo(p[4].x, p[4].y); ctx.lineTo(p[5].x, p[5].y);
        ctx.lineTo(p[6].x, p[6].y); ctx.lineTo(p[7].x, p[7].y); ctx.closePath();
        
        // Connectors
        ctx.moveTo(p[0].x, p[0].y); ctx.lineTo(p[4].x, p[4].y);
        ctx.moveTo(p[1].x, p[1].y); ctx.lineTo(p[5].x, p[5].y);
        ctx.moveTo(p[2].x, p[2].y); ctx.lineTo(p[6].x, p[6].y);
        ctx.moveTo(p[3].x, p[3].y); ctx.lineTo(p[7].x, p[7].y);
        
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
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
        style={{ imageRendering: 'pixelated' }}
      />
      {/* Soft gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/80 via-[#050510]/60 to-[#050510] z-10" />
    </div>
  );
}
