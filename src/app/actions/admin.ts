"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateTradeInStatus(id: number, status: string) {
  await prisma.tradeInSubmission.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/trade-in");
  revalidatePath("/admin");
}

export async function deleteTradeIn(id: number) {
  await prisma.tradeInSubmission.delete({ where: { id } });
  revalidatePath("/admin/trade-in");
  revalidatePath("/admin");
}

export async function updateMessageStatus(id: number, status: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(id: number) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
