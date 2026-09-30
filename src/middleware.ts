import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "dealer_admin_session";
// PENTING: Fallback ini HARUS sinkron dengan default di src/lib/auth.ts
// karena middleware berjalan di Edge runtime yang tidak membaca .env secara otomatis.
// Di production, gunakan environment variable yang di-bundle via next.config.mjs.
const SESSION_SECRET =
  process.env.SESSION_SECRET || "rahasia-dealer-mobil-2024-ganti-ini-di-production";

// Edge runtime menggunakan Web Crypto API, bukan Node crypto
async function hmacSha256(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string): Promise<string> {
  return hmacSha256(SESSION_SECRET, value);
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return false;
    const expected = await sign(data);
    return expected === sig;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya lindungi /admin/* kecuali /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token || !(await verifyToken(token))) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
