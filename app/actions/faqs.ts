"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function getFaqs() {
  return prisma.faq.findMany({ orderBy: { order: "asc" } });
}

export async function getFaqById(id: string) {
  return prisma.faq.findUnique({ where: { id } });
}

export async function saveFaq(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const id = formData.get("id") as string | null;
  const data = {
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    category: formData.get("category") as string,
    order: parseInt(formData.get("order") as string || "0"),
  };

  if (id) await prisma.faq.update({ where: { id }, data });
  else await prisma.faq.create({ data });

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}
