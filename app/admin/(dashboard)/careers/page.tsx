import { getJobs } from "@/app/actions/careers";
import { CheckCircle, XCircle, Plus, PenSquare } from "lucide-react";
import { DeleteJobButton } from "./delete-button";

export default async function CareersManagerPage() {
  const jobs = await getJobs();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
            Careers
          </h1>
          <p className="text-slate-400 mt-2">Manage open job postings and departments.</p>
        </div>
        
        <a href="/admin/careers/new" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"><Plus size={18} />New Job</a>
      </div>

      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Title & Department</th>
              <th className="px-6 py-4">Location / Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No job postings found. Create your first listing!
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{job.title}</div>
                    <div className="text-xs text-slate-500 font-normal mt-1">{job.department}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-300">{job.location}</div>
                    <div className="text-xs text-slate-500 mt-1">{job.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    {job.status === 'OPEN' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                        <CheckCircle size={14} /> Open
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        <XCircle size={14} /> Closed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <a href={`/admin/careers/${job.id}`} className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors"><PenSquare size={18} /></a>
                    <DeleteJobButton id={job.id} />
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
