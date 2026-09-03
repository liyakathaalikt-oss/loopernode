/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Mail, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-dark-950">
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-custom relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold font-heading mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-slate-600">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-6">
            Page Not Found
          </h2>
          
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
            The page you&apos;re looking for doesn&apos;t exist, has been moved, or is temporarily unavailable. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <Link  
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-dark-950 font-semibold hover:bg-slate-200 transition-colors w-full sm:w-auto group"
            >
              <Home className="w-5 h-5" />
              Go Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link  
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-50 font-semibold hover:bg-white/[0.1] transition-colors w-full sm:w-auto"
            >
              Services
            </Link>
            
            <Link  
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-50 font-semibold hover:bg-white/[0.1] transition-colors w-full sm:w-auto"
            >
              About
            </Link>
            
            <Link  
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-50 font-semibold hover:bg-white/[0.1] transition-colors w-full sm:w-auto"
            >
              <Mail className="w-5 h-5" />
              Contact
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative particles */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-12 h-12 rounded-xl border border-primary-500/30 bg-primary-500/10 backdrop-blur-md"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full border border-secondary-500/30 bg-secondary-500/10 backdrop-blur-md"
      />
    </main>
  );
}
