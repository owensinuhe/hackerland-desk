import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";

// Lee la sesión una sola vez por request (cache evita repetir la consulta)
export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

// Úsalo en layouts, páginas y Server Actions del panel
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  return session;
}