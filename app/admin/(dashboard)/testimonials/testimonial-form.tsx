"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveTestimonial } from "@/app/actions/testimonials";
import { Save, Loader2, AlertCircle } from "lucide-react";

export function TestimonialForm({ testimonial }: { testimonial?: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await saveTestimonial(formData);
        router.push("/admin/testimonials");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Failed to save testimonial");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
          <AlertCircle size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Client Name</label>
          <input
            type="text"
            name="clientName"
            defaultValue={testimonial?.clientName}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Client Role</label>
          <input
            type="text"
            name="clientRole"
            defaultValue={testimonial?.clientRole}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. CEO"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Company</label>
          <input
            type="text"
            name="company"
            defaultValue={testimonial?.company}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. Acme Corp"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Display Order</label>
          <input
            type="number"
            name="order"
            defaultValue={testimonial?.order ?? 0}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Client Image (Optional)</label>
          <input
            type="text"
            name="image"
            defaultValue={testimonial?.image}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="Paste image URL here..."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Testimonial Content</label>
          <textarea
            name="content"
            defaultValue={testimonial?.content}
            required
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 resize-none"
            placeholder="What did the client say about Loopernode?"
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
          Save Testimonial
        </button>
      </div>
    </form>
  );
}
