'use client';

import React, { useEffect, useRef } from 'react';

export function AudioAnnotationAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;

    const totalSegLength = 1600;
    const segments = [
      { start: 0, end: 450, color: '#22d3ee', label: 'Speaker 01', type: 'speech', tag: 'Emotion: Neutral' },
      { start: 450, end: 550, color: '#94a3b8', label: 'Silence', type: 'noise', tag: '' },
      { start: 550, end: 900, color: '#a855f7', label: 'Speaker 02', type: 'speech', tag: 'Keyword: "AI"' },
      { start: 900, end: 1100, color: '#ef4444', label: 'Acoustic Event', type: 'event', tag: '[Noise: Typing]' },
      { start: 1100, end: 1600, color: '#3b82f6', label: 'Speaker 01', type: 'speech', tag: 'Emotion: Confident' }
    ];

    const particles: { x: number, y: number, speedX: number, speedY: number, life: number, maxLife: number, color: string }[] = [];

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

      time += 2.5;

      const barWidth = 4;
      const barSpacing = 10;
      const midX = w * 0.35; // Processing pipeline line
      const centerY = h * 0.5;

      // Draw Scanner/Pipeline Line
      ctx.beginPath();
      ctx.moveTo(midX, centerY - 150);
      ctx.lineTo(midX, centerY + 150);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      const grad = ctx.createLinearGradient(midX, 0, midX + 150, 0);
      grad.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
      grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(midX, centerY - 150, 150, 300);

      // Spawn Particles at scanner
      if (Math.random() < 0.4) {
        particles.push({
          x: midX,
          y: centerY + (Math.random() - 0.5) * 100,
          speedX: 1 + Math.random() * 3,
          speedY: (Math.random() - 0.5) * 1,
          life: 0,
          maxLife: 50 + Math.random() * 100,
          color: ['#22d3ee', '#a855f7', '#3b82f6'][Math.floor(Math.random() * 3)]
        });
      }

      // Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = 1 - (p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // Draw Waveform
      for (let x = 0; x < w; x += barSpacing) {
        const vx = (x + time) % totalSegLength;
        const seg = segments.find(s => vx >= s.start && vx < s.end) || segments[0];

        const noise1 = Math.sin(vx * 0.03) * 0.5;
        const noise2 = Math.cos(vx * 0.08) * 0.3;
        const noise3 = Math.sin(vx * 0.01) * 0.2;
        let amplitude = Math.abs(noise1 + noise2 + noise3) * 80 + 10;
        
        if (seg.type === 'noise') amplitude *= 0.2;
        if (seg.type === 'event') amplitude = (Math.random() * 40) + 10;

        let color = 'rgba(148, 163, 184, 0.3)'; // Raw audio
        let drawHeight = amplitude;
        let isProcessed = false;

        if (x >= midX) {
          color = seg.color;
          isProcessed = true;
        } else if (x > midX - 50) {
          // Transition glow
          ctx.globalAlpha = 0.5 + ((x - (midX - 50)) / 50) * 0.5;
          color = seg.color;
        }

        ctx.fillStyle = color;
        if (isProcessed) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 8;
        }
        
        ctx.fillRect(x, centerY - drawHeight, barWidth, drawHeight * 2);
        
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }

      // Draw Annotations (Bounding Boxes and Labels on Processed Side)
      const repetitions = Math.ceil((w + time) / totalSegLength) + 1;
      
      for (let i = -1; i < repetitions; i++) {
        const loopOffset = i * totalSegLength - (time % totalSegLength);
        
        segments.forEach(seg => {
          const screenStart = loopOffset + seg.start;
          const screenEnd = loopOffset + seg.end;
          
          if (screenEnd > midX && screenStart < w && seg.type !== 'noise') {
            const drawStart = Math.max(screenStart, midX + 10);
            const drawEnd = Math.min(screenEnd - 5, w);
            
            if (drawEnd - drawStart > 30) {
              const boxH = 180;
              const boxY = centerY - boxH / 2;
              
              // Bounding Box
              ctx.strokeStyle = seg.color;
              ctx.lineWidth = 1.5;
              ctx.globalAlpha = 0.4;
              ctx.setLineDash([4, 4]);
              ctx.strokeRect(drawStart, boxY, drawEnd - drawStart, boxH);
              ctx.setLineDash([]);
              ctx.globalAlpha = 1.0;
              
              // Labels (only if the start of the segment is on screen and past the scanner)
              if (screenStart >= midX + 10 && screenStart < w - 100) {
                // Speaker / Event Label
                ctx.fillStyle = seg.color;
                ctx.font = 'bold 14px sans-serif';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillText(seg.label, screenStart + 4, boxY - 8);

                // Tag Label (Emotion / Keyword)
                if (seg.tag) {
                  ctx.fillStyle = 'rgba(255,255,255,0.7)';
                  ctx.font = '12px monospace';
                  ctx.textBaseline = 'top';
                  ctx.fillText(seg.tag, screenStart + 4, boxY + boxH + 8);
                }

                // Timecode
                ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
                ctx.font = '10px monospace';
                ctx.textAlign = 'right';
                const mm = Math.floor((seg.start / 100) / 60).toString().padStart(2, '0');
                const ss = Math.floor((seg.start / 100) % 60).toString().padStart(2, '0');
                ctx.fillText(`${mm}:${ss}`, screenStart - 4, boxY + boxH);
              }
            }
          }
        });
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
