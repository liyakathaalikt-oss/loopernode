"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getCaseStudies() {
  return prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getCaseStudyById(id: string) {
  return prisma.caseStudy.findUnique({ where: { id } });
}

export async function saveCaseStudy(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const id = formData.get("id") as string | null;
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    client: formData.get("client") as string,
    industry: formData.get("industry") as string,
    challenge: formData.get("challenge") as string,
    solution: formData.get("solution") as string,
    results: formData.get("results") as string, // JSON string
    image: formData.get("image") as string,
  };

  if (id) await prisma.caseStudy.update({ where: { id }, data });
  else await prisma.caseStudy.create({ data });

  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${data.slug}`);
  return { success: true };
}

export async function deleteCaseStudy(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await prisma.caseStudy.delete({ where: { id } });
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
}
