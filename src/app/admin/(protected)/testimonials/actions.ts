"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function deleteTestimonial(formData: FormData) {
  const id = Number(formData.get("id"));
  if (id) {
    await prisma.testimonial.delete({ where: { id } });
  }
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function toggleTestimonialActive(formData: FormData) {
  const id = Number(formData.get("id"));
  const isActive = formData.get("isActive") === "true";
  
  if (id) {
    await prisma.testimonial.update({
      where: { id },
      data: { isActive },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function saveTestimonial(formData: FormData) {
  const idStr = formData.get("id") as string;
  const id = idStr ? Number(idStr) : null;

  const data = {
    image: formData.get("image") as string,
    sortOrder: Number(formData.get("sortOrder")) || 0,
    isActive: formData.get("isActive") === "true",
  };

  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}