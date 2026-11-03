export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">

        {/* Ícono de señal (telecom) */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-emerald-500"
        >
          <path d="M2 12a10 10 0 0 1 20 0" />
          <path d="M5.5 12a6.5 6.5 0 0 1 13 0" />
          <path d="M9 12a3 3 0 0 1 6 0" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>

        {/* Título */}
        <h1 className="text-2xl font-semibold tracking-tight">
          Hackerland<span className="text-emerald-500">-Desk</span>
        </h1>

        {/* Formulario */}
        <form className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

      </div>
    </main>
  );
}