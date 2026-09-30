import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/testimonials"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="heading-2">Tambah Testimoni</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload gambar/screenshot testimoni pelanggan</p>
        </div>
      </div>
      <TestimonialForm />
    </div>
  );
}