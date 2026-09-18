"use client";

import { useRouter } from "next/navigation";
import { Plus, PenSquare } from "lucide-react";

export function AddNewButton({ 
  href, 
  label, 
  icon = "plus" 
}: { 
  href: string; 
  label: string; 
  icon?: "plus" | "edit";
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  if (icon === "edit") {
    return (
      <button
        onClick={handleClick}
        className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors"
      >
        <PenSquare size={18} />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"
    >
      <Plus size={18} />
      {label}
    </button>
  );
}
