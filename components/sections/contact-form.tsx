'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  serviceRequired: z.string().min(1, 'Please select a service'),
  estimatedVolume: z.string().optional(),
  timeline: z.string().optional(),
  projectDesc: z.string().min(10, 'Message must be at least 10 characters'),
  source: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm({ className, onSuccess }: { className?: string; onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      setIsSuccess(true);
      reset();

      if (onSuccess) {
        // Give a slight delay before triggering the callback so the user can see the success state
        setTimeout(() => {
          onSuccess();
          // Reset the internal success state after the modal closes
          setTimeout(() => setIsSuccess(false), 500); 
        }, 3000);
      } else {
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] p-8 md:p-10 rounded-3xl", className)}>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
            <p className="text-slate-400">
              Your submission has been received successfully. Our team will contact you soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-300">Full Name *</label>
                <input
                  id="name"
                  {...register('name')}
                  className={cn(
                    "w-full bg-[#111128] border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all",
                    errors.name ? "border-red-500/50 focus:ring-red-500/50" : "border-white/10 focus:border-[#6366F1] focus:ring-[#6366F1]/50"
                  )}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={cn(
                    "w-full bg-[#111128] border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all",
                    errors.email ? "border-red-500/50 focus:ring-red-500/50" : "border-white/10 focus:border-[#6366F1] focus:ring-[#6366F1]/50"
                  )}
                  placeholder="john@company.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-slate-300">Company (Optional)</label>
                <input
                  id="company"
                  {...register('company')}
                  className="w-full bg-[#111128] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/50 transition-all"
                  placeholder="Company Inc."
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-slate-300">Phone (Optional)</label>
                <input
                  id="phone"
                  {...register('phone')}
                  className="w-full bg-[#111128] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/50 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium text-slate-300">Country (Optional)</label>
                <input
                  id="country"
                  {...register('country')}
                  className="w-full bg-[#111128] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/50 transition-all"
                  placeholder="United States"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service */}
              <div className="space-y-2">
                <label htmlFor="serviceRequired" className="text-sm font-medium text-slate-300">Service of Interest *</label>
                <select
                  id="serviceRequired"
                  {...register('serviceRequired')}
                  className={cn(
                    "w-full bg-[#111128] border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all appearance-none",
                    errors.serviceRequired ? "border-red-500/50 focus:ring-red-500/50" : "border-white/10 focus:border-[#6366F1] focus:ring-[#6366F1]/50"
                  )}
                >
                  <option value="">Select a service...</option>
                  <option value="Data Collection">Data Collection</option>
                  <option value="Data Labeling">Data Labeling</option>
                  <option value="Data Processing">Data Processing</option>
                  <option value="AI Consultancy">AI Consultancy</option>
                  <option value="Other">Other</option>
                </select>
                {errors.serviceRequired && <p className="text-red-400 text-xs mt-1">{errors.serviceRequired.message}</p>}
              </div>

              {/* Estimated Volume */}
              <div className="space-y-2">
                <label htmlFor="estimatedVolume" className="text-sm font-medium text-slate-300">Estimated Volume (Optional)</label>
                <select
                  id="estimatedVolume"
                  {...register('estimatedVolume')}
                  className="w-full bg-[#111128] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/50 transition-all appearance-none"
                >
                  <option value="">Select volume...</option>
                  <option value="< 10K units">Under 10K units</option>
                  <option value="10K - 100K units">10K - 100K units</option>
                  <option value="100K - 1M units">100K - 1M units</option>
                  <option value="1M+ units">1M+ units</option>
                  <option value="Not Sure">Not sure yet</option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <label htmlFor="timeline" className="text-sm font-medium text-slate-300">Project Timeline (Optional)</label>
              <select
                id="timeline"
                {...register('timeline')}
                className="w-full bg-[#111128] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/50 transition-all appearance-none"
              >
                <option value="">Select timeline...</option>
                <option value="Immediately">Immediately (ASAP)</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="1 - 3 months">1 - 3 months</option>
                <option value="Planning phase">Just planning</option>
              </select>
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <label htmlFor="projectDesc" className="text-sm font-medium text-slate-300">Project Description *</label>
              <textarea
                id="projectDesc"
                {...register('projectDesc')}
                rows={4}
                className={cn(
                  "w-full bg-[#111128] border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all resize-none",
                  errors.projectDesc ? "border-red-500/50 focus:ring-red-500/50" : "border-white/10 focus:border-[#6366F1] focus:ring-[#6366F1]/50"
                )}
                placeholder="Tell us about your project requirements, goals, and any specific constraints..."
              />
              {errors.projectDesc && <p className="text-red-400 text-xs mt-1">{errors.projectDesc.message}</p>}
            </div>

            {/* Honeypot – hidden from users, catches bots */}
            <input
              type="text"
              {...register('honeypot' as never)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Error message */}
            {errorMessage && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
