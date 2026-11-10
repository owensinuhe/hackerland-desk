import type { Metadata } from "next";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Tablero",
};

export default async function DashboardPage() {
  const { user } = await requireSession();

  return (
    <section className="flex flex-1 flex-col p-8">
      <h1 className="text-2xl font-semibold">Tablero</h1>
      <p className="mt-2 text-sm opacity-70">
        Hola, {user.name} · rol: {user.role}
      </p>
    </section>
  );
}