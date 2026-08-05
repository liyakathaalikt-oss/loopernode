import Link from 'next/link';
import NextImage from 'next/image';
import { Globe, Mail, MessageCircle, Rss, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a1b] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Newsletter Section */}
        <div className="mb-16 p-8 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-white mb-2">Subscribe to our newsletter</h3>
            <p className="text-slate-400">Get the latest insights on AI data services, industry trends, and company updates delivered to your inbox.</p>
          </div>
          <form className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[250px]"
              required
            />
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* 4-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link prefetch={false} href="/" className="inline-flex items-center gap-3">
              <NextImage 
                src="/images/logo-full.png" 
                alt="Loopernode Logo" 
                width={500} 
                height={169} 
                priority 
                className="h-[72px] w-auto sm:h-[96px] object-contain" 
              />
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Global leader in AI data services, providing high-quality datasets, precise annotation, and comprehensive data processing for enterprise AI models.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="YouTube">
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link prefetch={false} href="/services/data-collection" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Data Collection</Link></li>
              <li><Link prefetch={false} href="/services/data-labeling" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Data Labeling</Link></li>
              <li><Link prefetch={false} href="/services/data-processing" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Data Processing</Link></li>
              <li><Link prefetch={false} href="/services/data-collection/ai-consultancy" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">AI Consultancy</Link></li>
              <li><Link prefetch={false} href="/services/data-collection/quality-assurance" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Quality Assurance</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link prefetch={false} href="/about" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">About Us</Link></li>
              <li><Link prefetch={false} href="/blog" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Blog</Link></li>
              <li><Link prefetch={false} href="/careers" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Careers</Link></li>
              <li><Link prefetch={false} href="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Contact</Link></li>
              <li><Link prefetch={false} href="/partners" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Partners</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link prefetch={false} href="/docs" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Documentation</Link></li>
              <li><Link prefetch={false} href="/case-studies" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Case Studies</Link></li>
              <li><Link prefetch={false} href="/api-reference" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">API Reference</Link></li>
              <li><Link prefetch={false} href="/security" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Security</Link></li>
              <li><Link prefetch={false} href="/privacy" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Loopernode, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link prefetch={false} href="/terms" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link prefetch={false} href="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link prefetch={false} href="/cookie" className="text-slate-500 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
