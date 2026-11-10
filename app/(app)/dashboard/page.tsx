import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tablero",
};

export default function DashboardPage() {
  return (
    <section className="flex flex-1 flex-col p-8">
      <h1 className="text-2xl font-semibold">Tablero</h1>
      <Suspense fallback={<p className="mt-2 text-sm opacity-70">Cargando…</p>}>
        <UserInfo />
      </Suspense>
    </section>
  );
}

async function UserInfo() {
  const { user } = await requireSession();
  return <p className="mt-2 text-sm opacity-70">Hola, {user.name} · rol: {user.role}</p>;
}