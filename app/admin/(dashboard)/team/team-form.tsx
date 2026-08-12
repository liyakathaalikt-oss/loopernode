"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveTeamMember } from "@/app/actions/content";
import { Save, Loader2, AlertCircle } from "lucide-react";

export function TeamForm({ member }: { member?: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      try {
        await saveTeamMember(formData);
        router.push("/admin/team");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Failed to save team member");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {member && <input type="hidden" name="id" value={member.id} />}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
          <AlertCircle size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Full Name</label>
          <input
            type="text"
            name="name"
            defaultValue={member?.name}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. Jane Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Role / Job Title</label>
          <input
            type="text"
            name="role"
            defaultValue={member?.role}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="e.g. Lead Data Scientist"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Profile Image</label>
          {member?.image && (
            <div className="mb-2">
              <img src={member.image} alt="Current profile" className="w-16 h-16 object-cover rounded-lg border border-white/10" />
              <input type="hidden" name="currentImage" value={member.image} />
            </div>
          )}
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-600 cursor-pointer"
          />
          <p className="text-xs text-slate-400 mt-1">Upload a new image to replace the current one.</p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Short Bio (Optional)</label>
          <textarea
            name="bio"
            defaultValue={member?.bio || ""}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 resize-none"
            placeholder="A short biography..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">LinkedIn URL (Optional)</label>
          <input
            type="url"
            name="linkedinUrl"
            defaultValue={member?.linkedinUrl || ""}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Display Order</label>
          <input
            type="number"
            name="order"
            defaultValue={member?.order ?? 0}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
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
          Save Team Member
        </button>
      </div>
    </form>
  );
}
