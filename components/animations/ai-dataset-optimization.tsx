'use client';

import React, { useEffect, useRef } from 'react';

export function AiDatasetOptimizationAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;
    
    // Setup binary rows
    const numRows = 30;
    const binaryRows = Array.from({ length: numRows }, () => generateBinaryString());
    const rowColors = Array.from({ length: numRows }, () => getRandomColor());

    function generateBinaryString() {
      const length = Math.floor(Math.random() * 15) + 10;
      return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0').join('');
    }

    function getRandomColor() {
      const colors = ['#22d3ee', '#4ade80', '#3b82f6']; // cyan, green, blue
      return colors[Math.floor(Math.random() * colors.length)];
    }

    const draw = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      ctx.fillStyle = '#050510'; 
      ctx.fillRect(0, 0, w, h);

      time += 1;

      if (time % 15 === 0) {
        const updateIdx = Math.floor(Math.random() * numRows);
        binaryRows[updateIdx] = generateBinaryString();
      }

      // X coordinates
      const leftX = w * 0.22;
      const dotX = w * 0.25;
      const midX = w * 0.45;
      const rightX = w * 0.55;
      
      const rowSpacing = (h * 0.8) / numRows;
      const startY = h * 0.1;

      const convergencePoints = [
        { x: midX, y: h * 0.35, label: '100111', color: '#3b82f6' },
        { x: midX, y: h * 0.50, label: '111001', color: '#22d3ee' },
        { x: midX, y: h * 0.65, label: '001010', color: '#4ade80' }
      ];

      // BEZIER CURVES & PARTICLES
      ctx.lineWidth = 1;
      for (let i = 0; i < numRows; i++) {
        const y = startY + i * rowSpacing;
        const color = rowColors[i];
        
        const targetIdx = i % 3;
        const target = convergencePoints[targetIdx];

        ctx.beginPath();
        ctx.moveTo(dotX, y);
        const cp1X = dotX + (target.x - dotX) * 0.5;
        const cp1Y = y;
        const cp2X = dotX + (target.x - dotX) * 0.5;
        const cp2Y = target.y;
        
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, target.x, target.y);
        
        const grad = ctx.createLinearGradient(dotX, y, target.x, target.y);
        grad.addColorStop(0, color);
        grad.addColorStop(1, target.color);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        const progress = (time * 0.005 + i * 0.1) % 1;
        const pX = calculateBezierPoint(progress, dotX, cp1X, cp2X, target.x);
        const pY = calculateBezierPoint(progress, y, cp1Y, cp2Y, target.y);
        
        ctx.beginPath();
        ctx.arc(pX, pY, 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // BINARY & DOTS
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = '14px monospace';
      
      for (let i = 0; i < numRows; i++) {
        const y = startY + i * rowSpacing;
        
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.fillText(binaryRows[i], leftX, y);
        
        ctx.beginPath();
        ctx.arc(dotX, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = rowColors[i];
        ctx.shadowColor = rowColors[i];
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // CONVERGENCE POINTS
      ctx.textAlign = 'left';
      ctx.font = '18px monospace';
      for (let i = 0; i < convergencePoints.length; i++) {
        const p = convergencePoints[i];
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.fillText(p.label, p.x + 15, p.y);
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.moveTo(p.x + 90, p.y);
        
        // Curve to top dashboard
        const dashY = h * 0.45;
        ctx.bezierCurveTo(p.x + 120, p.y, rightX - 30, dashY, rightX, dashY + (i - 1) * 20);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // DASHBOARDS
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
      ctx.lineWidth = 1.5;
      
      // Top Panel (Bar chart)
      const topPnlY = h * 0.15;
      const topPnlH = h * 0.4;
      const topPnlW = Math.min(w * 0.35, 450);
      ctx.beginPath();
      ctx.roundRect(rightX, topPnlY, topPnlW, topPnlH, 12);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.fill();
      ctx.stroke();

      // Top Panel - Wavy lines
      ctx.beginPath();
      for(let i = 0; i < topPnlW - 40; i+=5) {
        const lx = rightX + 20 + i;
        const ly = topPnlY + 50 + Math.sin(i * 0.02 + time * 0.05) * 20;
        if (i===0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
      }
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      for(let i = 0; i < topPnlW - 40; i+=5) {
        const lx = rightX + 20 + i;
        const ly = topPnlY + 70 + Math.sin(i * 0.015 - time * 0.03) * 15;
        if (i===0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
      }
      ctx.strokeStyle = '#4ade80';
      ctx.stroke();

      // Top Panel - Bar Chart
      const barCount = 20;
      const barW = (topPnlW - 60) / barCount - 4;
      for (let i = 0; i < barCount; i++) {
        const bx = rightX + 30 + i * (barW + 4);
        const bHeight = 30 + Math.abs(Math.sin(i * 0.5 + time * 0.02)) * (topPnlH - 160);
        const by = topPnlY + topPnlH - 30 - bHeight;
        
        ctx.fillStyle = i % 2 === 0 ? '#22d3ee' : '#4ade80';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fillRect(bx, by, barW, bHeight);
        ctx.shadowBlur = 0;
      }

      // Bottom-Left Panel (Ring)
      const blPnlY = h * 0.6;
      const blPnlH = h * 0.25;
      const blPnlW = topPnlW * 0.45;
      ctx.beginPath();
      ctx.roundRect(rightX, blPnlY, blPnlW, blPnlH, 12);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      const cx = rightX + blPnlW / 2;
      const cy = blPnlY + blPnlH / 2;
      const ringRadius = Math.min(blPnlW, blPnlH) * 0.25;
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.lineWidth = 12;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.8);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineCap = 'round';
      ctx.stroke();
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#22d3ee';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('80%', cx, cy + 2);

      // Bottom-Right Panel (Horizontal bars)
      const brPnlX = rightX + topPnlW * 0.55;
      const brPnlW = topPnlW * 0.45;
      ctx.beginPath();
      ctx.roundRect(brPnlX, blPnlY, brPnlW, blPnlH, 12);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const bars = [88, 71, 46, 26];
      ctx.textAlign = 'right';
      ctx.font = '16px sans-serif';
      for (let i = 0; i < bars.length; i++) {
        const barH = 10;
        const barSpacing = (blPnlH - 40) / 4;
        const barY = blPnlY + 20 + i * barSpacing;
        
        ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
        ctx.fillRect(brPnlX + 20, barY, brPnlW - 80, barH);
        
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(brPnlX + 20, barY, (brPnlW - 80) * (bars[i] / 100), barH);
        
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(bars[i] + '%', brPnlX + brPnlW - 20, barY + barH/2 + 2);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: 0.3 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_100%)]" />
    </div>
  );
}

function calculateBezierPoint(t: number, p0: number, p1: number, p2: number, p3: number) {
  const cX = 3 * (p1 - p0);
  const bX = 3 * (p2 - p1) - cX;
  const aX = p3 - p0 - cX - bX;
  return aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0;
}
