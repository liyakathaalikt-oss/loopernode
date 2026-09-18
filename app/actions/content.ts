"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

import prisma from '@/lib/prisma';

// --- SERVICES ---
export async function getServices() {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}
export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } });
}
export async function saveService(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const id = formData.get("id") as string | null;
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    category: formData.get("category") as string || "main",
    description: formData.get("description") as string,
    longDescription: formData.get("longDescription") as string || null,
    icon: formData.get("icon") as string,
    features: formData.get("features") as string, // JSON string
    benefits: formData.get("benefits") as string || null, // JSON string
    useCases: formData.get("useCases") as string || null, // JSON string
    content: formData.get("content") as string,
    coverImage: formData.get("coverImage") as string,
    order: parseInt(formData.get("order") as string || "0"),
  };

  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });

  revalidatePath("/admin/pages");
  revalidatePath("/services");
  revalidatePath(`/services/${data.slug}`);
  return { success: true };
}
export async function deleteService(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/pages");
  revalidatePath("/services");
}

// --- TEAM MEMBERS ---
export async function getTeamMembers() {
  return prisma.teamMember.findMany({ orderBy: { order: "asc" } });
}
export async function getTeamMemberById(id: string) {
  return prisma.teamMember.findUnique({ where: { id } });
}
export async function saveTeamMember(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const id = formData.get("id") as string | null;
  const data = {
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    bio: formData.get("bio") as string,
    image: formData.get("image") as string,
    linkedinUrl: formData.get("linkedinUrl") as string,
    order: parseInt(formData.get("order") as string || "0"),
  };

  if (id) await prisma.teamMember.update({ where: { id }, data });
  else await prisma.teamMember.create({ data });

  revalidatePath("/admin/team");
  revalidatePath("/about");
  return { success: true };
}
export async function deleteTeamMember(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
  revalidatePath("/about");
}

// --- GLOBAL CONTENT ---
export async function getGlobalContent(key: string) {
  const content = await prisma.globalContent.findUnique({ where: { key } });
  return content ? JSON.parse(content.data) : {};
}
export async function saveGlobalContent(key: string, jsonData: any) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.globalContent.upsert({
    where: { key },
    update: { data: JSON.stringify(jsonData) },
    create: { key, data: JSON.stringify(jsonData) },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  return { success: true };
}
