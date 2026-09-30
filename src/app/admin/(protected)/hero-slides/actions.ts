"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function deleteSlide(formData: FormData) {
  const id = Number(formData.get("id"));
  if (id) {
    await prisma.heroSlide.delete({ where: { id } });
  }
  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
}

export async function toggleSlideActive(formData: FormData) {
  const id = Number(formData.get("id"));
  const isActive = formData.get("isActive") === "true";
  
  if (id) {
    await prisma.heroSlide.update({
      where: { id },
      data: { isActive },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
}

export async function saveSlide(formData: FormData) {
  const idStr = formData.get("id") as string;
  const id = idStr ? Number(idStr) : null;

  const data = {
    image: formData.get("image") as string,
    title: formData.get("title") as string || null,
    subtitle: formData.get("subtitle") as string || null,
    ctaLabel: formData.get("ctaLabel") as string || null,
    ctaHref: formData.get("ctaHref") as string || null,
    textPosition: formData.get("textPosition") as string,
    sortOrder: Number(formData.get("sortOrder")) || 0,
    isActive: formData.get("isActive") === "true",
  };

  if (id) {
    await prisma.heroSlide.update({ where: { id }, data });
  } else {
    await prisma.heroSlide.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
  redirect("/admin/hero-slides");
}