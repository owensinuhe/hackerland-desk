import { Suspense } from "react";
import { requireSession } from "@/lib/session";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 flex-col">
      <Suspense fallback={<p className="p-8 text-sm opacity-70">Cargando…</p>}>
        <SessionGuard>{children}</SessionGuard>
      </Suspense>
    </main>
  );
}

async function SessionGuard({ children }: { children: React.ReactNode }) {
  await requireSession(); // sin sesión → /auth/login
  return <>{children}</>;
}