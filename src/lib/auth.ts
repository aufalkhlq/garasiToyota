import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE = "dealer_admin_session";
const SESSION_SECRET =
  process.env.SESSION_SECRET || "rahasia-dealer-mobil-2024-ganti-ini-di-production";

export type Session = {
  username: string;
  expiresAt: number;
};

function sign(value: string): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(value)
    .digest("hex");
}

function createToken(payload: Session): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64");
  const sig = sign(data);
  return `${data}.${sig}`;
}

function verifyToken(token: string): Session | null {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expected = sign(data);
    if (sig !== expected) return null;
    const parsed = JSON.parse(Buffer.from(data, "base64").toString("utf-8")) as Session;
    if (parsed.expiresAt < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function createSession(username: string) {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 1 day
  const token = createToken({ username, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE);
  if (!cookie) return null;
  return verifyToken(cookie.value);
}

export function verifyCredentials(
  username: string,
  password: string
): boolean {
  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  return (
    username === adminUser &&
    // For demo: use simple comparison. In production, use bcrypt.
    password === adminPass
  );
}
