"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Proizvodjac } from "@/lib/types";
import { fotoZaProizvodjaca, lokalnaFotoProizvodjaca } from "@/lib/slike";
import { Slika } from "@/components/slika";
import { MapaDestilerija } from "@/components/mapa-destilerija";
import { VRSTE_RAKIJE, vrsteProizvodjaca, vrsteLabel } from "@/lib/vrste";

function Cip({
  label,
  aktivan,
  onClick,
  tip,
}: {
  label: string;
  aktivan: boolean;
  onClick: () => void;
  tip: "kraj" | "rakija";
}) {
  if (aktivan) {
    const boja = tip === "kraj" ? "bg-crvena border-crvena text-krem" : "bg-plava border-plava text-lan";
    return (
      <button onClick={onClick} className={`rounded-full border-2 px-3.5 py-1.5 text-[15px] font-bold ${boja}`}>
        {label}
      </button>
    );
  }
  return (
    <button onClick={onClick} className="rounded-full border-2 border-mastilo px-3.5 py-1.5 text-[15px] hover:bg-lan-tamni/40">
      {label}
    </button>
  );
}

export function Direktorijum({ proizvodjaci }: { proizvodjaci: Proizvodjac[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("Sve");
  const [vrsta, setVrsta] = useState("Sve");

  const regioni = useMemo(
    () => ["Sve", ...[...new Set(proizvodjaci.map((p) => p.region).filter(Boolean))].sort()] as string[],
    [proizvodjaci],
  );

  const filtrirani = useMemo(() => {
    const tekst = q.trim().toLowerCase();
    return proizvodjaci.filter((p) => {
      if (region !== "Sve" && p.region !== region) return false;
      if (vrsta !== "Sve" && !vrsteProizvodjaca(p).includes(vrsta)) return false;
      if (tekst) {
        const hay = [p.naziv, p.porodica, p.selo, p.grad].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(tekst)) return false;
      }
      return true;
    });
  }, [proizvodjaci, q, region, vrsta]);

  const resetuj = () => {
    setQ("");
    setRegion("Sve");
    setVrsta("Sve");
  };

  return (
    <div className="container-page flex flex-col gap-7 py-10 pb-[88px]">
      {/* Filter panel */}
      <div className="flex flex-col gap-3.5 rounded-md border-2 border-mastilo bg-lan-svetli p-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pretražite po nazivu ili mestu…"
          className="rounded border-2 border-mastilo bg-white px-3.5 py-3 text-[17px] text-mastilo outline-none"
        />
        <div className="flex flex-wrap items-center gap-2">
          <b className="w-16 text-[15px]">Kraj</b>
          {regioni.map((r) => (
            <Cip key={r} label={r} tip="kraj" aktivan={region === r} onClick={() => setRegion(r)} />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <b className="w-16 text-[15px]">Rakija</b>
          {["Sve", ...VRSTE_RAKIJE].map((v) => (
            <Cip key={v} label={v} tip="rakija" aktivan={vrsta === v} onClick={() => setVrsta(v)} />
          ))}
        </div>
      </div>

      {/* Mapa */}
      <div className="overflow-hidden rounded-md border-2 border-mastilo">
        <MapaDestilerija proizvodjaci={filtrirani} />
      </div>

      {/* Brojač */}
      <p className="font-bold">Pronađeno: {filtrirani.length}</p>

      {/* Grid kartica */}
      {filtrirani.length === 0 ? (
        <div className="rounded-md border-2 border-dashed border-crvena p-8 text-center">
          <p className="font-serif text-[24px] font-bold">Nema domaćina za izabrane filtere.</p>
          <button onClick={resetuj} className="mt-3 font-bold text-crvena hover:text-mastilo hover:underline">
            Poništi filtere
          </button>
        </div>
      ) : (
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
          {filtrirani.map((p) => (
            <Link
              key={p.id}
              href={p.slug ? `/proizvodjaci/${p.slug}` : "/proizvodjaci"}
              className="group flex flex-col overflow-hidden rounded-md border-2 border-mastilo bg-lan-svetli transition hover:-translate-y-0.5"
            >
              <div className="aspect-[4/3] border-b-2 border-mastilo bg-lan-tamni">
                <Slika
                  src={p.foto_url ?? lokalnaFotoProizvodjaca(p.slug) ?? fotoZaProizvodjaca(p.slug ?? p.naziv, p.foto_url)}
                  fallback={fotoZaProizvodjaca(p.slug ?? p.naziv, p.foto_url)}
                  alt={p.naziv}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-[18px]">
                <span className="font-sc text-[14px] font-bold text-plava">
                  {[p.region, p.selo || p.grad].filter(Boolean).join(" · ")}
                </span>
                <span className="font-serif text-[24px] font-extrabold leading-[1.1]">{p.naziv}</span>
                {p.prica && <p className="line-clamp-3 flex-1 text-[15px] text-mastilo-meko">{p.prica}</p>}
                <div className="mt-2 flex items-center justify-between border-t border-dashed border-crvena pt-2.5 text-[14px]">
                  <span className="font-bold text-crvena">{vrsteLabel(p)}</span>
                  {p.godina_osnivanja && <span className="text-mastilo-meko">od {p.godina_osnivanja}.</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
