import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
};

export default function ForgotPasswordPage() {
  return (
    <section className="flex flex-1 items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">

        <div className="flex flex-col items-center gap-3 text-center">
          <Logo size={64} />
          <h1 className="text-2xl font-semibold tracking-tight">
            Recuperar contraseña
          </h1>
          <p className="text-sm">
            Escribe tu correo y te enviaremos un enlace para crear una nueva.
          </p>
        </div>

        <form className="flex w-full flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-[#11B6F0] focus:ring-2 focus:ring-[#11B6F0]/30"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#005595] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#004477]"
          >
            Enviar enlace
          </button>
        </form>

        <Link href="/auth/login" className="text-sm hover:underline">
          Volver a iniciar sesión
        </Link>

      </div>
    </section>
  );
}