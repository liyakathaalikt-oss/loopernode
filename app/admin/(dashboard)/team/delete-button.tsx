"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteTeamMember } from "@/app/actions/content";
import { Trash2 } from "lucide-react";

export function DeleteTeamMemberButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this team member?")) {
      startTransition(async () => {
        await deleteTeamMember(id);
        router.refresh();
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Team Member"
    >
      <Trash2 size={18} />
    </button>
  );
}
