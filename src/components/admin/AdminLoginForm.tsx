"use client";

import { useFormState, useFormStatus } from "react-dom";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { loginAction } from "@/app/actions/auth";

const initialState: { error?: string } = { error: undefined };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Memproses...
        </>
      ) : (
        "Login"
      )}
    </button>
  );
}

export default function AdminLoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="rounded-lg p-3 bg-red-50 border border-red-200 text-red-800 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{state.error}</p>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1.5">Username</label>
        <input
          type="text"
          name="username"
          required
          autoComplete="username"
          className="input-field"
          placeholder="admin"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Password</label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="input-field"
          placeholder="••••••••"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
