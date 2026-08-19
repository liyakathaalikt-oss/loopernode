"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function DataWaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(true);
  
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

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

    // Configuration for the 3D grid
    const cols = 50;
    const rows = 30;
    const spacing = 45;

    const init = () => {
      resize();
    };

    const draw = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      // Deep space background
      ctx.fillStyle = '#0A0A1B';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation for parallax camera
      currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.05;
      currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.05;

      const cameraX = currentMouseRef.current.x * 0.5;
      const cameraY = currentMouseRef.current.y * 0.5;

      time += 0.02;

      const gridWidth = cols * spacing;
      const gridHeight = rows * spacing;

      const startX = width / 2 - gridWidth / 2;
      
      // We will render points from back (top) to front (bottom) for proper z-indexing look
      for (let z = 0; z < rows; z++) {
        for (let x = 0; x < cols; x++) {
          
          // Base 3D coordinates
          const xPos = (x * spacing) - gridWidth / 2;
          const zPos = (z * spacing) - gridHeight / 2;
          
          // Calculate wave height (Y) based on X, Z, and Time using sine waves
          const distFromCenter = Math.sqrt(xPos*xPos + zPos*zPos);
          let yPos = Math.sin(distFromCenter * 0.005 - time * 2) * 40;
          yPos += Math.sin(xPos * 0.02 + time) * 30;
          yPos += Math.cos(zPos * 0.02 + time) * 30;

          // Mouse interaction: Make points rise when mouse is near
          // We map 2D mouse position to approximate 3D grid area
          const gridMouseX = targetMouseRef.current.x;
          // Approximate Z based on mouse Y
          const gridMouseZ = (targetMouseRef.current.y / height) * gridHeight - gridHeight/4; 
          
          const dx = xPos - gridMouseX;
          const dz = zPos - gridMouseZ;
          const mouseDist = Math.sqrt(dx*dx + dz*dz);
          
          if (mouseDist < 250) {
            yPos -= (250 - mouseDist) * 0.3; // Rise up towards mouse
          }

          // Simple 3D to 2D projection
          const fov = 800;
          const viewerZ = 400 + cameraY; // Camera height affects perspective
          
          // Move the whole grid back on the Z axis
          const zTransformed = zPos + 600; 
          
          if (zTransformed < 1) continue; // Don't draw points behind camera

          const scale = fov / zTransformed;
          
          // Apply camera X pan and calculate final 2D screen coordinates
          const screenX = width / 2 + (xPos - cameraX) * scale;
          // Tilt the grid down
          const screenY = height / 2 + (yPos + 200) * scale;

          // Determine color based on height (yPos)
          // Higher = Cyan, Lower = Purple
          const normalizedHeight = (yPos + 80) / 160; // 0 to 1 roughly
          
          // Draw the point
          const radius = Math.max(0.5, 3 * scale);
          
          // Fade out points far in the distance
          const opacity = Math.min(1, Math.max(0, 1.2 - (zTransformed / 1200)));
          
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
          
          if (normalizedHeight < 0.4) {
            ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`; // Purple
          } else if (normalizedHeight > 0.6) {
            ctx.fillStyle = `rgba(13, 190, 214, ${opacity})`; // Cyan
          } else {
            ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`; // Indigo
          }
          
          ctx.fill();

          // Connect points to form a mesh (wireframe)
          // Connect to the right
          if (x < cols - 1) {
             const nextXPos = ((x + 1) * spacing) - gridWidth / 2;
             const nextDist = Math.sqrt(nextXPos*nextXPos + zPos*zPos);
             let nextYPos = Math.sin(nextDist * 0.005 - time * 2) * 40;
             nextYPos += Math.sin(nextXPos * 0.02 + time) * 30;
             nextYPos += Math.cos(zPos * 0.02 + time) * 30;
             
             const nDx = nextXPos - gridMouseX;
             const nMouseDist = Math.sqrt(nDx*nDx + dz*dz);
             if (nMouseDist < 250) {
               nextYPos -= (250 - nMouseDist) * 0.3;
             }

             const nextScreenX = width / 2 + (nextXPos - cameraX) * scale;
             const nextScreenY = height / 2 + (nextYPos + 200) * scale;
             
             ctx.beginPath();
             ctx.moveTo(screenX, screenY);
             ctx.lineTo(nextScreenX, nextScreenY);
             ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.15})`;
             ctx.lineWidth = Math.max(0.2, 1 * scale);
             ctx.stroke();
          }

          // Connect downwards
          if (z < rows - 1) {
             const nextZPos = ((z + 1) * spacing) - gridHeight / 2;
             const nextDist = Math.sqrt(xPos*xPos + nextZPos*nextZPos);
             let nextYPos = Math.sin(nextDist * 0.005 - time * 2) * 40;
             nextYPos += Math.sin(xPos * 0.02 + time) * 30;
             nextYPos += Math.cos(nextZPos * 0.02 + time) * 30;
             
             const nDz = nextZPos - gridMouseZ;
             const nMouseDist = Math.sqrt(dx*dx + nDz*nDz);
             if (nMouseDist < 250) {
               nextYPos -= (250 - nMouseDist) * 0.3;
             }

             const nextZTransformed = nextZPos + 600;
             const nextScale = fov / nextZTransformed;
             const nextScreenX = width / 2 + (xPos - cameraX) * nextScale;
             const nextScreenY = height / 2 + (nextYPos + 200) * nextScale;
             
             ctx.beginPath();
             ctx.moveTo(screenX, screenY);
             ctx.lineTo(nextScreenX, nextScreenY);
             ctx.strokeStyle = `rgba(13, 190, 214, ${opacity * 0.15})`;
             ctx.lineWidth = Math.max(0.2, 1 * scale);
             ctx.stroke();
          }
        }
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalizing mouse to center = 0,0
    targetMouseRef.current = {
      x: (e.clientX - rect.left) - rect.width / 2,
      y: (e.clientY - rect.top) - rect.height / 2,
    };
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A1B]"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#0A0A1B_90%)] pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-60 transition-opacity duration-1000"
      />
    </div>
  );
}
