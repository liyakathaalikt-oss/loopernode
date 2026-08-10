import { getFaqs } from "@/app/actions/faqs";
import { Plus, PenSquare } from "lucide-react";
import { DeleteFaqButton } from "./delete-button";

export default async function FaqsManagerPage() {
  const faqs = await getFaqs();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
            FAQs
          </h1>
          <p className="text-slate-400 mt-2">Manage Frequently Asked Questions.</p>
        </div>
        
        <a href="/admin/faqs/new" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"><Plus size={18} />New FAQ</a>
      </div>

      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Question</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No FAQs found. Add your first question!
                </td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white max-w-md truncate">
                    {faq.question}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {faq.category || "General"}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {faq.order}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <a href={`/admin/faqs/${faq.id}`} className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors"><PenSquare size={18} /></a>
                    <DeleteFaqButton id={faq.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
