import Link from "next/link";

import { ApiStatus } from "@/components/api-status";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1220] px-6 py-8 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[#ffcb05]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffcb05]" />
          VIRTUAL BINDER
        </header>

        <section className="grid items-center gap-10 py-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium text-slate-400">Tu colección, en un solo lugar</p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-6xl">
              Escanea. Organiza. Comparte.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-400">
              Estamos construyendo una nueva forma de administrar cartas
              coleccionables y descubrir su valor de mercado.
            </p>
            <Link
              href="/erwin"
              className="w-fit rounded-xl bg-[#ffcb05] px-5 py-3 text-sm font-bold text-[#10213d] transition hover:bg-yellow-300"
            >
              Ver colección de ejemplo
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-[#111d31] p-6 shadow-2xl">
            <p className="mb-5 text-sm font-semibold text-slate-300">Estado del servicio</p>
            <ApiStatus />
            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <p>Escáner conectado a la API de producción</p>
              <p>Catálogo público respaldado por Supabase</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
