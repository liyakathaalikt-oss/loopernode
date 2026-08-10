"use client";

import { deleteMedia } from "@/app/actions/media";
import { Trash2, Copy, ExternalLink } from "lucide-react";
import Image from "next/image";

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  size: number;
}

export function MediaGrid({ items }: { items: MediaItem[] }) {
  const handleDelete = async (id: string, url: string) => {
    if (confirm("Are you sure you want to delete this image? This cannot be undone.")) {
      await deleteMedia(id, url);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        No media uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {items.map((item) => (
        <div key={item.id} className="glass rounded-xl overflow-hidden border border-white/10 group relative flex flex-col">
          <div className="relative w-full aspect-square bg-dark-900 overflow-hidden flex-shrink-0">
            <img 
              src={item.url} 
              alt={item.filename}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
            
            {/* Actions overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button 
                onClick={() => copyToClipboard(item.url)}
                className="p-2 bg-white/20 hover:bg-primary-500 rounded-full text-white transition-colors tooltip"
                title="Copy URL"
              >
                <Copy size={18} />
              </button>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-white/20 hover:bg-accent-500 rounded-full text-white transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={18} />
              </a>
              <button 
                onClick={() => handleDelete(item.id, item.url)}
                className="p-2 bg-white/20 hover:bg-red-500 rounded-full text-white transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="p-3 text-xs flex-1 flex flex-col justify-between">
            <p className="text-slate-300 truncate font-medium mb-1" title={item.filename}>
              {item.filename}
            </p>
            <p className="text-slate-500">
              {(item.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
