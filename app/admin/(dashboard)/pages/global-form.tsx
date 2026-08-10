"use client";

import { useState } from "react";
import { saveGlobalContent } from "@/app/actions/content";
import { Save, Loader2, AlertCircle } from "lucide-react";

export function GlobalContentForm({ title, contentKey, initialData }: { title: string, contentKey: string, initialData: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [jsonText, setJsonText] = useState(JSON.stringify(initialData, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);
    
    try {
      const parsedData = JSON.parse(jsonText);
      await saveGlobalContent(contentKey, parsedData);
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      setError("Invalid JSON format. Please check your syntax.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-6 rounded-xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <button 
          type="submit" 
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save {contentKey}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-2 text-sm font-medium">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div>
        <p className="text-xs text-slate-400 mb-2">Edit the raw JSON data for this section. Changes will reflect instantly on the frontend.</p>
        <textarea 
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          rows={10}
          className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 text-green-400 font-mono text-sm resize-y"
          placeholder='{\n  "heroTitle": "Welcome"\n}'
        />
      </div>
    </form>
  );
}
