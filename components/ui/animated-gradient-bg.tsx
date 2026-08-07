'use client';

import React from 'react';

export function AnimatedGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 hidden md:block">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.2)_0%,_transparent_70%)] blur-3xl mix-blend-screen animate-[hero-blob-1_20s_linear_infinite] will-change-transform" />
      
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)] blur-3xl mix-blend-screen animate-[hero-blob-2_25s_linear_infinite] will-change-transform" />

      <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)] blur-3xl mix-blend-screen animate-[hero-blob-3_30s_linear_infinite] will-change-transform" />
    </div>
  );
}
