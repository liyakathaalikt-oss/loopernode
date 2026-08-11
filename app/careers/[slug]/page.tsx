import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PrismaClient } from '@prisma/client';
import { generatePageMetadata } from '@/lib/metadata';
import { Briefcase, MapPin, Clock, Calendar, ArrowRight, Building, Award } from 'lucide-react';
import Link from 'next/link';
import { CareersForm } from '@/components/sections/careers-form';

import prisma from '@/lib/prisma';
interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.jobPosting.findUnique({ where: { slug } });
  
  if (!job) return {};

  return generatePageMetadata({
    title: `${job.title} | Careers at Loopernode`,
    description: `Join us as a ${job.title} in the ${job.department} department.`,
    path: `/careers/${job.slug}`,
  });
}


export const dynamic = "force-dynamic";

export default async function JobDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await prisma.jobPosting.findUnique({ where: { slug } });

  if (!job || job.status !== 'OPEN') {
    notFound();
  }
  
  // Get 3 related jobs from same department, excluding current
  const relatedJobs = await prisma.jobPosting.findMany({
    where: { 
      slug: { not: slug },
      status: 'OPEN',
      department: job.department
    },
    take: 3
  });

  // Schema generation for Google Jobs
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.createdAt.toISOString(),
    validThrough: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
    employmentType: job.type === 'Full-time' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Loopernode',
      sameAs: 'https://loopernode.com',
      logo: 'https://loopernode.com/icon.png'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressRegion: 'Global',
        addressCountry: 'US'
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200 pt-28">
      {/* JSON-LD Schema for Google Jobs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 pb-20">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-slate-400 mb-8 gap-2">
          <Link prefetch={false} href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <span>/</span>
          <Link prefetch={false} href="/careers" className="hover:text-indigo-400 transition-colors">Careers</Link>
          <span>/</span>
          <span className="text-slate-200">{job.title}</span>
        </div>

        {/* Section 1: Hero Section */}
        <div className="relative p-10 md:p-16 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] mb-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" />
                  {job.department}
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {job.type}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="md:w-64 flex-shrink-0">
              <Link prefetch={false} href="#application-form" className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Two Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Dynamic Rich Text Job Description */}
            <section className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.05]">
              <div 
                className="prose prose-invert prose-lg prose-headings:text-white prose-a:text-indigo-400 max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </section>
            
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Section 9: About Loopernode */}
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20">
              <Building className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">About Loopernode</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Loopernode is a premier AI Data Services provider. We empower machine learning teams globally with pristine AI data collection, annotation, and processing solutions.
              </p>
              <Link prefetch={false} href="/about" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold inline-flex items-center gap-1">
                Learn more about us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
          </div>
        </div>

        {/* Section 10: Application Form */}
        <section id="application-form" className="mb-24 scroll-mt-32">
          <CareersForm defaultPosition={job.title} />
        </section>
        
        {/* Related Jobs */}
        {relatedJobs.length > 0 && (
          <section className="pt-16 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-10 text-center">Similar Open Roles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedJobs.map((rJob) => (
                <div key={rJob.slug} className="p-6 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-white/5 text-slate-300 mb-4">
                      {rJob.department}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">{rJob.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                      <MapPin className="w-3 h-3" /> {rJob.location}
                    </div>
                  </div>
                  <Link prefetch={false} href={`/careers/${rJob.slug}`} className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 mt-4 pt-4 border-t border-white/5 w-full justify-between">
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
