"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveService } from "@/app/actions/content";
import { Save, Loader2, AlertCircle } from "lucide-react";

export function ServiceForm({ service }: { service?: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    
    // Parse Features
    const featuresRaw = formData.get("featuresRaw") as string;
    if (featuresRaw.trim().startsWith("[")) {
      formData.append("features", featuresRaw); // It's already JSON
    } else {
      const featuresArray = featuresRaw.split('\n').filter(f => f.trim() !== '');
      formData.append("features", JSON.stringify(featuresArray));
    }
    formData.delete("featuresRaw");

    // Parse Benefits
    const benefitsRaw = formData.get("benefitsRaw") as string;
    if (benefitsRaw) {
      if (benefitsRaw.trim().startsWith("[")) {
        formData.append("benefits", benefitsRaw);
      } else {
        const benefitsArray = benefitsRaw.split('\n').filter(f => f.trim() !== '');
        formData.append("benefits", JSON.stringify(benefitsArray));
      }
    }
    formData.delete("benefitsRaw");

    // Parse UseCases
    const useCasesRaw = formData.get("useCasesRaw") as string;
    if (useCasesRaw) {
      if (useCasesRaw.trim().startsWith("[")) {
        formData.append("useCases", useCasesRaw);
      } else {
        const useCasesArray = useCasesRaw.split('\n').filter(f => f.trim() !== '');
        formData.append("useCases", JSON.stringify(useCasesArray));
      }
    }
    formData.delete("useCasesRaw");

    startTransition(async () => {
      try {
        await saveService(formData);
        router.push("/admin/services");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Failed to save service");
      }
    });
  }

  // Format default values for textareas
  const formatJSONForTextarea = (val: string | null) => {
    if (!val) return "";
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
        return parsed.join('\n'); // Simple string array
      }
      return JSON.stringify(parsed, null, 2); // Complex object array
    } catch {
      return val;
    }
  };

  const defaultFeatures = formatJSONForTextarea(service?.features);
  const defaultBenefits = formatJSONForTextarea(service?.benefits);
  const defaultUseCases = formatJSONForTextarea(service?.useCases);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {service && <input type="hidden" name="id" value={service.id} />}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
          <AlertCircle size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={service?.title}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. Image Annotation"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Slug</label>
          <input
            type="text"
            name="slug"
            defaultValue={service?.slug}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. image-annotation"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Category</label>
          <select
            name="category"
            defaultValue={service?.category || "main"}
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
          >
            <option value="main">Main Service Category</option>
            <option value="data-collection">Data Collection Sub-Service</option>
            <option value="data-labeling">Data Labeling Sub-Service</option>
            <option value="data-processing">Data Processing Sub-Service</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Display Order</label>
          <input
            type="number"
            name="order"
            defaultValue={service?.order ?? 0}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Short Description</label>
          <textarea
            name="description"
            defaultValue={service?.description}
            required
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 resize-none"
            placeholder="A brief summary of the service..."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Long Description (For Sub-Services)</label>
          <textarea
            name="longDescription"
            defaultValue={service?.longDescription || ""}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 resize-none"
            placeholder="Detailed description for the sub-service page..."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Icon Name (Lucide React)</label>
          <input
            type="text"
            name="icon"
            defaultValue={service?.icon}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. Image, Type, Box"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            defaultValue={service?.coverImage}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. /images/services/data-collection.jpg"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Features (One per line OR valid JSON array)</label>
          <textarea
            name="featuresRaw"
            defaultValue={defaultFeatures}
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 font-mono text-sm"
            placeholder="Feature 1&#10;Feature 2&#10;OR [{'title': '...', 'description': '...'}]"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Benefits (One per line OR valid JSON array)</label>
          <textarea
            name="benefitsRaw"
            defaultValue={defaultBenefits}
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 font-mono text-sm"
            placeholder="Benefit 1&#10;Benefit 2..."
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Use Cases (One per line OR valid JSON array)</label>
          <textarea
            name="useCasesRaw"
            defaultValue={defaultUseCases}
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 font-mono text-sm"
            placeholder="Use Case 1&#10;Use Case 2..."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Rich HTML Content (Optional Detail Page)</label>
          <textarea
            name="content"
            defaultValue={service?.content || ""}
            rows={10}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 font-mono text-sm"
            placeholder="<p>Full detailed service description...</p>"
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
          Save Service
        </button>
      </div>
    </form>
  );
}
