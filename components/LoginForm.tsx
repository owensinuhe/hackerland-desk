"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/auth/login/actions";

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-[#11B6F0] focus:ring-2 focus:ring-[#11B6F0]/30";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <input
        name="username"
        type="text"
        placeholder="Usuario"
        autoComplete="username"
        required
        className={inputClass}
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        autoComplete="current-password"
        required
        className={inputClass}
      />

      {state.error && (
        <p className="text-sm text-red-500" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[#005595] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#004477] disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Iniciar sesión"}
      </button>
    </form>
  );
}