import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import LoginForm from "@/components/LoginForm";
  import { redirect } from "next/navigation";
  import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");
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
        <LoginForm />

        {/* Enlace para recuperar contraseña */}
        <Link href="/auth/forgot-password" className="text-sm hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>

      </div>
    </section>
  );
}