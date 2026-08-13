'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface TestimonialCardProps {
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialCard({ testimonials, className }: TestimonialCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-8", className)}>
      <Quote className="absolute top-6 left-6 md:top-8 md:left-8 w-24 h-24 text-white/5 -z-10 rotate-180" />
      
      <div className="relative min-h-[250px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < testimonials[currentIndex].rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-slate-600"
                  )}
                />
              ))}
            </div>

            <p className="text-lg md:text-2xl text-slate-200 font-medium leading-relaxed mb-8">
              &quot;{testimonials[currentIndex].quote}&quot;
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#06B6D4] flex items-center justify-center text-white font-bold text-lg">
                {testimonials[currentIndex].author.charAt(0)}
              </div>
              <div>
                <p className="text-slate-100 font-semibold">{testimonials[currentIndex].author}</p>
                <p className="text-sm text-slate-400">
                  {testimonials[currentIndex].role} at <span className="text-[#8B5CF6]">{testimonials[currentIndex].company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {testimonials.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                idx === currentIndex ? "bg-[#6366F1] w-6" : "bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
