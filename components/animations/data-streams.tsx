"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Stream {
  x: number;
  y: number;
  length: number;
  speed: number;
  width: number;
  color: string;
  horizontal: boolean;
}

export function DataStreams() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion || !isInView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let streams: Stream[] = [];
    
    // Config
    const colors = ['#0DBED6', '#0A4BF1', '#8B5CF6', '#22D3EE'];
    // Stream density based on screen width
    const streamCount = window.innerWidth > 768 ? 60 : 30;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    const createStream = (): Stream => {
      const horizontal = Math.random() > 0.5;
      
      if (horizontal) {
        return {
          x: -Math.random() * 500, // start off-screen
          y: Math.random() * canvas.height,
          length: Math.random() * 200 + 50,
          speed: Math.random() * 4 + 2,
          width: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          horizontal: true
        };
      } else {
        return {
          x: Math.random() * canvas.width,
          y: -Math.random() * 500, // start off-screen
          length: Math.random() * 200 + 50,
          speed: Math.random() * 4 + 2,
          width: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          horizontal: false
        };
      }
    };

    const init = () => {
      resize();
      streams = [];
      for (let i = 0; i < streamCount; i++) {
        // Distribute them initially so they aren't all off-screen
        const stream = createStream();
        if (stream.horizontal) stream.x = Math.random() * canvas.width;
        else stream.y = Math.random() * canvas.height;
        streams.push(stream);
      }
    };

    const draw = () => {
      // Instead of clearRect, we fill with a semi-transparent black to create light trails
      ctx.fillStyle = 'rgba(10, 10, 27, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];

        // Create a linear gradient for the stream (bright head, fading tail)
        ctx.beginPath();
        if (stream.horizontal) {
          const grad = ctx.createLinearGradient(stream.x, stream.y, stream.x - stream.length, stream.y);
          grad.addColorStop(0, stream.color);
          grad.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = stream.width;
          ctx.moveTo(stream.x, stream.y);
          ctx.lineTo(stream.x - stream.length, stream.y);
          ctx.stroke();

          // Move stream
          stream.x += stream.speed;

          // Reset if off screen
          if (stream.x - stream.length > canvas.width) {
            streams[i] = createStream();
          }
        } else {
          const grad = ctx.createLinearGradient(stream.x, stream.y, stream.x, stream.y - stream.length);
          grad.addColorStop(0, stream.color);
          grad.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = stream.width;
          ctx.moveTo(stream.x, stream.y);
          ctx.lineTo(stream.x, stream.y - stream.length);
          ctx.stroke();

          // Move stream
          stream.y += stream.speed;

          // Reset if off screen
          if (stream.y - stream.length > canvas.height) {
            streams[i] = createStream();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0A1B]">
      {/* Background radial gradient to give some depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,190,214,0.05)_0%,transparent_70%)] z-0" />
      <canvas ref={canvasRef} className="w-full h-full relative z-10 opacity-70 mix-blend-screen" />
    </div>
  );
}
