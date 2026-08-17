"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

import prisma from '@/lib/prisma';

export async function getJobs() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return prisma.jobPosting.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getJobById(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return prisma.jobPosting.findUnique({
    where: { id },
  });
}

export async function saveJob(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const jobId = formData.get("jobId") as string | null;
  const department = formData.get("department") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const status = formData.get("status") as string;
  const description = formData.get("description") as string;

  const data = {
    title,
    slug,
    jobId,
    department,
    location,
    type,
    status,
    description,
  };

  if (id) {
    await prisma.jobPosting.update({
      where: { id },
      data,
    });
  } else {
    await prisma.jobPosting.create({
      data,
    });
  }

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  revalidatePath(`/careers/${slug}`);
  
  return { success: true };
}

export async function deleteJob(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.jobPosting.delete({
    where: { id },
  });

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
}
