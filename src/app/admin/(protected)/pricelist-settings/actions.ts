"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function updatePricelistSettings(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const all = await prisma.siteSetting.findMany({
    where: { category: "pricelist" }
  });

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

  revalidatePath("/admin/pricelist-settings");
  revalidatePath("/pricelist");
  redirect("/admin/pricelist-settings");
}
