"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function deletePromo(formData: FormData) {
  const id = Number(formData.get("id"));
  if (id) {
    await prisma.promo.delete({ where: { id } });
  }
  revalidatePath("/");
  revalidatePath("/admin/promos");
}

export async function togglePromoActive(formData: FormData) {
  const id = Number(formData.get("id"));
  const isActive = formData.get("isActive") === "true";

  if (id) {
    await prisma.promo.update({
      where: { id },
      data: { isActive },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/promos");
}

export async function savePromo(formData: FormData) {
  const idStr = formData.get("id") as string;
  const id = idStr ? Number(idStr) : null;

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image: (formData.get("image") as string) || null,
    images: (formData.get("images") as string) || null,
    badge: (formData.get("badge") as string) || null,
    ctaText: (formData.get("ctaText") as string) || null,
    ctaLink: (formData.get("ctaLink") as string) || null,
    layout: (formData.get("layout") as string) || "image-top",
    sortOrder: Number(formData.get("sortOrder")) || 0,
    isActive: formData.get("isActive") === "true",
  };

  if (id) {
    await prisma.promo.update({ where: { id }, data });
  } else {
    await prisma.promo.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/promos");
  redirect("/admin/promos");
}
