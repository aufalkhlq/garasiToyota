import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { prisma } from "@/lib/prisma";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const item = await prisma.testimonial.findUnique({
    where: { id: Number(params.id) }
  });

  if (!item) {
    notFound();
  }

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
          <h1 className="heading-2">Edit Testimoni</h1>
          <p className="mt-1 text-sm text-muted-foreground">Ubah gambar testimoni pelanggan</p>
        </div>
      </div>
      <TestimonialForm item={item} />
    </div>
  );
}