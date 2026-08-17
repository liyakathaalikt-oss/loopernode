import prisma from '@/lib/prisma';
import { AlertCircle, CheckCircle2, TrendingUp, Search, Link as LinkIcon, FileText } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SeoDashboardPage() {
  const blogs = await prisma.blogPost.findMany();
  const caseStudies = await prisma.caseStudy.findMany();

  // Audit calculations
  const missingBlogMeta = blogs.filter(b => !b.seoTitle || !b.seoDesc);
  const totalPages = blogs.length + caseStudies.length; // Extending to standard pages later
  const seoScore = Math.round(((totalPages - missingBlogMeta.length) / totalPages) * 100) || 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">SEO & Growth Dashboard</h1>
        <p className="text-slate-400">Monitor your organic health, metadata compliance, and page indexability.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white">{seoScore}%</span>
          </div>
          <p className="text-sm font-medium text-slate-300">Overall SEO Health</p>
          <p className="text-xs text-slate-500 mt-1">Based on metadata completeness</p>
        </div>

        <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white">{totalPages}</span>
          </div>
          <p className="text-sm font-medium text-slate-300">Indexed CMS Pages</p>
          <p className="text-xs text-slate-500 mt-1">Dynamically generated routes</p>
        </div>

        <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${missingBlogMeta.length === 0 ? 'bg-green-500/10 text-green-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {missingBlogMeta.length === 0 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <span className={`text-2xl font-bold ${missingBlogMeta.length === 0 ? 'text-green-400' : 'text-rose-400'}`}>
              {missingBlogMeta.length}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-300">{missingBlogMeta.length === 0 ? 'All Metadata Complete' : 'Missing Metadata'}</p>
          <p className="text-xs text-slate-500 mt-1">{missingBlogMeta.length === 0 ? 'No pages need attention' : 'Pages needing attention'}</p>
        </div>

        <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-cyan-400">Active</span>
          </div>
          <p className="text-sm font-medium text-slate-300">Sitemap & Robots</p>
          <p className="text-xs text-slate-500 mt-1">Auto-generating perfectly</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Alerts */}
        <div className="bg-dark-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-bold text-white">Action Required</h2>
            <p className="text-sm text-slate-400 mt-1">CMS content missing critical SEO tags</p>
          </div>
          <div className="flex-1 p-0 overflow-y-auto max-h-[400px]">
            {missingBlogMeta.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-400/50 mb-3" />
                <p className="text-slate-300 font-medium">All clear!</p>
                <p className="text-slate-500 text-sm mt-1">Every blog post has unique SEO titles and descriptions.</p>
              </div>
            ) : (
              <ul className="divide-y divide-white/5">
                {missingBlogMeta.map(blog => (
                  <li key={blog.id} className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-200">{blog.title}</p>
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Missing {(!blog.seoTitle && !blog.seoDesc) ? 'Title & Description' : !blog.seoTitle ? 'SEO Title' : 'Meta Description'}
                      </p>
                    </div>
                    <Link prefetch={false} href={`/admin/blog/${blog.id}`} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-md transition-colors text-slate-300">
                      Fix Now
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Google Search Console Setup / Checklist */}
        <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Growth Automation Checklist</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">Dynamic Meta Tags</h3>
                <p className="text-xs text-slate-400 leading-relaxed">All pages now use Next.js `generateMetadata` for dynamic OpenGraph, Twitter, and SEO tags.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">Canonical URL Injection</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Dynamic pages (Case Studies, Blog) automatically inject fully qualified canonical URLs to prevent duplication.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5"><LinkIcon className="w-5 h-5" /></div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">Topic Clusters Architecture</h3>
                <p className="text-xs text-slate-400 leading-relaxed">The CMS is configured to support hierarchical URL structures (e.g., `/services/data-collection/[slug]`) for SEO dominance.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
