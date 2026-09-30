"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

function parseFeatures(input: string): string[] {
  return input
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createCar(formData: FormData) {
  await requireAdmin();
  const data = {
    brand: String(formData.get("brand") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    typeId: Number(formData.get("typeId") ?? 0),
    price: Number(formData.get("price") ?? 0),
    year: Number(formData.get("year") ?? new Date().getFullYear()),
    transmission: String(formData.get("transmission") ?? "Manual"),
    fuel: String(formData.get("fuel") ?? "Bensin"),
    image: String(formData.get("image") ?? "").trim(),
    images: formData.get("images") ? String(formData.get("images")) : null,
    features: String(formData.get("features") ?? "").trim() || null,
    promo: String(formData.get("promo") ?? "").trim() || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
  };

  if (!data.brand || !data.name || !data.typeId || !data.image) {
    throw new Error("Brand, nama, tipe, dan gambar wajib diisi");
  }

  await prisma.car.create({ data });
  revalidatePath("/admin/cars");
  revalidatePath("/");
  revalidatePath("/pricelist");
  redirect("/admin/cars");
}

export async function updateCar(id: number, formData: FormData) {
  await requireAdmin();
  const data = {
    brand: String(formData.get("brand") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    typeId: Number(formData.get("typeId") ?? 0),
    price: Number(formData.get("price") ?? 0),
    year: Number(formData.get("year") ?? new Date().getFullYear()),
    transmission: String(formData.get("transmission") ?? "Manual"),
    fuel: String(formData.get("fuel") ?? "Bensin"),
    image: String(formData.get("image") ?? "").trim(),
    images: formData.get("images") ? String(formData.get("images")) : null,
    features: String(formData.get("features") ?? "").trim() || null,
    promo: String(formData.get("promo") ?? "").trim() || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
  };

  if (!data.brand || !data.name || !data.typeId || !data.image) {
    throw new Error("Brand, nama, tipe, dan gambar wajib diisi");
  }

  await prisma.car.update({ where: { id }, data });
  revalidatePath("/admin/cars");
  revalidatePath(`/admin/cars/${id}`);
  revalidatePath("/");
  revalidatePath("/pricelist");
  redirect("/admin/cars");
}

export async function deleteCar(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) throw new Error("Invalid id");
  await prisma.car.delete({ where: { id } });
  revalidatePath("/admin/cars");
  revalidatePath("/");
  revalidatePath("/pricelist");
  redirect("/admin/cars");
}

export async function toggleCarActive(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const isActive = formData.get("isActive") === "true";
  if (!Number.isFinite(id) || id <= 0) throw new Error("Invalid id");
  await prisma.car.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/cars");
  revalidatePath("/");
  revalidatePath("/pricelist");
}

