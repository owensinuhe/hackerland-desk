import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function NavigationGuest({ showLogin = true }: { showLogin?: boolean }) {
  return (
    <header className="border-b border-nav-border bg-nav">
      <nav className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Logo size={28} />
          <span>Hackerland<span className="text-[#11B6F0]">-Desk</span></span>    
        </Link>

        <div className="flex items-center gap-2">
          {showLogin && (
            <Link
              href="/auth/login"
              className="rounded-md bg-[#005595] px-4 py-2 text-sm font-medium text-white hover:bg-[#004477]"
            >
              Iniciar sesión
            </Link>
          )}
          <ThemeToggle />          
        </div>
      </nav>
    </header>
  );
}