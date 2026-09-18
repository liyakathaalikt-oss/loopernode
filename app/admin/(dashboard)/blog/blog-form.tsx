"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveBlogPost } from "@/app/actions/blog";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Save, Loader2 } from "lucide-react";

export function BlogForm({ initialData }: { initialData?: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState(initialData?.content || "");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("content", content); // Add the rich text content
    
    if (initialData?.id) {
      formData.append("id", initialData.id);
    }

    try {
      await saveBlogPost(formData);
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save post");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <h2 className="text-xl font-semibold">{initialData ? 'Edit Post' : 'Create New Post'}</h2>
        <button 
          type="submit" 
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Post Title</label>
            <input 
              name="title" 
              type="text" 
              required
              defaultValue={initialData?.title}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 text-white"
              placeholder="e.g. The Future of AI Data Labeling"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt (Short description)</label>
            <textarea 
              name="excerpt" 
              rows={3}
              defaultValue={initialData?.excerpt}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 text-white resize-none"
              placeholder="Brief summary for the blog listing..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-4 border-b border-white/10 pb-2">Publishing</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                name="published" 
                defaultChecked={initialData?.published}
                className="w-5 h-5 rounded border-white/10 bg-dark-900 text-primary-500 focus:ring-primary-500 focus:ring-offset-dark-900" 
              />
              <span className="text-sm font-medium text-slate-300">Publish immediately</span>
            </label>
          </div>

          <div className="glass p-6 rounded-xl border border-white/10 space-y-4">
            <h3 className="font-semibold mb-2 border-b border-white/10 pb-2">Metadata</h3>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">URL Slug</label>
              <input 
                name="slug" 
                type="text" 
                required
                defaultValue={initialData?.slug}
                className="w-full px-3 py-2 text-sm bg-dark-900 border border-white/10 rounded-md focus:outline-none focus:border-primary-500 text-white"
                placeholder="the-future-of-ai"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Cover Image URL</label>
              <input 
                name="coverImage" 
                type="text" 
                defaultValue={initialData?.coverImage}
                className="w-full px-3 py-2 text-sm bg-dark-900 border border-white/10 rounded-md focus:outline-none focus:border-primary-500 text-white"
                placeholder="/images/blog/image.png"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Author Name</label>
              <input 
                name="author" 
                type="text" 
                defaultValue={initialData?.author}
                className="w-full px-3 py-2 text-sm bg-dark-900 border border-white/10 rounded-md focus:outline-none focus:border-primary-500 text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Tags (comma separated)</label>
              <input 
                name="tags" 
                type="text" 
                defaultValue={initialData?.tags}
                className="w-full px-3 py-2 text-sm bg-dark-900 border border-white/10 rounded-md focus:outline-none focus:border-primary-500 text-white"
                placeholder="AI, Machine Learning, Data"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
