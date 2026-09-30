"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim() || null;
    const subject = (formData.get("subject") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Nama wajib diisi";
    if (!email) errors.email = "Email wajib diisi";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      errors.email = "Format email tidak valid";
    }
    if (phone && !/^[0-9+\-\s]{8,15}$/.test(phone)) {
      errors.phone = "Format nomor telepon tidak valid";
    }
    if (!subject) errors.subject = "Subjek wajib diisi";
    if (!message || message.length < 10) {
      errors.message = "Pesan minimal 10 karakter";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Periksa kembali isian Anda",
        errors,
      };
    }

    await prisma.contactMessage.create({
      data: {
        name: name!,
        email: email!,
        phone: phone,
        subject: subject!,
        message: message!,
        status: "baru",
      },
    });

    revalidatePath("/admin/messages");

    return {
      success: true,
      message:
        "Pesan berhasil dikirim! Tim kami akan segera merespons pesan Anda.",
    };
  } catch (error) {
    console.error("Contact error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan sistem. Silakan coba lagi.",
    };
  }
}
