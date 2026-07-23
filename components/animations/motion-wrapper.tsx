'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const viewportOptions = { once: true, margin: '-50px' };

export const FadeUp: React.FC<MotionProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={viewportOptions}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeIn: React.FC<MotionProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={viewportOptions}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn: React.FC<MotionProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={viewportOptions}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideInLeft: React.FC<MotionProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ x: -40, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={viewportOptions}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideInRight: React.FC<MotionProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ x: 40, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={viewportOptions}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={viewportOptions}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: 0.1,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
