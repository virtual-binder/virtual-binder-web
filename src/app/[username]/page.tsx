import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CollectionShowcase } from "@/components/collection-showcase";
import { getPublicProfile } from "@/lib/collection";

type PageProps = {
  params: Promise<{ username: string }>;
};

export function generateStaticParams() {
  return [{ username: "erwin" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = getPublicProfile(username);

  if (!profile) {
    return { title: "Colección no encontrada · Virtual Binder" };
  }

  return {
    title: `Colección de ${profile.displayName} · Virtual Binder`,
    description: `${profile.cards.length} cartas de la colección pública de ${profile.displayName}.`,
  };
}

export default async function PublicCollectionPage({ params }: PageProps) {
  const { username } = await params;
  const profile = getPublicProfile(username);

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b1220] text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <nav className="mb-12 flex items-center justify-between" aria-label="Navegación principal">
          <Link href="/" className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[#ffcb05]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffcb05]" />
            VIRTUAL BINDER
          </Link>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
            Colección pública
          </span>
        </nav>

        <section className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#ffcb05] text-3xl font-black text-[#10213d]">
              {profile.displayName.charAt(0)}
            </div>
            <div>
              <p className="mb-1 text-sm text-slate-400">@{profile.username}</p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Colección de {profile.displayName}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                {profile.bio}
              </p>
              <p className="mt-3 text-xs text-slate-500">
                {profile.location} · Miembro desde {profile.memberSince}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#111d31] px-5 py-4">
            <p className="text-2xl font-bold">{profile.cards.length}</p>
            <p className="text-xs text-slate-400">cartas disponibles</p>
          </div>
        </section>

        <CollectionShowcase profile={profile} />

        <footer className="mt-14 border-t border-slate-800 pt-6 text-xs leading-5 text-slate-500">
          Vista demostrativa. El contacto abre tu aplicación de correo; Virtual Binder
          no procesa pagos ni confirma la disponibilidad de las cartas.
        </footer>
      </div>
    </main>
  );
}
