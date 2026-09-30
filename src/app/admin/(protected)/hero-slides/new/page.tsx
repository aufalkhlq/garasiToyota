import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SlideForm from "@/components/admin/SlideForm";

export default function NewSlidePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/hero-slides"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="heading-2">Tambah Slide</h1>
          <p className="mt-1 text-sm text-muted-foreground">Tambahkan slide hero baru</p>
        </div>
      </div>
      <SlideForm />
    </div>
  );
}