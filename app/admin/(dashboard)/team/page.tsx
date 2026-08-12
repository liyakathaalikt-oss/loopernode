import { getTeamMembers } from "@/app/actions/content";
import { User, Plus, PenSquare } from "lucide-react";
import { DeleteTeamMemberButton } from "./delete-button";

export default async function TeamManagerPage() {
  const team = await getTeamMembers();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
            Team Members
          </h1>
          <p className="text-slate-400 mt-2">Manage the people behind your company.</p>
        </div>
        
        <a href="/admin/team/new" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"><Plus size={18} />Add Member</a>
      </div>

      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Member</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No team members found. Add your first team member!
                </td>
              </tr>
            ) : (
              team.map((member) => (
                <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="rounded-full object-cover w-10 h-10 border border-white/10" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                        <User size={18} className="text-slate-400" />
                      </div>
                    )}
                    <span>{member.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {member.order}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/admin/team/${member.id}`} className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors"><PenSquare size={18} /></a>
                      <DeleteTeamMemberButton id={member.id} />
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
