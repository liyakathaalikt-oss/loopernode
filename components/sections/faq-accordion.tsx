'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  faqs: FAQ[];
  generateSchema?: boolean;
  className?: string;
}

export function FAQAccordion({ faqs, generateSchema = true, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(index);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
      {generateSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.05]"
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggle(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-full flex items-center justify-between p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-medium text-slate-100 pr-8">{faq.question}</h3>
            <div className="shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#6366F1]">
              {openIndex === index ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="p-6 pt-0 text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
