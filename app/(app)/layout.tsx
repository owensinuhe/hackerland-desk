import { requireSession } from "@/lib/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession(); // sin sesión → /auth/login

  return <main className="flex flex-1 flex-col">{children}</main>;
}