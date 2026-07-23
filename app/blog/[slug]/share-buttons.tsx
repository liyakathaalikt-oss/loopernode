"use client";

import { Share2, Globe, Link2, Check } from "lucide-react";
import { useState, useEffect } from "react";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-slate-400">Share:</span>
      <button
        onClick={shareTwitter}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"
        aria-label="Share on Twitter"
      >
        <Share2 className="w-4 h-4" />
      </button>
      <button
        onClick={shareLinkedIn}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Globe className="w-4 h-4" />
      </button>
      <button
        onClick={handleCopy}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:bg-white/[0.1] hover:text-white transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
