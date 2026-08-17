import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { Mail, Phone, Building2, Calendar, Globe, Briefcase, FileText } from 'lucide-react';
import { LeadStatusForm } from '@/components/admin/lead-status-form';

export const dynamic = 'force-dynamic';

async function updateLeadStatus(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  
  if (id && status) {
    await prisma.lead.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin/leads');
  }
}

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'NEW': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'QUALIFIED': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'CONTACTED': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'PROPOSAL': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'WON': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'LOST': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Lead CRM</h1>
          <p className="text-slate-400">Manage and track your incoming enterprise opportunities.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-center">
            <span className="block text-2xl font-bold text-white">{leads.length}</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Total Leads</span>
          </div>
          <div className="bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-center">
            <span className="block text-2xl font-bold text-cyan-400">{leads.filter(l => l.status === 'NEW').length}</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">New</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {leads.length === 0 ? (
          <div className="text-center py-12 bg-white/[0.02] border border-white/5 rounded-2xl">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-300">No leads yet</h3>
            <p className="text-slate-500 mt-2">When someone submits a contact form, it will appear here.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="bg-dark-900 border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 hover:border-indigo-500/30 transition-colors">
              {/* Left Column: Contact Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">{lead.name}</h2>
                    {lead.company && (
                      <div className="flex items-center gap-2 text-slate-400 mt-1">
                        <Building2 className="w-4 h-4" />
                        <span>{lead.company}</span>
                      </div>
                    )}
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2 min-w-0" title={lead.email}>
                    <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                    <a href={`mailto:${lead.email}`} className="hover:text-indigo-400 transition-colors truncate">
                      {lead.email}
                    </a>
                  </div>
                  {lead.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span>{lead.phone}</span>
                    </div>
                  )}
                  {lead.country && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span>{lead.country}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Middle Column: Project Info */}
              <div className="flex-[1.5] bg-dark-950 rounded-xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Service Required</span>
                  <span className="text-sm font-bold text-indigo-400">{lead.serviceRequired}</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5"><FileText className="w-3.5 h-3.5" /> Project Description</span>
                    <p className="text-sm text-slate-300 line-clamp-3">{lead.projectDesc || 'No description provided.'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Estimated Volume</span>
                        <span className="text-sm text-slate-200">{lead.estimatedVolume || 'Unspecified'}</span>
                     </div>
                     <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Timeline</span>
                        <span className="text-sm text-slate-200">{lead.timeline || 'Unspecified'}</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="w-full lg:w-48 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Update Status</span>
                  <LeadStatusForm 
                    leadId={lead.id} 
                    currentStatus={lead.status} 
                    updateAction={updateLeadStatus} 
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                   <span className="text-xs text-slate-500 block text-center">Source: {lead.source}</span>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
