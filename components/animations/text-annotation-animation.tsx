'use client';

import React, { useEffect, useRef } from 'react';

export function TextAnnotationAnimation() {
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

      time += 1.5;

      const scanX = w * 0.35;

      // Draw Scanner Line
      ctx.beginPath();
      ctx.moveTo(scanX, h * 0.1);
      ctx.lineTo(scanX, h * 0.9);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const grad = ctx.createLinearGradient(scanX, 0, scanX + 150, 0);
      grad.addColorStop(0, 'rgba(34, 211, 238, 0.15)');
      grad.addColorStop(1, 'rgba(34, 211, 238, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(scanX, h * 0.1, 150, h * 0.8);

      const loopW = Math.max(w * 1.5, 2000);

      const drawAnnotatedText = (
        baseX: number, 
        y: number, 
        text: string, 
        annotations: { word: string, label: string, color: string }[]
      ) => {
        let currentX = baseX;
        ctx.font = '16px monospace';
        ctx.textBaseline = 'middle';

        const words = text.split(' ');
        
        words.forEach((word) => {
          const ann = annotations.find(a => word.includes(a.word));
          const wordW = ctx.measureText(word + ' ').width;
          
          if (ann && currentX > scanX) {
            ctx.fillStyle = ann.color.replace('rgb', 'rgba').replace(')', ', 0.2)');
            ctx.globalAlpha = 0.2;
            ctx.fillRect(currentX - 2, y - 12, wordW - 2, 24);
            ctx.globalAlpha = 1.0;
            
            ctx.strokeStyle = ann.color;
            ctx.lineWidth = 1;
            ctx.strokeRect(currentX - 2, y - 12, wordW - 2, 24);
            
            ctx.fillStyle = ann.color;
            ctx.font = '10px monospace';
            ctx.fillText(ann.label, currentX, y - 20);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px monospace';
            ctx.fillText(word + ' ', currentX, y);
          } else {
            ctx.fillStyle = currentX > scanX ? 'rgba(255,255,255,0.7)' : 'rgba(148, 163, 184, 0.4)';
            ctx.font = '16px monospace';
            ctx.fillText(word + ' ', currentX, y);
          }
          currentX += wordW;
        });
      };

      // --- LANE 1: NER ---
      const nerY = h * 0.25;
      const nerText = "CEO Jane Doe announced the new Nexus processor in Tokyo on Monday.";
      const nerAnnotations = [
        { word: 'Jane', label: 'PER', color: '#22d3ee' },
        { word: 'Doe', label: 'PER', color: '#22d3ee' },
        { word: 'Nexus', label: 'PROD', color: '#a855f7' },
        { word: 'Tokyo', label: 'LOC', color: '#4ade80' },
        { word: 'Monday.', label: 'DATE', color: '#eab308' }
      ];
      
      const nerX = (time * 1.2) % loopW;
      drawAnnotatedText(w * 0.05 + nerX, nerY, nerText, nerAnnotations);
      drawAnnotatedText(w * 0.05 + nerX - loopW, nerY, nerText, nerAnnotations);

      // --- LANE 2: RLHF ---
      const rlhfY = h * 0.5;
      const rlhfX = (time * 1.0) % loopW;
      
      const drawRLHF = (xOffset: number) => {
        const x = w * 0.05 + xOffset;
        
        ctx.fillStyle = x > scanX ? '#22d3ee' : 'rgba(148, 163, 184, 0.4)';
        ctx.font = 'bold 14px monospace';
        ctx.fillText("[Instruction] Summarize the document.", x, rlhfY);
        
        if (x > scanX - 150) {
          const splitX = x + 340;
          ctx.beginPath();
          ctx.moveTo(splitX, rlhfY);
          ctx.lineTo(splitX + 40, rlhfY - 30);
          ctx.lineTo(splitX + 80, rlhfY - 30);
          
          ctx.moveTo(splitX, rlhfY);
          ctx.lineTo(splitX + 40, rlhfY + 30);
          ctx.lineTo(splitX + 80, rlhfY + 30);
          
          ctx.strokeStyle = splitX > scanX ? 'rgba(34, 211, 238, 0.4)' : 'rgba(148, 163, 184, 0.2)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          const respAX = splitX + 90;
          const respAY = rlhfY - 30;
          ctx.fillStyle = respAX > scanX ? '#4ade80' : 'rgba(148, 163, 184, 0.4)';
          ctx.fillText("[Response A] The document highlights...", respAX, respAY);
          if (respAX > scanX) {
            ctx.fillStyle = '#4ade80';
            ctx.font = '11px monospace';
            ctx.fillText("✓ Reward: +0.95 (Human Pref)", respAX, respAY - 18);
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.5)';
            ctx.strokeRect(respAX - 10, respAY - 14, 320, 28);
          }

          const respBX = splitX + 90;
          const respBY = rlhfY + 30;
          ctx.fillStyle = respBX > scanX ? 'rgba(239, 68, 68, 0.6)' : 'rgba(148, 163, 184, 0.4)';
          ctx.font = '14px monospace';
          ctx.fillText("[Response B] It is about...", respBX, respBY);
          if (respBX > scanX) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
            ctx.font = '11px monospace';
            ctx.fillText("✗ Reward: -0.42", respBX, respBY + 22);
          }
        }
      };
      
      drawRLHF(rlhfX);
      drawRLHF(rlhfX - loopW);

      // --- LANE 3: Sentiment ---
      const sentY = h * 0.75;
      const sentX = (time * 1.4) % loopW;
      
      const sentText1 = "The new features are absolutely fantastic!";
      const sentAnnotations1 = [{ word: 'fantastic!', label: 'POS', color: '#4ade80' }];
      drawAnnotatedText(w * 0.05 + sentX, sentY, sentText1, sentAnnotations1);
      drawAnnotatedText(w * 0.05 + sentX - loopW, sentY, sentText1, sentAnnotations1);

      const sentText2 = "Loading times have been terrible lately.";
      const sentAnnotations2 = [{ word: 'terrible', label: 'NEG', color: '#ef4444' }];
      drawAnnotatedText(w * 0.05 + sentX + 700, sentY, sentText2, sentAnnotations2);
      drawAnnotatedText(w * 0.05 + sentX + 700 - loopW, sentY, sentText2, sentAnnotations2);

      // Data Particles
      const pCount = 30;
      for (let i = 0; i < pCount; i++) {
        const pX = (time * 2 + i * 100) % w;
        const pY = h * 0.1 + (Math.sin(pX * 0.01 + i) * 0.5 + 0.5) * h * 0.8;
        
        ctx.beginPath();
        ctx.arc(pX, pY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = pX > scanX ? '#22d3ee' : 'rgba(255,255,255,0.1)';
        ctx.fill();
        
        if (pX > scanX) {
           ctx.shadowColor = '#22d3ee';
           ctx.shadowBlur = 6;
           ctx.fill();
           ctx.shadowBlur = 0;
        }
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
