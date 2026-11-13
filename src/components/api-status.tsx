"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "online" | "offline";

export function ApiStatus() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const controller = new AbortController();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

    async function checkHealth() {
      try {
        const response = await fetch(`${apiUrl}/health`, {
          signal: controller.signal,
        });
        setStatus(response.ok ? "online" : "offline");
      } catch {
        if (!controller.signal.aborted) {
          setStatus("offline");
        }
      }
    }

    checkHealth();
    return () => controller.abort();
  }, []);

  const content = {
    checking: { color: "bg-amber-400", label: "Comprobando la API…" },
    online: { color: "bg-emerald-400", label: "API conectada" },
    offline: { color: "bg-rose-400", label: "API no disponible" },
  }[status];

  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-900/70 p-4" role="status">
      <span className={`h-2.5 w-2.5 rounded-full ${content.color}`} />
      <span className="text-sm font-medium">{content.label}</span>
    </div>
  );
}
