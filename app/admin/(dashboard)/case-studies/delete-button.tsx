"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCaseStudy } from "@/app/actions/case-studies";
import { Trash2 } from "lucide-react";

export function DeleteCaseStudyButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this case study?")) {
      startTransition(async () => {
        await deleteCaseStudy(id);
        router.refresh();
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Case Study"
    >
      <Trash2 size={18} />
    </button>
  );
}
