"use server";

import { put, del } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

import prisma from '@/lib/prisma';

export async function uploadMedia(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  // Upload to Vercel Blob
  const blob = await put(file.name, file, {
    access: "public",
  });

  // Save reference in Prisma
  const media = await prisma.media.create({
    data: {
      url: blob.url,
      filename: file.name,
      size: file.size,
      mimeType: file.type,
      alt: file.name,
    },
  });

  revalidatePath("/admin/media");
  return media;
}

export async function deleteMedia(id: string, url: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  // Delete from Vercel Blob
  await del(url);

  // Delete from Prisma
  await prisma.media.delete({
    where: { id },
  });

  revalidatePath("/admin/media");
  return { success: true };
}

export async function getMedia() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });
}
