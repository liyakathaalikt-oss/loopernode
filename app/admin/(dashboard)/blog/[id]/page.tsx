import { BlogForm } from "../blog-form";
import { getBlogPostById } from "@/app/actions/blog";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <BlogForm initialData={post} />
    </div>
  );
}
