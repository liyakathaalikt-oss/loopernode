'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NewsletterProps {
  variant?: 'inline' | 'card';
  className?: string;
}

export function Newsletter({ variant = 'card', className }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Subscription failed');
    }
  };

  const containerClasses = variant === 'card' 
    ? 'p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] text-center max-w-2xl mx-auto'
    : 'w-full';

  return (
    <div className={cn(containerClasses, className)}>
      {variant === 'card' && (
        <>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100 font-heading mb-4">
            Stay ahead of the AI curve
          </h3>
          <p className="text-slate-400 mb-8">
            Get the latest insights on enterprise AI data services delivered directly to your inbox.
          </p>
        </>
      )}

      <form onSubmit={handleSubmit} className="relative max-w-md mx-auto w-full flex flex-col gap-3">
        <div className="relative flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full h-14 pl-6 pr-32 rounded-full bg-[#111128] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-all"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-full font-semibold transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span className="hidden sm:inline">Subscribe</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-400 text-sm mt-2 justify-center">
            <AlertCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}
        
        {status === 'success' && (
          <div className="flex items-center gap-2 text-green-400 text-sm mt-2 justify-center">
            <CheckCircle2 className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
