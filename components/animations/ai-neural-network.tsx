"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  pulsePhase: number;
  layerIndex: number;
}

interface Packet {
  sourceNode: Node;
  targetNode: Node;
  progress: number;
  speed: number;
  color: string;
}

export function AiNeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(true);
  
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

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
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let layers: Node[][] = [];

    const colors = ['#0DBED6', '#06B6D4', '#8B5CF6', '#6366F1'];

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

    const init = () => {
      resize();
      nodes = [];
      packets = [];
      layers = [];
      
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      const isMobile = width < 768;
      const layerCounts = isMobile ? [4, 6, 6, 3] : [5, 8, 8, 4];
      const layerSpacing = width / (layerCounts.length + 1);

      for (let i = 0; i < layerCounts.length; i++) {
        const count = layerCounts[i];
        const currentLayer: Node[] = [];
        const x = layerSpacing * (i + 1);
        const ySpacing = height / (count + 1);

        for (let j = 0; j < count; j++) {
          const y = ySpacing * (j + 1);
          const jitterX = (Math.random() - 0.5) * 40;
          const jitterY = (Math.random() - 0.5) * 40;
          
          const node = {
            x: x + jitterX,
            y: y + jitterY,
            baseX: x + jitterX,
            baseY: y + jitterY,
            radius: Math.random() * 2 + 2,
            pulsePhase: Math.random() * Math.PI * 2,
            layerIndex: i
          };
          currentLayer.push(node);
          nodes.push(node);
        }
        layers.push(currentLayer);
      }
    };

    const spawnPacket = () => {
      if (layers.length < 2) return;
      const sourceLayerIndex = Math.floor(Math.random() * (layers.length - 1));
      const sourceLayer = layers[sourceLayerIndex];
      const targetLayer = layers[sourceLayerIndex + 1];
      
      if (!sourceLayer || !targetLayer || sourceLayer.length === 0 || targetLayer.length === 0) return;

      const sourceNode = sourceLayer[Math.floor(Math.random() * sourceLayer.length)];
      const targetNode = targetLayer[Math.floor(Math.random() * targetLayer.length)];

      packets.push({
        sourceNode,
        targetNode,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    const draw = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      ctx.fillStyle = '#0A0A1B';
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/1.2);
      gradient.addColorStop(0, 'rgba(11, 15, 45, 0.8)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (isHoveringRef.current) {
        currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.05;
        currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.05;
      } else {
        currentMouseRef.current.x += (0 - currentMouseRef.current.x) * 0.02;
        currentMouseRef.current.y += (0 - currentMouseRef.current.y) * 0.02;
      }

      // Increase parallax depth
      const mouseOffsetX = currentMouseRef.current.x * 0.25;
      const mouseOffsetY = currentMouseRef.current.y * 0.25;

      ctx.lineWidth = 1;
      for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];
        
        for (const node1 of currentLayer) {
          for (const node2 of nextLayer) {
            const dx1 = node1.baseX - (width/2 + currentMouseRef.current.x);
            const dy1 = node1.baseY - (height/2 + currentMouseRef.current.y);
            const dist1 = Math.sqrt(dx1*dx1 + dy1*dy1);
            
            // Stronger repulsion for lines
            const lineRepulseForce = dist1 < 250 ? (250 - dist1) / 250 * 35 : 0;
            const p1X = node1.baseX + (dist1 > 0 ? (dx1/dist1)*lineRepulseForce : 0) - mouseOffsetX;
            const p1Y = node1.baseY + (dist1 > 0 ? (dy1/dist1)*lineRepulseForce : 0) - mouseOffsetY;
            
            const p2X = node2.baseX - mouseOffsetX;
            const p2Y = node2.baseY - mouseOffsetY;

            if (Math.abs(node1.y - node2.y) < height * 0.4 || Math.random() > 0.8) {
              ctx.beginPath();
              ctx.moveTo(p1X, p1Y);
              ctx.lineTo(p2X, p2Y);
              
              const lineGradient = ctx.createLinearGradient(p1X, p1Y, p2X, p2Y);
              lineGradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
              lineGradient.addColorStop(1, 'rgba(6, 182, 212, 0.15)');
              
              ctx.strokeStyle = lineGradient;
              ctx.stroke();
            }
          }
        }
      }

      if (Math.random() < 0.2) spawnPacket();

      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i];
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const p1X = packet.sourceNode.baseX - mouseOffsetX;
        const p1Y = packet.sourceNode.baseY - mouseOffsetY;
        const p2X = packet.targetNode.baseX - mouseOffsetX;
        const p2Y = packet.targetNode.baseY - mouseOffsetY;

        const currX = p1X + (p2X - p1X) * packet.progress;
        const currY = p1Y + (p2Y - p1Y) * packet.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = packet.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        ctx.moveTo(currX, currY);
        ctx.lineTo(
          p1X + (p2X - p1X) * Math.max(0, packet.progress - 0.1),
          p1Y + (p2Y - p1Y) * Math.max(0, packet.progress - 0.1)
        );
        ctx.strokeStyle = packet.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (const node of nodes) {
        node.pulsePhase += 0.05;
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        
        const dx = node.baseX - (width/2 + currentMouseRef.current.x);
        const dy = node.baseY - (height/2 + currentMouseRef.current.y);
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Stronger repulsion for nodes
        const repulseForce = dist < 250 ? (250 - dist) / 250 * 35 : 0;
        const repulseX = dist > 0 ? (dx / dist) * repulseForce : 0;
        const repulseY = dist > 0 ? (dy / dist) * repulseForce : 0;

        // Apply depth based on layer for a 3D effect!
        // Closer layers move more with parallax
        const depthMultiplier = 1 + (node.layerIndex * 0.15);
        const drawX = node.baseX + repulseX - (mouseOffsetX * depthMultiplier);
        const drawY = node.baseY + repulseY - (mouseOffsetY * depthMultiplier);

        ctx.beginPath();
        ctx.arc(drawX, drawY, node.radius + pulse * 1.5, 0, Math.PI * 2);
        
        if (node.layerIndex === 0) ctx.fillStyle = `rgba(13, 190, 214, ${0.4 + pulse * 0.6})`;
        else if (node.layerIndex === layers.length - 1) ctx.fillStyle = `rgba(139, 92, 246, ${0.4 + pulse * 0.6})`;
        else ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + pulse * 0.3})`;
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
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
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#0A0A1B_95%)] pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-60 transition-opacity duration-1000"
      />
    </div>
  );
}
