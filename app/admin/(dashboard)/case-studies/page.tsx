import { getCaseStudies } from "@/app/actions/case-studies";
import { Plus, PenSquare } from "lucide-react";
import { DeleteCaseStudyButton } from "./delete-button";

export default async function CaseStudiesManagerPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
            Case Studies
          </h1>
          <p className="text-slate-400 mt-2">Manage customer success stories and case studies.</p>
        </div>
        
        <a href="/admin/case-studies/new" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"><Plus size={18} />New Case Study</a>
      </div>

      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Industry</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseStudies.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No case studies found. Create your first case study!
                </td>
              </tr>
            ) : (
              caseStudies.map((study) => (
                <tr key={study.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    {study.title}
                    <div className="text-xs text-slate-500 font-normal mt-1">{study.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {study.client}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {study.industry}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/admin/case-studies/${study.id}`} className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors"><PenSquare size={18} /></a>
                      <DeleteCaseStudyButton id={study.id} />
                    </div>
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
