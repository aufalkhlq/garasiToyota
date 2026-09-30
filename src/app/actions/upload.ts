"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || !file.name) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // create a unique filename
  const ext = file.name.split(".").pop();
  const filename = `${uuidv4()}.${ext}`;

  // Use the public/uploads directory
  const path = join(process.cwd(), "public/uploads", filename);
  await writeFile(path, buffer);

  // return the relative url to access it
  return `/uploads/${filename}`;
}