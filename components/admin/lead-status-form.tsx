'use client';

import { useTransition } from 'react';

export function LeadStatusForm({ 
  leadId, 
  currentStatus, 
  updateAction 
}: { 
  leadId: string, 
  currentStatus: string,
  updateAction: (formData: FormData) => Promise<void>
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={updateAction} className="flex gap-2">
      <input type="hidden" name="id" value={leadId} />
      <select 
        name="status" 
        defaultValue={currentStatus}
        disabled={isPending}
        className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none appearance-none cursor-pointer disabled:opacity-50"
        onChange={(e) => {
          const form = e.target.form;
          if (form) {
            startTransition(() => {
              form.requestSubmit();
            });
          }
        }}
      >
        <option value="NEW">New</option>
        <option value="QUALIFIED">Qualified</option>
        <option value="CONTACTED">Contacted</option>
        <option value="PROPOSAL">Proposal</option>
        <option value="WON">Won</option>
        <option value="LOST">Lost</option>
      </select>
    </form>
  );
}
