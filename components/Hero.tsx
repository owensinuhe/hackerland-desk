import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Hackerland, servicios de telecomunicaciones"
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="object-cover"
      />

      {/* Capa oscura para que el texto se lea sobre la foto */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 px-6 text-center text-white">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Hackerland<span className="text-[#11B6F0]">-Desk</span>
        </h1>
        <p className="mt-4 text-lg text-white/80">
          Panel de administración de Hackerland
        </p>
      </div>
    </section>
  );
}