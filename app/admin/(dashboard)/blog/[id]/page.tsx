import { BlogForm } from "../blog-form";
import { getBlogPostById } from "@/app/actions/blog";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <BlogForm initialData={post} />
    </div>
  );
}
