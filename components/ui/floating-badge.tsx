'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface FloatingBadgeProps {
  value: string;
  label: string;
  className?: string;
  delay?: number;
}

export function FloatingBadge({ value, label, className, delay = 0 }: FloatingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: delay + 0.5 
      }}
      className={cn("inline-block", className)}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 2, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-default backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] text-center min-w-[120px] transition-shadow duration-300"
        >
          <div className="text-2xl md:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#06B6D4]">
            {value}
          </div>
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">
            {label}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
