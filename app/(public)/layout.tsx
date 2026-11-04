import NavigationGuest from "@/components/NavigationGuest";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationGuest />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}