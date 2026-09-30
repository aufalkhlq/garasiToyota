"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type TradeInFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitTradeIn(
  prevState: TradeInFormState,
  formData: FormData
): Promise<TradeInFormState> {
  try {
    const customerName = (formData.get("customerName") as string)?.trim();
    const customerPhone = (formData.get("customerPhone") as string)?.trim();
    const customerEmail = (formData.get("customerEmail") as string)?.trim();
    const oldCarBrand = (formData.get("oldCarBrand") as string)?.trim();
    const oldCarModel = (formData.get("oldCarModel") as string)?.trim();
    const oldCarYear = parseInt(formData.get("oldCarYear") as string);
    const oldCarKm = parseInt(formData.get("oldCarKm") as string);
    const oldCarCondition = (formData.get("oldCarCondition") as string)?.trim();
    const targetCar = (formData.get("targetCar") as string)?.trim();
    const notes = (formData.get("notes") as string)?.trim() || null;

    const errors: Record<string, string> = {};
    if (!customerName) errors.customerName = "Nama wajib diisi";
    if (!customerPhone) errors.customerPhone = "Nomor telepon wajib diisi";
    if (customerPhone && !/^[0-9+\-\s]{8,15}$/.test(customerPhone)) {
      errors.customerPhone = "Format nomor telepon tidak valid";
    }
    if (customerEmail && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(customerEmail)) {
      errors.customerEmail = "Format email tidak valid";
    }
    if (!oldCarBrand) errors.oldCarBrand = "Merk mobil lama wajib diisi";
    if (!oldCarModel) errors.oldCarModel = "Model mobil lama wajib diisi";
    if (isNaN(oldCarYear) || oldCarYear < 1990 || oldCarYear > 2030) {
      errors.oldCarYear = "Tahun tidak valid (1990-2030)";
    }
    if (isNaN(oldCarKm) || oldCarKm < 0) {
      errors.oldCarKm = "Kilometer tidak valid";
    }
    if (!oldCarCondition) errors.oldCarCondition = "Kondisi mobil wajib diisi";
    if (!targetCar) errors.targetCar = "Mobil incaran wajib diisi";

    if (Object.keys(errors).length > 0) {
      return { success: false, message: "Periksa kembali isian Anda", errors };
    }

    await prisma.tradeInSubmission.create({
      data: {
        customerName: customerName!,
        customerPhone: customerPhone!,
        customerEmail: customerEmail || null,
        oldCarBrand: oldCarBrand!,
        oldCarModel: oldCarModel!,
        oldCarYear,
        oldCarKm,
        oldCarCondition: oldCarCondition!,
        targetCar: targetCar!,
        notes,
        status: "baru",
      },
    });

    revalidatePath("/admin/trade-in");

    return {
      success: true,
      message:
        "Pengajuan trade-in berhasil dikirim! Tim kami akan menghubungi Anda dalam 1x24 jam.",
    };
  } catch (error) {
    console.error("Trade in error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan sistem. Silakan coba lagi.",
    };
  }
}
