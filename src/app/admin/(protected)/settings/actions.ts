"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

export async function updateSettings(formData: FormData) {
  await requireAdmin();

  const all = await prisma.siteSetting.findMany();
  for (const setting of all) {
    const value = formData.get(`setting_${setting.id}`);
    if (value !== null) {
      const newValue = String(value).trim();
      await prisma.siteSetting.update({
        where: { id: setting.id },
        data: { value: newValue || null },
      });
    }
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/pricelist");
  revalidatePath("/kontak");
  redirect("/admin/settings");
}

