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
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm({ className }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
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
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-slate-400">
              Thank you for reaching out. Our team will get back to you within 24 hours.
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
            </div>

            {/* Service */}
            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-medium text-slate-300">Service of Interest *</label>
              <select
                id="service"
                {...register('service')}
                className={cn(
                  "w-full bg-[#111128] border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all appearance-none",
                  errors.service ? "border-red-500/50 focus:ring-red-500/50" : "border-white/10 focus:border-[#6366F1] focus:ring-[#6366F1]/50"
                )}
              >
                <option value="">Select a service...</option>
                <option value="Data Collection">Data Collection</option>
                <option value="Data Labeling">Data Labeling</option>
                <option value="Data Processing">Data Processing</option>
                <option value="AI Consultancy">AI Consultancy</option>
                <option value="Other">Other</option>
              </select>
              {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-300">Your Message *</label>
              <textarea
                id="message"
                {...register('message')}
                rows={5}
                className={cn(
                  "w-full bg-[#111128] border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all resize-none",
                  errors.message ? "border-red-500/50 focus:ring-red-500/50" : "border-white/10 focus:border-[#6366F1] focus:ring-[#6366F1]/50"
                )}
                placeholder="Tell us about your project requirements..."
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

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
