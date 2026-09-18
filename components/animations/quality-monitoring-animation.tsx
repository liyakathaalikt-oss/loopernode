'use client';

import React, { useEffect, useRef } from 'react';

export function QualityMonitoringAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;

    const particles: { x: number, y: number, driftY: number, isAnomalous: boolean, speed: number }[] = [];
    const maxParticles = 250;

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
      const loopLength = 1200;
      const t = time % loopLength;
      
      // Calculate Drift State
      let driftOffset = 0;
      let anomalyRate = 0;
      let alertActive = false;
      let healthScore = 100;

      if (t > 200 && t < 600) {
        // Drift builds up
        const progress = (t - 200) / 400;
        driftOffset = Math.sin(progress * Math.PI / 2) * -120; // moves up
        anomalyRate = progress;
        healthScore = 100 - (progress * 60); // Drops to 40%
      } else if (t >= 600 && t < 750) {
        // Alert & Correction
        driftOffset = -120;
        anomalyRate = 1.0;
        alertActive = true;
        healthScore = 40;
      } else if (t >= 750 && t < 950) {
        // Recovery
        const progress = (t - 750) / 200;
        driftOffset = -120 * (1 - Math.sin(progress * Math.PI / 2));
        anomalyRate = 1 - progress;
        alertActive = t < 800; // Alert stays on for a bit
        healthScore = 40 + (progress * 60);
      }

      // Spawn particles
      if (particles.length < maxParticles && time % 2 === 0) {
        const isAnomalous = Math.random() < anomalyRate;
        const spreadY = (Math.random() - 0.5) * 80;
        particles.push({
          x: -20,
          y: h * 0.55 + spreadY, // baseline
          driftY: isAnomalous ? driftOffset : 0,
          isAnomalous,
          speed: 2 + Math.random() * 1.5
        });
      }

      // Update and Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speed;
        
        // Gentle wave motion
        const wave = Math.sin(p.x * 0.01 + time * 0.05) * 20;
        const targetY = p.y + wave + p.driftY;
        
        if (p.x > w + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, targetY, 2.5, 0, Math.PI * 2);
        
        // Color logic
        if (p.isAnomalous) {
          ctx.fillStyle = alertActive ? '#ef4444' : '#f59e0b'; // Red if alert, amber if drifting
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = 'rgba(34, 211, 238, 0.7)'; // Cyan
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw faint connecting lines to nearby particles for a "network/stream" look
        if (i % 3 === 0) {
           for (let j = Math.max(0, i - 5); j < i; j++) {
              const p2 = particles[j];
              const dist = Math.hypot(p.x - p2.x, targetY - (p2.y + Math.sin(p2.x*0.01+time*0.05)*20 + p2.driftY));
              if (dist < 60) {
                 ctx.beginPath();
                 ctx.moveTo(p.x, targetY);
                 ctx.lineTo(p2.x, p2.y + Math.sin(p2.x*0.01+time*0.05)*20 + p2.driftY);
                 ctx.strokeStyle = p.isAnomalous || p2.isAnomalous ? 'rgba(245, 158, 11, 0.15)' : 'rgba(34, 211, 238, 0.1)';
                 ctx.lineWidth = 1;
                 ctx.stroke();
              }
           }
        }
      }

      // Scanner Line Effect
      const scanX = (time * 4) % (w * 0.8) + w * 0.1;
      ctx.beginPath();
      ctx.moveTo(scanX, h * 0.15);
      ctx.lineTo(scanX, h * 0.85);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      const grad = ctx.createLinearGradient(scanX - 50, 0, scanX, 0);
      grad.addColorStop(0, 'rgba(34, 211, 238, 0)');
      grad.addColorStop(1, 'rgba(34, 211, 238, 0.15)');
      ctx.fillStyle = grad;
      ctx.fillRect(scanX - 50, h * 0.15, 50, h * 0.7);

      // Dashboards (Right Side)
      const dashX = w * 0.65;
      const dashY = h * 0.2;
      const dashW = Math.min(w * 0.3, 350);
      
      // 1. Health Trend Graph
      ctx.beginPath();
      ctx.roundRect(dashX, dashY, dashW, h * 0.25, 8);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.fill();
      ctx.strokeStyle = alertActive ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 211, 238, 0.2)';
      ctx.stroke();
      
      // Draw dynamic trend line inside dashboard
      ctx.beginPath();
      for (let i = 0; i < dashW - 40; i += 5) {
        // Historical lookback of the t value
        const lookbackT = (time - (dashW - 40 - i) * 2 + loopLength) % loopLength;
        let pastHealth = 100;
        if (lookbackT > 200 && lookbackT < 600) pastHealth = 100 - ((lookbackT - 200)/400 * 60);
        else if (lookbackT >= 600 && lookbackT < 750) pastHealth = 40;
        else if (lookbackT >= 750 && lookbackT < 950) pastHealth = 40 + ((lookbackT - 750)/200 * 60);

        const pointX = dashX + 20 + i;
        const pointY = dashY + (h * 0.25) - 20 - (pastHealth / 100) * (h * 0.25 - 40);
        if (i === 0) ctx.moveTo(pointX, pointY);
        else ctx.lineTo(pointX, pointY);
      }
      ctx.strokeStyle = healthScore > 80 ? '#4ade80' : healthScore > 50 ? '#f59e0b' : '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 2. Data Distribution (Bell Curve)
      const distY = dashY + h * 0.3;
      ctx.beginPath();
      ctx.roundRect(dashX, distY, dashW, h * 0.25, 8);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.stroke();

      // Draw Base Distribution (Ideal)
      ctx.beginPath();
      const curveH = h * 0.25 - 30;
      for (let i = 0; i < dashW - 40; i++) {
        const px = i / (dashW - 40);
        // Standard normal distribution centered at 0.5
        const py = Math.exp(-Math.pow(px - 0.5, 2) / 0.02);
        const yPos = distY + h * 0.25 - 15 - py * curveH;
        if (i === 0) ctx.moveTo(dashX + 20 + i, yPos);
        else ctx.lineTo(dashX + 20 + i, yPos);
      }
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)'; // Static baseline
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Draw Current Distribution (Drifted)
      ctx.beginPath();
      const currentCenter = 0.5 + (anomalyRate * 0.25); // Shifts right
      const currentSpread = 0.02 + (anomalyRate * 0.015); // Flattens slightly
      for (let i = 0; i < dashW - 40; i++) {
        const px = i / (dashW - 40);
        const py = Math.exp(-Math.pow(px - currentCenter, 2) / currentSpread);
        const yPos = distY + h * 0.25 - 15 - py * curveH;
        if (i === 0) ctx.moveTo(dashX + 20 + i, yPos);
        else ctx.lineTo(dashX + 20 + i, yPos);
      }
      ctx.strokeStyle = alertActive ? '#ef4444' : anomalyRate > 0.2 ? '#f59e0b' : '#4ade80';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // ALERT INDICATOR
      if (alertActive || anomalyRate > 0.6) {
        const pulse = Math.abs(Math.sin(time * 0.1));
        const alertX = dashX + dashW - 30;
        const alertY = dashY - 20;
        
        ctx.beginPath();
        ctx.arc(alertX, alertY, 8 + pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${0.4 + pulse * 0.4})`; // Red pulse
        ctx.fill();

        ctx.beginPath();
        ctx.arc(alertX, alertY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#ef4444';
        ctx.fillText('DRIFT DETECTED', alertX - 25, alertY);
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
        style={{ opacity: 0.5 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_100%)]" />
    </div>
  );
}
