import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-muted py-12">
      <div className="w-full max-w-md px-4">
        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-white mb-3">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Masuk untuk mengelola data dealer
            </p>
          </div>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
