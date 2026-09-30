"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

export async function createType(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Nama tipe wajib diisi");

  await prisma.carType.create({
    data: {
      name,
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
    },
  });
  revalidatePath("/admin/types");
  revalidatePath("/");
  revalidatePath("/pricelist");
  redirect("/admin/types");
}

export async function updateType(id: number, formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Nama tipe wajib diisi");

  await prisma.carType.update({
    where: { id },
    data: {
      name,
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
    },
  });
  revalidatePath("/admin/types");
  revalidatePath("/");
  revalidatePath("/pricelist");
  redirect("/admin/types");
}

export async function deleteType(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) throw new Error("Invalid id");
  await prisma.carType.delete({ where: { id } });
  revalidatePath("/admin/types");
  revalidatePath("/");
  revalidatePath("/pricelist");
  redirect("/admin/types");
}

export async function toggleTypeActive(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const isActive = formData.get("isActive") === "true";
  if (!Number.isFinite(id) || id <= 0) throw new Error("Invalid id");
  await prisma.carType.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/types");
  revalidatePath("/");
  revalidatePath("/pricelist");
}

