"use client";

import { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Database, Tag, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const services = [
    {
      id: 'collection',
      title: 'Data Collection',
      icon: Database,
      items: [
        { name: 'Image Collection', href: '/services/data-collection/image-collection' },
        { name: 'Video Collection', href: '/services/data-collection/video-collection' },
        { name: 'Audio Collection', href: '/services/data-collection/audio-collection' },
        { name: 'Text Collection', href: '/services/data-collection/text-collection' },
        { name: 'Sensor Collection', href: '/services/data-collection/sensor-collection' },
        { name: 'Medical Data', href: '/services/data-collection/medical-data' },
        { name: 'Satellite Data', href: '/services/data-collection/satellite-data' },
        { name: 'Web Data', href: '/services/data-collection/web-data' },
        { name: 'Synthetic Data', href: '/services/data-collection/synthetic-data' },
      ]
    },
    {
      id: 'labeling',
      title: 'Data Labeling',
      icon: Tag,
      items: [
        { name: 'Image Annotation', href: '/services/data-labeling/image-annotation' },
        { name: 'Text Annotation', href: '/services/data-labeling/text-annotation' },
        { name: '3D Point Cloud', href: '/services/data-labeling/3d-point-cloud' },
        { name: 'Audio Annotation', href: '/services/data-labeling/audio-annotation' },
        { name: 'Video Annotation', href: '/services/data-labeling/video-annotation' },
        { name: 'Annotation Teams', href: '/services/data-labeling/annotation-teams' },
      ]
    },
    {
      id: 'processing',
      title: 'Data Processing',
      icon: Settings,
      items: [
        { name: 'Data Cleaning', href: '/services/data-processing/data-cleaning' },
        { name: 'Dataset Validation', href: '/services/data-processing/dataset-validation' },
        { name: 'Normalization', href: '/services/data-processing/normalization' },
        { name: 'Formatting', href: '/services/data-processing/formatting' },
        { name: 'Enrichment', href: '/services/data-processing/enrichment' },
        { name: 'AI Dataset Optimization', href: '/services/data-processing/ai-dataset-optimization' },
        { name: 'Quality Monitoring', href: '/services/data-processing/quality-monitoring' },
      ]
    }
  ];

  const mainLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 flex flex-col bg-[#0a0a1b] lg:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" onClick={onClose} className="inline-flex items-center gap-3">
              <NextImage 
                src="/images/logo-full.png" 
                alt="Loopernode Logo" 
                width={150} 
                height={40} 
                priority 
                className="h-[28px] w-auto sm:h-[36px] object-contain" 
              />
              <div className="flex flex-col justify-center text-left hidden sm:flex">
                <span className="font-gabarito font-medium text-[7px] sm:text-[8px] text-slate-400 tracking-[0.15em] leading-tight mt-1 whitespace-nowrap">
                  Innovate. Illuminate. Inspire.
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-full"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Content */}
          <div className="flex-1 overflow-y-auto py-6 px-6 space-y-2">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="block py-4 text-lg font-medium text-white border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}

            {/* Services Accordion */}
            <div className="py-4 border-b border-white/5">
              <div className="text-lg font-medium text-white mb-4">Services</div>
              <div className="space-y-4 pl-4 border-l border-white/10">
                {services.map((service) => (
                  <div key={service.id} className="space-y-2">
                    <button
                      onClick={() => toggleSection(service.id)}
                      className="flex items-center justify-between w-full text-left text-slate-300 py-2 font-medium"
                    >
                      <div className="flex items-center gap-3">
                        <service.icon className="w-5 h-5 text-indigo-400" />
                        {service.title}
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSection === service.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedSection === service.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col space-y-3 py-2 pl-8">
                            {service.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className="text-slate-400 hover:text-indigo-400 text-sm py-2.5 transition-colors block"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                {/* Additional Services */}
                <div className="pt-2 mt-2 border-t border-white/5 space-y-3">
                  <Link href="/services/data-collection/data-engineering" onClick={onClose} className="text-slate-400 hover:text-indigo-400 text-sm block">Data Engineering</Link>
                  <Link href="/services/data-collection/data-curation" onClick={onClose} className="text-slate-400 hover:text-indigo-400 text-sm block">Data Curation</Link>
                  <Link href="/services/data-collection/data-anonymization" onClick={onClose} className="text-slate-400 hover:text-indigo-400 text-sm block">Data Anonymization</Link>
                  <Link href="/services/data-collection/ai-consultancy" onClick={onClose} className="text-slate-400 hover:text-indigo-400 text-sm block">AI Consultancy</Link>
                  <Link href="/services/data-collection/quality-assurance" onClick={onClose} className="text-slate-400 hover:text-indigo-400 text-sm block">Quality Assurance</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-white/10 bg-[#0a0a1b]">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center w-full py-4 px-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
