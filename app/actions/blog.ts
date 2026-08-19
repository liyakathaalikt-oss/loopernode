"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import prisma from '@/lib/prisma';

export async function getBlogPosts() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogPostById(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return prisma.blogPost.findUnique({
    where: { id },
  });
}

export async function saveBlogPost(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const published = formData.get("published") === "on";
  const author = formData.get("author") as string;
  const tagsStr = formData.get("tags") as string;
  const coverImage = formData.get("coverImage") as string;

  const data = {
    title,
    slug,
    content,
    excerpt,
    published,
    author,
    coverImage,
    tags: tagsStr, // In SQLite version we mapped tags String[] to just String (storing as JSON or comma separated)
  };

  if (id) {
    await prisma.blogPost.update({
      where: { id },
      data,
    });
  } else {
    await prisma.blogPost.create({
      data,
    });
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
