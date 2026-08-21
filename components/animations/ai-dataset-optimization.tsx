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

      time += 0.5;

      const colors = ['#06b6d4', '#10b981', '#eab308', '#ef4444'];
      
      // Calculate coordinates for the two structures (Scaled up for larger presence)
      const leftGridX = w * 0.1;
      const leftGridY = h * 0.15;
      const leftGridW = Math.min(w * 0.3, 400);
      const leftGridH = h * 0.7;
      
      const rightGridX = w * 0.55;
      const rightGridY = h * 0.15;
      const rightGridW = Math.min(w * 0.35, 450);
      const rightRowH = h * 0.15;
      
      const cols = 8;
      const rows = 12;
      const blockW = leftGridW / cols;
      const blockH = leftGridH / rows;

      // DRAW FLOWING CONNECTION LINES (Rendered underneath blocks)
      ctx.lineWidth = 2.5; // Thicker lines
      for (let r = 0; r < rows; r++) {
        for (let c = cols - 1; c < cols; c++) { // Only from the rightmost column of the left grid
          const colorIdx = (r + c * 3 + Math.floor(time / 50)) % 4; // Pseudo-random categorization
          const startX = leftGridX + c * blockW + blockW;
          const startY = leftGridY + r * blockH + blockH / 2;
          
          // Destination row based on category/color
          const endX = rightGridX;
          const endY = rightGridY + colorIdx * rightRowH * 1.1 + rightRowH / 2;

          // Flowing bezier curve
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          
          // Animate control points slightly for flowing effect
          const cp1X = startX + (endX - startX) * 0.4;
          const cp1Y = startY + Math.sin(time * 0.05 + r) * 20;
          const cp2X = startX + (endX - startX) * 0.6;
          const cp2Y = endY + Math.cos(time * 0.05 + r) * 20;
          
          ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
          
          ctx.strokeStyle = `rgba(${hexToRgb(colors[colorIdx])}, 0.5)`;
          ctx.stroke();

          // Animated particles moving along the line
          const particleProgress = (time * 0.01 + r * 0.1) % 1;
          const pX = calculateBezierPoint(particleProgress, startX, cp1X, cp2X, endX);
          const pY = calculateBezierPoint(particleProgress, startY, cp1Y, cp2Y, endY);
          
          ctx.beginPath();
          ctx.arc(pX, pY, 4, 0, Math.PI * 2); // Larger particles
          ctx.fillStyle = colors[colorIdx];
          ctx.shadowColor = colors[colorIdx];
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // DRAW LEFT GRID (Raw / Disorganized Data)
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          // Add some gaps/missing blocks for "raw data" feel
          if ((c * r + 7) % 13 === 0) continue;

          // Parallax and floating effect
          const floatY = Math.sin(time * 0.02 + c + r) * 3;
          const x = leftGridX + c * blockW;
          const y = leftGridY + r * blockH + floatY;
          
          // Randomly assign colors but bias based on time to simulate "sorting"
          const colorIdx = (c * 7 + r * 11 + Math.floor(time / 100)) % 4;
          
          ctx.fillStyle = colors[colorIdx];
          // Slight opacity variation for depth
          ctx.globalAlpha = 0.7 + Math.sin(time * 0.05 + c) * 0.3;
          ctx.fillRect(x + 2, y + 2, blockW - 4, blockH - 4);
          ctx.globalAlpha = 1.0;
        }
      }

      // DRAW RIGHT GRID (Optimized / Balanced Data)
      const targetCols = 10;
      const targetBlockW = rightGridW / targetCols;
      const targetBlockH = rightRowH * 0.6;

      for (let i = 0; i < 4; i++) { // 4 categories (colors)
        const rowY = rightGridY + i * rightRowH * 1.1; // Reduced spacing multiplier slightly to fit taller rows
        
        for (let c = 0; c < targetCols; c++) {
          const fillThreshold = (Math.sin(time * 0.02 + i) + 1) * targetCols / 2 + 2;
          
          if (c < fillThreshold) {
            const x = rightGridX + c * targetBlockW;
            const y = rowY + (rightRowH - targetBlockH) / 2;
            
            ctx.fillStyle = colors[i];
            ctx.shadowColor = colors[i];
            ctx.shadowBlur = c === Math.floor(fillThreshold) - 1 ? 15 : 0;
            
            const pulse = 0.8 + Math.sin(time * 0.1 + c) * 0.2;
            ctx.globalAlpha = pulse;
            
            ctx.fillRect(x + 2, y + 2, targetBlockW - 4, targetBlockH - 4);
            
            ctx.globalAlpha = 1.0;
            ctx.shadowBlur = 0;
          }
        }
      }
      
      const scanLineY = leftGridY + (time % (leftGridH * 1.5)) - (leftGridH * 0.25);
      
      if (scanLineY > leftGridY && scanLineY < leftGridY + leftGridH) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.fillRect(leftGridX - 20, scanLineY, leftGridW + 40, 2);
        
        const gradient = ctx.createLinearGradient(0, scanLineY - 20, 0, scanLineY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
        ctx.fillStyle = gradient;
        ctx.fillRect(leftGridX - 20, scanLineY - 20, leftGridW + 40, 20);
        ctx.shadowBlur = 0;
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
        style={{
          opacity: 0.6,
        }}
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

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
    : '255, 255, 255';
}
