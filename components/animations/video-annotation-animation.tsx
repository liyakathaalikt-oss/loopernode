"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function VideoAnnotationAnimation() {
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

    // Setup tracks and pose data
    const players = [
      { id: 'ID_084', type: 'person', action: 'SPRINTING', color: '#06b6d4', offset: 0, speed: 1.5, scale: 1 },
      { id: 'ID_112', type: 'person', action: 'JUMPING', color: '#8b5cf6', offset: 2000, speed: 1.2, scale: 0.8 },
      { id: 'VEH_045', type: 'car', action: 'CRUISING', color: '#f59e0b', offset: 4000, speed: 1.8, scale: 1.2 },
    ];

    // Helper to draw a pose (stick figure)
    const drawPose = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, phase: number, color: string) => {
      const s = scale;
      
      // Simulate running motion
      const headY = cy - 60 * s;
      const shoulderY = cy - 40 * s;
      const hipY = cy + 10 * s;
      
      const swingAmount = Math.sin(phase) * 30 * s;
      const legSwingAmount = Math.cos(phase) * 40 * s;

      // Joints
      const head = { x: cx, y: headY + Math.abs(Math.sin(phase * 2)) * 5 * s };
      const shoulder = { x: cx, y: shoulderY + Math.abs(Math.sin(phase * 2)) * 5 * s };
      const hip = { x: cx, y: hipY + Math.abs(Math.sin(phase * 2)) * 5 * s };
      
      const lElbow = { x: cx - 20 * s + swingAmount * 0.5, y: shoulder.y + 20 * s };
      const rElbow = { x: cx + 20 * s - swingAmount * 0.5, y: shoulder.y + 20 * s };
      
      const lHand = { x: cx - 30 * s + swingAmount, y: lElbow.y + 20 * s - Math.abs(swingAmount * 0.5) };
      const rHand = { x: cx + 30 * s - swingAmount, y: rElbow.y + 20 * s - Math.abs(swingAmount * 0.5) };

      const lKnee = { x: cx - 15 * s + legSwingAmount * 0.5, y: hip.y + 30 * s - Math.abs(legSwingAmount * 0.2) };
      const rKnee = { x: cx + 15 * s - legSwingAmount * 0.5, y: hip.y + 30 * s + Math.abs(legSwingAmount * 0.2) };
      
      const lFoot = { x: cx - 20 * s + legSwingAmount, y: lKnee.y + 30 * s - Math.max(0, legSwingAmount * 0.5) };
      const rFoot = { x: cx + 20 * s - legSwingAmount, y: rKnee.y + 30 * s + Math.max(0, -legSwingAmount * 0.5) };

      const joints = [head, shoulder, hip, lElbow, rElbow, lHand, rHand, lKnee, rKnee, lFoot, rFoot];

      ctx.beginPath();
      // Torso
      ctx.moveTo(shoulder.x, shoulder.y); ctx.lineTo(hip.x, hip.y);
      // Left Arm
      ctx.moveTo(shoulder.x, shoulder.y); ctx.lineTo(lElbow.x, lElbow.y); ctx.lineTo(lHand.x, lHand.y);
      // Right Arm
      ctx.moveTo(shoulder.x, shoulder.y); ctx.lineTo(rElbow.x, rElbow.y); ctx.lineTo(rHand.x, rHand.y);
      // Left Leg
      ctx.moveTo(hip.x, hip.y); ctx.lineTo(lKnee.x, lKnee.y); ctx.lineTo(lFoot.x, lFoot.y);
      // Right Leg
      ctx.moveTo(hip.x, hip.y); ctx.lineTo(rKnee.x, rKnee.y); ctx.lineTo(rFoot.x, rFoot.y);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * s;
      ctx.stroke();

      // Draw Joint points
      ctx.fillStyle = '#fff';
      joints.forEach(j => {
        ctx.beginPath();
        ctx.arc(j.x, j.y, 3 * s, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw Head
      ctx.beginPath();
      ctx.arc(head.x, head.y - 10 * s, 12 * s, 0, Math.PI * 2);
      ctx.stroke();
    };

    // Helper to draw a car
    const drawCar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, color: string) => {
      const s = scale * 1.5;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * s;
      
      // Body
      ctx.beginPath();
      ctx.moveTo(cx - 50 * s, cy + 15 * s);
      ctx.lineTo(cx - 50 * s, cy - 5 * s); // back
      ctx.lineTo(cx - 40 * s, cy - 10 * s); // trunk
      ctx.lineTo(cx - 20 * s, cy - 30 * s); // back window
      ctx.lineTo(cx + 10 * s, cy - 30 * s); // roof
      ctx.lineTo(cx + 30 * s, cy - 10 * s); // windshield
      ctx.lineTo(cx + 50 * s, cy - 5 * s); // hood
      ctx.lineTo(cx + 50 * s, cy + 15 * s); // front bumper
      ctx.closePath();
      ctx.stroke();

      // Wheels
      ctx.beginPath();
      ctx.arc(cx - 30 * s, cy + 15 * s, 12 * s, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 30 * s, cy + 15 * s, 12 * s, 0, Math.PI * 2);
      ctx.stroke();

      // Windows
      ctx.beginPath();
      ctx.moveTo(cx - 15 * s, cy - 28 * s);
      ctx.lineTo(cx + 5 * s, cy - 28 * s);
      ctx.lineTo(cx + 20 * s, cy - 12 * s);
      ctx.lineTo(cx - 30 * s, cy - 12 * s);
      ctx.closePath();
      ctx.stroke();
      
      ctx.moveTo(cx - 5 * s, cy - 28 * s);
      ctx.lineTo(cx - 5 * s, cy - 12 * s);
      ctx.stroke();
    };

    const draw = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Dark background
      ctx.fillStyle = '#050510'; 
      ctx.fillRect(0, 0, w, h);

      time += 16; // rough ms per frame

      // Draw grid overlay (simulate video feed)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x += 50) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 50) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Draw Players/Objects
      players.forEach((player, i) => {
        // Calculate position based on sine wave path
        const t = (time * player.speed + player.offset) * 0.001;
        const cx = w * 0.2 + (w * 0.6) * ((Math.sin(t * 0.5) + 1) / 2);
        const cy = h * 0.5 + Math.cos(t * 0.8) * h * 0.2 + (i * 40);
        
        const phase = t * 4; // Running phase

        // Draw Bounding Box
        let bw = 100 * player.scale;
        let bh = 180 * player.scale;
        
        if (player.type === 'car') {
          bw = 180 * player.scale;
          bh = 100 * player.scale;
        }

        const bx = cx - bw/2;
        const by = cy - bh/2 - (player.type === 'person' ? 20 * player.scale : 0);

        ctx.strokeStyle = player.color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(bx, by, bw, bh);
        ctx.setLineDash([]);

        // Draw tracking corners
        const cl = 15;
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Top Left
        ctx.moveTo(bx, by + cl); ctx.lineTo(bx, by); ctx.lineTo(bx + cl, by);
        // Top Right
        ctx.moveTo(bx + bw - cl, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + cl);
        // Bottom Left
        ctx.moveTo(bx, by + bh - cl); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + cl, by + bh);
        // Bottom Right
        ctx.moveTo(bx + bw - cl, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - cl);
        ctx.stroke();

        // Draw Pose Estimation or Vehicle
        if (player.type === 'car') {
          drawCar(ctx, cx, cy, player.scale, player.color);
        } else {
          drawPose(ctx, cx, cy, player.scale, phase, player.color);
        }

        // Draw Tracking Label
        ctx.fillStyle = player.color;
        ctx.fillRect(bx, by - 24, bw, 24);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`${player.id} | ${player.action}`, bx + 4, by - 8);

        // Draw motion trail
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${player.color === '#06b6d4' ? '6,182,212' : player.color === '#8b5cf6' ? '139,92,246' : '245,158,11'}, 0.2)`;
        ctx.lineWidth = 2;
        for (let hist = 1; hist < 10; hist++) {
          const ht = ((time - hist * 100) * player.speed + player.offset) * 0.001;
          const hx = w * 0.2 + (w * 0.6) * ((Math.sin(ht * 0.5) + 1) / 2);
          const hy = h * 0.5 + Math.cos(ht * 0.8) * h * 0.2 + (i * 40);
          if (hist === 1) ctx.moveTo(hx, hy + bh/2);
          else ctx.lineTo(hx, hy + bh/2);
        }
        ctx.stroke();
      });

      // Overlay UI elements (Simulate AI Video Tool)
      ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.font = '12px monospace';
      ctx.fillText(`FRAME: ${Math.floor(time / 16)}`, 20, h - 20);
      ctx.fillText(`TARGETS_TRACKED: 3`, 20, h - 40);
      ctx.fillText(`CONFIDENCE: 98.4%`, 20, h - 60);

      // Rec marker
      if (Math.floor(time / 500) % 2 === 0) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(30, 30, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText('LIVE_ANNOTATION', 45, 34);
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
        className="block w-full h-full opacity-60 mix-blend-screen"
      />
      {/* Soft gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/80 via-[#050510]/60 to-[#050510] z-10" />
    </div>
  );
}
