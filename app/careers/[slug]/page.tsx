import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { jobs } from '@/content/jobs';
import { generatePageMetadata } from '@/lib/metadata';
import { Briefcase, MapPin, Clock, Calendar, CheckCircle, Code, ArrowRight, Building, Award, Star, Users, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { CareersForm } from '@/components/sections/careers-form';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return {};

  return generatePageMetadata({
    title: `${job.title} | Careers at Loopernode`,
    description: job.description,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }
  
  // Get 3 related jobs from same department, excluding current
  const relatedJobs = jobs
    .filter(j => j.slug !== job.slug && (j.department === job.department || j.type === job.type))
    .slice(0, 3);
    
  if (relatedJobs.length < 3) {
    const moreJobs = jobs.filter(j => j.slug !== job.slug && !relatedJobs.includes(j)).slice(0, 3 - relatedJobs.length);
    relatedJobs.push(...moreJobs);
  }

  // Schema generation for Google Jobs
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.postedDate,
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
        addressLocality: 'Remote',
        addressRegion: 'Global',
        addressCountry: 'US'
      }
    }
  };

  const hiringProcess = [
    { title: 'Application Submitted', desc: 'Our team reviews your resume and cover letter.', icon: <CheckCircle /> },
    { title: 'Resume Review', desc: 'We assess your skills against the role requirements.', icon: <Users /> },
    { title: 'HR Interview', desc: 'A 30-minute chat to discuss your background and culture fit.', icon: <Clock /> },
    { title: 'Technical Assessment', desc: 'A practical test or technical interview with the hiring manager.', icon: <Code /> },
    { title: 'Final Interview', desc: 'Meet with leadership or founders.', icon: <Award /> },
    { title: 'Offer Letter', desc: 'Welcome to the Loopernode team!', icon: <Star /> }
  ];

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
          <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/careers" className="hover:text-indigo-400 transition-colors">Careers</Link>
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
                  <Award className="w-4 h-4 text-slate-500" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="md:w-64 flex-shrink-0">
              <Link href="#application-form" className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Two Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Section 2: Job Overview */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-sm">1</span>
                Role Overview
              </h2>
              <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-slate-300 leading-relaxed text-lg">
                  {job.overview}
                </p>
              </div>
            </section>

            {/* Section 3: Key Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-sm">2</span>
                Key Responsibilities
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.responsibilities.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-sm bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4: Required Qualifications */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">3</span>
                Required Qualifications
              </h2>
              <ul className="space-y-4">
                {job.qualifications.map((qual, idx) => {
                  const parts = qual.split(':');
                  const label = parts.length > 1 ? parts[0] : null;
                  const text = parts.length > 1 ? parts.slice(1).join(':') : qual;
                  
                  return (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-sm bg-white/[0.02] border border-white/[0.05]">
                      <div className="w-2 h-2 rounded-full bg-violet-400 mt-2.5 flex-shrink-0" />
                      <span className="text-slate-300">
                        {label && <strong className="text-white mr-2">{label}:</strong>}
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
            
            {/* Section 5: Preferred Skills */}
            {job.preferredSkills && job.preferredSkills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-sm">4</span>
                  Preferred Skills
                </h2>
                <ul className="space-y-4">
                  {job.preferredSkills.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <Star className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Section 8: Hiring Process */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center text-sm">5</span>
                Hiring Process
              </h2>
              
              <div className="relative border-l-2 border-white/10 ml-4 md:ml-6 space-y-8">
                {hiringProcess.map((step, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-12">
                    <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-black border-2 border-indigo-500 flex items-center justify-center text-indigo-400">
                      <div className="w-4 h-4">
                        {step.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-slate-400 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Section 6: Technologies */}
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" /> Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <span key={tech} className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 flex items-center gap-2">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 7: Benefits */}
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" /> Perks & Benefits
              </h3>
              <ul className="space-y-4">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 9: About Loopernode */}
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20">
              <Building className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">About Loopernode</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Loopernode is a premier AI Data Services provider. We empower machine learning teams globally with pristine AI data collection, annotation, and processing solutions, accelerating the deployment of autonomous systems and GenAI models.
              </p>
              <Link href="/about" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold inline-flex items-center gap-1">
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
                <Link href={`/careers/${rJob.slug}`} className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 mt-4 pt-4 border-t border-white/5 w-full justify-between">
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
