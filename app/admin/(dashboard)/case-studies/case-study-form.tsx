"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveCaseStudy } from "@/app/actions/case-studies";
import { Save, Loader2, AlertCircle } from "lucide-react";

export function CaseStudyForm({ study }: { study?: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    
    // Add results as JSON string
    const resultsList = formData.get("resultsRaw") as string;
    const resultsArray = resultsList.split('\n').filter(f => f.trim() !== '');
    formData.append("results", JSON.stringify(resultsArray));
    formData.delete("resultsRaw");

    startTransition(async () => {
      try {
        await saveCaseStudy(formData);
        router.push("/admin/case-studies");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Failed to save case study");
      }
    });
  }

  const defaultResults = study?.results ? JSON.parse(study.results).join('\n') : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {study && <input type="hidden" name="id" value={study.id} />}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
          <AlertCircle size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={study?.title}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. Revolutionizing Medical Imaging"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Slug</label>
          <input
            type="text"
            name="slug"
            defaultValue={study?.slug}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. medical-imaging-case"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Client Name</label>
          <input
            type="text"
            name="client"
            defaultValue={study?.client}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. Acme Health Corp"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Industry</label>
          <input
            type="text"
            name="industry"
            defaultValue={study?.industry}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. Healthcare"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Cover Image</label>
          <input
            type="text"
            name="image"
            defaultValue={study?.image}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="Paste image URL here..."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">The Challenge</label>
          <textarea
            name="challenge"
            defaultValue={study?.challenge}
            required
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 resize-none"
            placeholder="Describe the client's problem..."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">The Solution</label>
          <textarea
            name="solution"
            defaultValue={study?.solution}
            required
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 resize-none"
            placeholder="How did Loopernode solve it?"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Key Results (One per line)</label>
          <textarea
            name="resultsRaw"
            defaultValue={defaultResults}
            required
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 resize-none"
            placeholder="99% accuracy achieved&#10;50% reduction in processing time"
          />
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-white/10">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Case Study
        </button>
      </div>
    </form>
  );
}
