"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import type { PublicCard, PublicProfile } from "@/lib/collection";

type Props = {
  profile: PublicProfile;
  cards: PublicCard[];
  onClose: () => void;
};

function formatClp(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ContactOwnerDialog({ profile, cards, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [message, setMessage] = useState(
    `Hola ${profile.displayName}, me interesan estas cartas. ¿Siguen disponibles?`,
  );
  const total = cards.reduce((sum, card) => sum + card.priceClp, 0);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      dialog?.close();
    };
  }, []);

  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cardList = cards
      .map((card) => `- ${card.name} (${card.collectorNumber}): ${formatClp(card.priceClp)}`)
      .join("\n");
    const body = [
      message,
      "",
      cardList,
      "",
      `Total referencial: ${formatClp(total)}`,
      "",
      `Comprador: ${buyerName}`,
      `Correo de contacto: ${buyerEmail}`,
    ].join("\n");
    const subject = `Virtual Binder · interés en ${cards.length} ${cards.length === 1 ? "carta" : "cartas"}`;

    window.location.assign(`mailto:${profile.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-slate-700 bg-[#111d31] p-0 text-slate-100 shadow-2xl backdrop:bg-black/75"
    >
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#ffcb05]">CONTACTAR VENDEDOR</p>
            <h2 id="contact-title" className="mt-2 text-2xl font-bold">
              Mensaje para {profile.displayName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-xl text-slate-300 hover:bg-slate-800"
          >
            ×
          </button>
        </div>

        <div className="mb-6 rounded-2xl bg-slate-900/70 p-4 text-sm">
          <p className="font-semibold">
            {cards.length} {cards.length === 1 ? "carta seleccionada" : "cartas seleccionadas"}
          </p>
          <p className="mt-1 text-slate-400">Total referencial: {formatClp(total)}</p>
        </div>

        <form onSubmit={openEmail} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Tu nombre
              <input
                required
                value={buyerName}
                onChange={(event) => setBuyerName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 outline-none focus:border-[#ffcb05]"
              />
            </label>
            <label className="text-sm font-medium">
              Tu correo
              <input
                required
                type="email"
                value={buyerEmail}
                onChange={(event) => setBuyerEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 outline-none focus:border-[#ffcb05]"
              />
            </label>
          </div>

          <label className="block text-sm font-medium">
            Mensaje
            <textarea
              required
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-2 w-full resize-none rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 outline-none focus:border-[#ffcb05]"
            />
          </label>

          <p className="text-xs leading-5 text-slate-400">
            Se abrirá tu aplicación de correo con el mensaje preparado. Revisa y envía
            el correo para contactar al dueño; no se realizará ningún pago.
          </p>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#ffcb05] px-5 py-3 text-sm font-bold text-[#10213d] hover:bg-yellow-300"
          >
            Abrir correo para enviar
          </button>
        </form>
      </div>
    </dialog>
  );
}
