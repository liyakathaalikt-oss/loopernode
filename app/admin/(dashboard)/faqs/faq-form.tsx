"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveFaq } from "@/app/actions/faqs";
import { Save, Loader2, AlertCircle } from "lucide-react";

export function FaqForm({ faq }: { faq?: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await saveFaq(formData);
        router.push("/admin/faqs");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Failed to save FAQ");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {faq && <input type="hidden" name="id" value={faq.id} />}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
          <AlertCircle size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Question</label>
          <input
            type="text"
            name="question"
            defaultValue={faq?.question}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. What is your pricing model?"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Answer</label>
          <textarea
            name="answer"
            defaultValue={faq?.answer}
            required
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 resize-none"
            placeholder="Provide a clear and concise answer..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Category (Optional)</label>
            <input
              type="text"
              name="category"
              defaultValue={faq?.category}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
              placeholder="e.g. Pricing, General, Tech"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Display Order</label>
            <input
              type="number"
              name="order"
              defaultValue={faq?.order ?? 0}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-white/10">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save FAQ
        </button>
      </div>
    </form>
  );
}
