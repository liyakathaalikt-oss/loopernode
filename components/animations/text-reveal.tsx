'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  // Split text into words, keeping spaces intact as separate elements
  const words = text.split(/(\s+)/);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
    },
  };

  return (
    <motion.div
      className={cn('flex flex-wrap overflow-hidden', className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => {
        if (word.match(/\s+/)) {
          return <span key={index} className="inline-block whitespace-pre">{word}</span>;
        }
        return (
          <motion.span
            variants={child}
            key={index}
            className="inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
