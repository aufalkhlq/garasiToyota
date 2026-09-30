"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";

const initialState: { success: boolean; message: string; errors?: Record<string, string> } = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Mengirim...
        </>
      ) : (
        "Kirim Pesan"
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  const errors = state.errors ?? {};

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {state.message && (
        <div
          className={`rounded-lg p-4 flex items-start gap-3 ${
            state.success
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm">{state.message}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            className="input-field"
            placeholder="Nama Anda"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            className="input-field"
            placeholder="nama@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Nomor Telepon
          </label>
          <input
            type="tel"
            name="phone"
            className="input-field"
            placeholder="08xxxxxxxxxx"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Subjek <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            required
            className="input-field"
            placeholder="Tanya promo / test drive / dll"
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Pesan <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="input-field"
          placeholder="Tulis pesan Anda di sini..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
