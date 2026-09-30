import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;
  const filePath = join(process.cwd(), "public", "uploads", filename);

  if (!existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  try {
    const fileBuffer = await readFile(filePath);
    
    // Determine content type based on extension
    const ext = filename.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === 'png') contentType = 'image/png';
    else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
    else if (ext === 'webp') contentType = 'image/webp';
    else if (ext === 'gif') contentType = 'image/gif';
    else if (ext === 'svg') contentType = 'image/svg+xml';

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new NextResponse("Error reading file", { status: 500 });
  }
}
