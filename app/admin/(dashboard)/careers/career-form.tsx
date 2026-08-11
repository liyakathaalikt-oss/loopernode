"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveJob } from "@/app/actions/careers";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Save, Loader2 } from "lucide-react";

export function CareerForm({ initialData }: { initialData?: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [description, setDescription] = useState(initialData?.description || "");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("description", description);
    
    if (initialData?.id) {
      formData.append("id", initialData.id);
    }

    try {
      await saveJob(formData);
      router.push("/admin/careers");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save job");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <h2 className="text-xl font-semibold">{initialData ? 'Edit Job' : 'Create New Job'}</h2>
        <button 
          type="submit" 
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
            <input 
              name="title" 
              type="text" 
              required
              defaultValue={initialData?.title}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 text-white"
              placeholder="e.g. Senior Machine Learning Engineer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Job Description</label>
            <RichTextEditor content={description} onChange={setDescription} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-xl border border-white/10 space-y-4">
            <h3 className="font-semibold mb-2 border-b border-white/10 pb-2">Details</h3>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
              <select 
                name="status"
                defaultValue={initialData?.status || "OPEN"}
                className="w-full px-3 py-2 text-sm bg-dark-900 border border-white/10 rounded-md focus:outline-none focus:border-primary-500 text-white"
              >
                <option value="OPEN">Open (Accepting Applications)</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Department</label>
              <input 
                name="department" 
                type="text" 
                required
                defaultValue={initialData?.department}
                className="w-full px-3 py-2 text-sm bg-dark-900 border border-white/10 rounded-md focus:outline-none focus:border-primary-500 text-white"
                placeholder="Engineering"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
              <input 
                name="location" 
                type="text" 
                required
                defaultValue={initialData?.location}
                className="w-full px-3 py-2 text-sm bg-dark-900 border border-white/10 rounded-md focus:outline-none focus:border-primary-500 text-white"
                placeholder="Remote, US"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Type</label>
              <input 
                name="type" 
                type="text" 
                required
                defaultValue={initialData?.type}
                className="w-full px-3 py-2 text-sm bg-dark-900 border border-white/10 rounded-md focus:outline-none focus:border-primary-500 text-white"
                placeholder="Full-time"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">URL Slug</label>
              <input 
                name="slug" 
                type="text" 
                required
                defaultValue={initialData?.slug}
                className="w-full px-3 py-2 text-sm bg-dark-900 border border-white/10 rounded-md focus:outline-none focus:border-primary-500 text-white"
                placeholder="senior-ml-engineer"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
