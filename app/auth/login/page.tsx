import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <section className="flex flex-1 items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">

        {/* Logo y título, igual que en la barra */}
        <div className="flex flex-col items-center gap-3">
          <Logo size={64} />
          <h1 className="text-2xl font-semibold tracking-tight">
            Hackerland<span className="text-[#11B6F0]">-Desk</span>
          </h1>
        </div>

        {/* Formulario */}
        <form className="flex w-full flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-[#11B6F0] focus:ring-2 focus:ring-[#11B6F0]/30"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-[#11B6F0] focus:ring-2 focus:ring-[#11B6F0]/30"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#005595] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#004477]"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Enlace para recuperar contraseña */}
        <Link href="/auth/forgot-password" className="text-sm hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>

      </div>
    </section>
  );
}