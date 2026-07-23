"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown, ChevronRight, Database, Tag, Settings, Brain, Image, Video, Mic, FileText, Activity, Stethoscope, Satellite, Globe, Cpu, Scissors, CheckCircle, Sliders, Layers, Sparkles, BarChart, HardHat, FileSearch, ShieldOff, Lightbulb, ShieldCheck, Box, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileNav } from './mobile-nav';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setIsMobileNavOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out border-b border-transparent",
          isScrolled 
            ? "backdrop-blur-xl bg-[#0a0a1b]/80 border-white/10 py-4" 
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 z-50">
              <span className="text-2xl font-bold tracking-tight text-white">
                Looper<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">node</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                Home
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              
              <Link href="/about" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                About
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>

              {/* Services Mega Menu Toggle */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('services')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Services <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {activeMenu === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[900px] rounded-2xl backdrop-blur-xl bg-[#111128]/95 border border-white/10 shadow-2xl overflow-hidden p-8"
                    >
                      <div className="grid grid-cols-3 gap-8">
                        {/* Data Collection */}
                        <div>
                          <div className="flex items-center gap-2 mb-4 text-indigo-400 font-semibold border-b border-white/5 pb-2">
                            <Database className="w-5 h-5" /> Data Collection
                          </div>
                          <ul className="space-y-3">
                            {[
                              { name: 'Image Collection', href: '/services/data-collection/image-collection', icon: Image },
                              { name: 'Video Collection', href: '/services/data-collection/video-collection', icon: Video },
                              { name: 'Audio Collection', href: '/services/data-collection/audio-collection', icon: Mic },
                              { name: 'Text Collection', href: '/services/data-collection/text-collection', icon: FileText },
                              { name: 'Sensor Collection', href: '/services/data-collection/sensor-collection', icon: Activity },
                              { name: 'Medical Data', href: '/services/data-collection/medical-data', icon: Stethoscope },
                              { name: 'Satellite Data', href: '/services/data-collection/satellite-data', icon: Satellite },
                              { name: 'Web Data', href: '/services/data-collection/web-data', icon: Globe },
                              { name: 'Synthetic Data', href: '/services/data-collection/synthetic-data', icon: Cpu },
                            ].map((item) => (
                              <li key={item.name}>
                                <Link href={item.href} className="flex items-center gap-3 text-slate-400 hover:text-white text-sm group">
                                  <item.icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                  <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Data Labeling */}
                        <div>
                          <div className="flex items-center gap-2 mb-4 text-violet-400 font-semibold border-b border-white/5 pb-2">
                            <Tag className="w-5 h-5" /> Data Labeling
                          </div>
                          <ul className="space-y-3">
                            {[
                              { name: 'Image Annotation', href: '/services/data-labeling/image-annotation', icon: Image },
                              { name: 'Text Annotation', href: '/services/data-labeling/text-annotation', icon: FileText },
                              { name: '3D Point Cloud', href: '/services/data-labeling/3d-point-cloud', icon: Box },
                              { name: 'Audio Annotation', href: '/services/data-labeling/audio-annotation', icon: Mic },
                              { name: 'Video Annotation', href: '/services/data-labeling/video-annotation', icon: Video },
                              { name: 'Annotation Teams', href: '/services/data-labeling/annotation-teams', icon: Users },
                            ].map((item) => (
                              <li key={item.name}>
                                <Link href={item.href} className="flex items-center gap-3 text-slate-400 hover:text-white text-sm group">
                                  <item.icon className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
                                  <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Data Processing & Additional */}
                        <div>
                          <div className="flex items-center gap-2 mb-4 text-cyan-400 font-semibold border-b border-white/5 pb-2">
                            <Settings className="w-5 h-5" /> Data Processing
                          </div>
                          <ul className="space-y-3 mb-6">
                            {[
                              { name: 'Data Cleaning', href: '/services/data-processing/data-cleaning', icon: Scissors },
                              { name: 'Dataset Validation', href: '/services/data-processing/dataset-validation', icon: CheckCircle },
                              { name: 'Normalization', href: '/services/data-processing/normalization', icon: Sliders },
                              { name: 'Formatting', href: '/services/data-processing/formatting', icon: Layers },
                              { name: 'Enrichment', href: '/services/data-processing/enrichment', icon: Sparkles },
                              { name: 'AI Dataset Optimization', href: '/services/data-processing/ai-dataset-optimization', icon: Brain },
                              { name: 'Quality Monitoring', href: '/services/data-processing/quality-monitoring', icon: BarChart },
                            ].map((item) => (
                              <li key={item.name}>
                                <Link href={item.href} className="flex items-center gap-3 text-slate-400 hover:text-white text-sm group">
                                  <item.icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                  <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>

                          {/* Additional Services */}
                          <div className="pt-4 border-t border-white/5 space-y-3">
                            {[
                              { name: 'Data Engineering', href: '/services/data-collection/data-engineering', icon: HardHat },
                              { name: 'Data Curation', href: '/services/data-collection/data-curation', icon: FileSearch },
                              { name: 'Data Anonymization', href: '/services/data-collection/data-anonymization', icon: ShieldOff },
                              { name: 'AI Consultancy', href: '/services/data-collection/ai-consultancy', icon: Lightbulb },
                              { name: 'Quality Assurance', href: '/services/data-collection/quality-assurance', icon: ShieldCheck },
                            ].map((item) => (
                              <Link key={item.name} href={item.href} className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-medium group">
                                <item.icon className="w-3 h-3 text-slate-500 group-hover:text-white" />
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/blog" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                Blog
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              
              <Link href="/contact" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                Contact
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            </nav>

            {/* Desktop CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <Link 
                  href="/contact" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                >
                  Get Started
                </Link>
              </div>
              
              <button 
                className="lg:hidden p-2 text-slate-300 hover:text-white bg-white/5 rounded-md"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
}
