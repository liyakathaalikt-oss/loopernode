"use client";

import { useState, useRef } from "react";
import { uploadMedia } from "@/app/actions/media";
import { UploadCloud, Loader2 } from "lucide-react";

export function MediaUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      await uploadMedia(formData);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image. Check Vercel Blob configuration.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleUpload} 
      />
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-48 border-2 border-dashed border-white/20 hover:border-primary-500/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors glass bg-white/5 hover:bg-white/10"
      >
        {isUploading ? (
          <div className="flex flex-col items-center text-primary-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-medium">Uploading to Blob Storage...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-slate-400 hover:text-slate-200">
            <UploadCloud className="w-12 h-12 mb-4" />
            <p className="font-medium text-lg">Click or drag image to upload</p>
            <p className="text-sm opacity-60 mt-1">Supports JPG, PNG, WEBP, GIF</p>
          </div>
        )}
      </div>
    </div>
  );
}
