import NavigationGuest from "@/components/NavigationGuest";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationGuest showLogin={false} />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}