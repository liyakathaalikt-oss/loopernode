import { notFound } from "next/navigation";
import { getTeamMemberById } from "@/app/actions/content";
import { TeamForm } from "../team-form";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Edit Team Member
        </h1>
        <p className="text-slate-400 mt-2">Update the details of {member.name}.</p>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6 md:p-8">
        <TeamForm member={member} />
      </div>
    </div>
  );
}
