"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export function ParticleConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(true);
  
  // Mouse position for interactive parallax
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

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

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Config
    const colors = ['#0DBED6', '#0A4BF1', '#8B5CF6', '#22D3EE'];
    // Scale particle count based on screen width for performance
    const getParticleCount = () => {
      if (window.innerWidth > 1200) return 120;
      if (window.innerWidth > 768) return 80;
      return 40;
    };
    
    // The maximum distance between two particles to draw a connecting line
    const connectionDistance = 140;

    const resize = () => {
      if (!canvas.parentElement) return;
      // Use devicePixelRatio for crisp rendering on retina displays
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const init = () => {
      resize();
      particles = [];
      const count = getParticleCount();
      
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, // Slow movement
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      // Solid background color to match the page, avoiding transparency blending cost
      ctx.fillStyle = '#0A0A1B';
      ctx.fillRect(0, 0, width, height);

      // Add a subtle gradient glow in the center for depth
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/1.5);
      gradient.addColorStop(0, 'rgba(11, 15, 45, 0.5)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Smoothly interpolate current mouse position towards target (LERP)
      if (isHoveringRef.current) {
        currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.05;
        currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.05;
      } else {
        // Slowly return to center when not hovering
        currentMouseRef.current.x += (0 - currentMouseRef.current.x) * 0.02;
        currentMouseRef.current.y += (0 - currentMouseRef.current.y) * 0.02;
      }

      // Apply mouse parallax offset (much stronger multiplier for 3D depth)
      // We multiply by radius later, so larger particles move much more than smaller ones
      const mouseOffsetX = currentMouseRef.current.x * 0.15;
      const mouseOffsetY = currentMouseRef.current.y * 0.15;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Opacity scales based on how close they are
            const opacity = (1 - distance / connectionDistance) * 0.3;
            
            ctx.beginPath();
            // Calculate parallax for both points
            // p.radius is between 0.5 and 2.0. We multiply by 1.5 to exaggerate the depth difference
            const p1DrawX = p.x - mouseOffsetX * (p.radius * 1.5);
            const p1DrawY = p.y - mouseOffsetY * (p.radius * 1.5);
            const p2DrawX = p2.x - mouseOffsetX * (p2.radius * 1.5);
            const p2DrawY = p2.y - mouseOffsetY * (p2.radius * 1.5);

            ctx.moveTo(p1DrawX, p1DrawY);
            ctx.lineTo(p2DrawX, p2DrawY);
            ctx.strokeStyle = `rgba(13, 190, 214, ${opacity})`; // Using primary brand color for lines
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        const drawX = p.x - mouseOffsetX * (p.radius * 1.5);
        const drawY = p.y - mouseOffsetY * (p.radius * 1.5);
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Add a slight glow to individual particles
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        init();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, isInView]);

  // Handle mouse movement for parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate distance from center of container
    targetMouseRef.current = {
      x: (e.clientX - rect.left) - rect.width / 2,
      y: (e.clientY - rect.top) - rect.height / 2,
    };
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A1B]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 
        A subtle radial gradient mask over the container to fade the constellation 
        out around the edges, focusing attention on the center text.
      */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#0A0A1B_100%)] pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-70 transition-opacity duration-1000"
      />
    </div>
  );
}
