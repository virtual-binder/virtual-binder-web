"use client";

import Image from "next/image";
import { useState } from "react";

import { ContactOwnerDialog } from "@/components/contact-owner-dialog";
import type { PublicCard, PublicProfile } from "@/lib/collection";

const zoomNames = ["Compacta", "Cómoda", "Una por fila"];
const gridClasses = [
  "grid-cols-2 gap-4 lg:grid-cols-4",
  "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
  "grid-cols-1 gap-8",
];

function formatClp(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CollectionShowcase({ profile }: { profile: PublicProfile }) {
  const [zoom, setZoom] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [contactCards, setContactCards] = useState<PublicCard[] | null>(null);
  const selectedCards = profile.cards.filter((card) => selectedIds.has(card.id));
  const selectedTotal = selectedCards.reduce((sum, card) => sum + card.priceClp, 0);

  function toggleCard(cardId: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  }

  return (
    <section aria-labelledby="available-cards-title">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest text-[#ffcb05]">CATÁLOGO</p>
          <h2 id="available-cards-title" className="mt-1 text-2xl font-bold">
            Cartas disponibles
          </h2>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-700 bg-[#111d31] p-2 sm:justify-start">
          <button
            type="button"
            aria-label="Reducir tamaño de las cartas"
            disabled={zoom === 0}
            onClick={() => setZoom((current) => Math.max(0, current - 1))}
            className="h-9 w-9 rounded-xl border border-slate-600 text-xl font-bold disabled:opacity-30 enabled:hover:bg-slate-700"
          >
            −
          </button>
          <span className="min-w-24 text-center text-xs font-medium text-slate-300" aria-live="polite">
            {zoomNames[zoom]}
          </span>
          <button
            type="button"
            aria-label="Aumentar tamaño de las cartas"
            disabled={zoom === 2}
            onClick={() => setZoom((current) => Math.min(2, current + 1))}
            className="h-9 w-9 rounded-xl border border-slate-600 text-xl font-bold disabled:opacity-30 enabled:hover:bg-slate-700"
          >
            +
          </button>
        </div>
      </div>

      <div className={`grid ${gridClasses[zoom]}`}>
        {profile.cards.map((card) => {
          const selected = selectedIds.has(card.id);

          return (
            <article
              key={card.id}
              className={`flex flex-col overflow-hidden rounded-3xl border bg-[#111d31] transition ${
                selected
                  ? "border-[#ffcb05] ring-2 ring-[#ffcb05]/30"
                  : "border-slate-800 hover:border-slate-600"
              } ${zoom === 2 ? "mx-auto w-full max-w-md" : ""}`}
            >
              <div className="relative m-3 aspect-[63/88] overflow-hidden rounded-2xl bg-slate-900 sm:m-4">
                <Image
                  src={card.imageUrl}
                  alt={`${card.name}, ${card.setName} ${card.collectorNumber}`}
                  fill
                  sizes={zoom === 2 ? "448px" : zoom === 1 ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col p-4 pt-1 sm:p-5 sm:pt-0">
                <p className="text-xs text-slate-500">{card.setName} · {card.collectorNumber}</p>
                <h3 className="mt-1 text-lg font-bold sm:text-xl">{card.name}</h3>
                <p className="mt-1 text-xs text-slate-400">{card.condition} · {card.finish}</p>
                <p className="mt-4 text-xl font-extrabold text-[#ffcb05]">{formatClp(card.priceClp)}</p>

                <div className="mt-5 grid gap-2">
                  <button
                    type="button"
                    onClick={() => setContactCards([card])}
                    className="rounded-xl bg-[#ffcb05] px-4 py-2.5 text-sm font-bold text-[#10213d] hover:bg-yellow-300"
                  >
                    Comprar ahora
                  </button>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleCard(card.id)}
                    className={`rounded-xl border px-4 py-2.5 text-sm font-semibold ${
                      selected
                        ? "border-[#ffcb05] bg-[#ffcb05]/10 text-[#ffcb05]"
                        : "border-slate-600 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {selected ? "Seleccionada" : "Seleccionar para lote"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selectedCards.length > 0 ? (
        <div className="fixed inset-x-4 bottom-4 z-20 mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl border border-slate-600 bg-[#18253b] p-4 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold">
              {selectedCards.length} {selectedCards.length === 1 ? "carta" : "cartas"} · {formatClp(selectedTotal)}
            </p>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="mt-1 text-xs text-slate-400 underline hover:text-slate-200"
            >
              Limpiar selección
            </button>
          </div>
          <button
            type="button"
            onClick={() => setContactCards(selectedCards)}
            className="rounded-xl bg-[#ffcb05] px-5 py-3 text-sm font-bold text-[#10213d] hover:bg-yellow-300"
          >
            Contactar para comprar lote
          </button>
        </div>
      ) : null}

      {contactCards ? (
        <ContactOwnerDialog
          profile={profile}
          cards={contactCards}
          onClose={() => setContactCards(null)}
        />
      ) : null}
    </section>
  );
}
