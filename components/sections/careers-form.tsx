"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UploadCloud, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { jobs } from '@/content/jobs';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  country: z.string().min(2, 'Country is required'),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  experience: z.string().min(1, 'Please select your experience'),
  position: z.string().min(1, 'Position is required'),
  coverLetter: z.string().min(10, 'Cover letter should be at least 10 characters'),
  resume: z.any() // Handled manually due to FileList
});

type FormData = z.infer<typeof formSchema>;

interface CareersFormProps {
  defaultPosition?: string;
}

export function CareersForm({ defaultPosition }: CareersFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      linkedin: '',
      portfolio: '',
      experience: '',
      position: defaultPosition || '',
      coverLetter: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!file) {
      setErrorMessage('Please upload your resume (PDF/DOCX).');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('resume', file);

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setStatus('success');
      reset();
      setFile(null);
    } catch (err) {
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be less than 5MB');
        setStatus('error');
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] text-center max-w-3xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Application Received!</h3>
        <p className="text-slate-300 text-lg mb-8">
          Thank you for applying to Loopernode. We have received your application and a confirmation email has been sent to your inbox. Our hiring team will review your profile shortly.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  const onError = () => {
    setErrorMessage('Please fill out all required fields correctly before submitting.');
    setStatus('error');
  };

  return (
    <div className="p-6 md:p-10 rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] max-w-4xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -z-10" />
      
      <div className="mb-10 text-center">
        <h3 className="text-3xl font-bold text-white mb-3">Submit Your Application</h3>
        <p className="text-slate-400">Join our mission to build the future of AI data infrastructure.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Full Name *</label>
            <input 
              {...register('fullName')}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="Jane Doe"
            />
            {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address *</label>
            <input 
              {...register('email')}
              type="email"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="jane@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Phone Number *</label>
            <input 
              {...register('phone')}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Country of Residence *</label>
            <input 
              {...register('country')}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="United States"
            />
            {errors.country && <p className="text-red-400 text-xs">{errors.country.message}</p>}
          </div>
        </div>

        <div className="h-px w-full bg-white/5 my-4" />

        {/* Professional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300">Position Applying For *</label>
            <select 
              {...register('position')}
              className="w-full bg-[#0d0d21] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
            >
              <option value="" disabled>Select a position</option>
              {jobs.map(job => (
                <option key={job.slug} value={job.title}>{job.title}</option>
              ))}
              <option value="Open Application">Open Application (Other)</option>
            </select>
            {errors.position && <p className="text-red-400 text-xs">{errors.position.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">LinkedIn Profile (Optional)</label>
            <input 
              {...register('linkedin')}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="https://linkedin.com/in/..."
            />
            {errors.linkedin && <p className="text-red-400 text-xs">{errors.linkedin.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Portfolio / Website (Optional)</label>
            <input 
              {...register('portfolio')}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="https://github.com/..."
            />
            {errors.portfolio && <p className="text-red-400 text-xs">{errors.portfolio.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300">Years of Experience *</label>
            <select 
              {...register('experience')}
              className="w-full bg-[#0d0d21] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
            >
              <option value="" disabled>Select experience level</option>
              <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
              <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
              <option value="Senior Level (5-8 years)">Senior Level (5-8 years)</option>
              <option value="Lead / Executive (8+ years)">Lead / Executive (8+ years)</option>
            </select>
            {errors.experience && <p className="text-red-400 text-xs">{errors.experience.message}</p>}
          </div>
        </div>

        <div className="h-px w-full bg-white/5 my-4" />

        {/* Resume & Cover Letter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Resume / CV (PDF or DOCX, max 5MB) *</label>
          <div className="relative">
            <input 
              type="file" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`w-full border-2 border-dashed ${file ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 bg-black/20 hover:border-white/20'} rounded-xl px-4 py-8 text-center transition-all`}>
              <UploadCloud className={`w-8 h-8 mx-auto mb-3 ${file ? 'text-indigo-400' : 'text-slate-500'}`} />
              {file ? (
                <div>
                  <p className="text-white font-medium mb-1">{file.name}</p>
                  <p className="text-slate-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB - Click to change file</p>
                </div>
              ) : (
                <div>
                  <p className="text-slate-300 font-medium mb-1">Click or drag file to this area to upload</p>
                  <p className="text-slate-500 text-xs">Support for a single PDF or DOCX file.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Cover Letter *</label>
          <textarea 
            {...register('coverLetter')}
            rows={5}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
            placeholder="Tell us why you are a great fit for this role and for Loopernode..."
          />
          {errors.coverLetter && <p className="text-red-400 text-xs">{errors.coverLetter.message}</p>}
        </div>

        {/* Submit Button & Error Message */}
        <div className="pt-4 space-y-4">
          {status === 'error' && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 animate-in fade-in slide-in-from-bottom-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting Application...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
