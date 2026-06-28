"use client";

import { useState } from "react";

export function Uploader({
  name,
  folder,
  defaultValue,
  label,
  endpoint = "/api/admin/upload",
}: {
  name: string;
  folder: string;
  defaultValue?: string | null;
  label: string;
  endpoint?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setGreska(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch(endpoint, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška pri otpremanju.");
      setUrl(data.url);
    } catch (err) {
      setGreska(err instanceof Error ? err.message : "Greška.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="text-sm">
      <span className="text-sljiva-600">{label}</span>
      <div className="mt-1 flex flex-col gap-2">
        <input
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://… (ili otpremi fajl ispod)"
          className="w-full rounded-lg border border-sljiva-200 px-3 py-2 outline-none focus:border-bakar-500"
        />
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={onFile}
            disabled={busy}
            className="text-xs text-sljiva-600 file:mr-3 file:rounded-full file:border-0 file:bg-sljiva-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-sljiva-700 hover:file:bg-sljiva-200"
          />
          {busy && <span className="text-xs text-bakar-600">Otpremam…</span>}
        </div>
        {greska && <span className="text-xs text-red-600">{greska}</span>}
        {url && /\.(png|jpe?g|webp|gif|avif)$/i.test(url) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="mt-1 h-24 w-auto rounded-lg border border-sljiva-200 object-cover" />
        )}
      </div>
    </div>
  );
}
