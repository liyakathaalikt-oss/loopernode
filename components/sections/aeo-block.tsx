import React from 'react';
import { FadeUp } from '@/components/animations/motion-wrapper';

interface AEOBlockProps {
  question: string;
  answer: string;
}

/**
 * Answer Engine Optimization (AEO) Block
 * Specifically designed to feed concise, authoritative 40-70 word answers 
 * to AI scraping bots (ChatGPT, Perplexity, Google AI Overviews).
 */
export function AEOBlock({ question, answer }: AEOBlockProps) {
  return (
    <FadeUp>
      <section 
        className="my-8 p-6 md:p-8 rounded-2xl bg-indigo-900/20 border border-indigo-500/20 shadow-inner"
        aria-labelledby="aeo-question"
      >
        <h2 id="aeo-question" className="text-xl md:text-2xl font-bold text-white mb-4">
          {question}
        </h2>
        <p className="text-slate-300 leading-relaxed font-medium text-lg">
          {answer}
        </p>
      </section>
    </FadeUp>
  );
}
