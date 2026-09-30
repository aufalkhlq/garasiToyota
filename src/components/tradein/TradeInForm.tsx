"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitTradeIn } from "@/app/actions/tradein";
import { DataDiriSection, DataMobilLamaSection } from "./form-sections";
import { MobilIncaranSection } from "./form-sections2";

const initialState: { success: boolean; message: string; errors?: Record<string, string> } = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full md:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Mengirim...
        </>
      ) : (
        "Kirim Pengajuan"
      )}
    </button>
  );
}

export default function TradeInForm() {
  const [state, formAction] = useFormState(submitTradeIn, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  const errors = state.errors ?? {};

  return (
    <form ref={formRef} action={formAction} className="space-y-8">
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

      <DataDiriSection errors={errors} />
      <DataMobilLamaSection errors={errors} />
      <MobilIncaranSection errors={errors} />

      <div className="border-t border-border pt-6">
        <SubmitButton />
        <p className="mt-3 text-xs text-muted-foreground">
          Dengan mengirim formulir ini, Anda menyetujui data Anda digunakan
          untuk keperluan penawaran.
        </p>
      </div>
    </form>
  );
}
