"use client";

import { Trash2 } from "lucide-react";
import { deleteBlogPost } from "@/app/actions/blog";
import { useState } from "react";

export function DeleteBlogButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setIsDeleting(true);
      await deleteBlogPost(id);
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  );
}
