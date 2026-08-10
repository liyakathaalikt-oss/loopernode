"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export async function getTestimonialById(id: string) {
  return prisma.testimonial.findUnique({ where: { id } });
}

export async function saveTestimonial(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const id = formData.get("id") as string | null;
  const data = {
    clientName: formData.get("clientName") as string,
    clientRole: formData.get("clientRole") as string,
    company: formData.get("company") as string,
    content: formData.get("content") as string,
    image: formData.get("image") as string,
    order: parseInt(formData.get("order") as string || "0"),
  };

  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
