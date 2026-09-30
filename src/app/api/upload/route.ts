import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/app/actions/upload";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const url = await uploadImage(formData);
    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload" }, { status: 500 });
  }
}