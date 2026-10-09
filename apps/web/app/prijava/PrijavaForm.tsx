"use client";

import { useMemo, useState, useTransition } from "react";
import {
  izracunajBodove,
  kategorija,
  KATEGORIJE_INFO,
  type PrijavaUlaz,
} from "@/lib/scoring";
import { posaljiPrijavu, type PrijavaRezultat } from "./actions";

const PRAZAN_ULAZ: PrijavaUlaz = {
  godineTradicije: 0,
  porodicnaTradicija: false,
  velicina: "",
  medjZlato: 0,
  medjSrebro: 0,
  medjBronza: 0,
  domZlato: 0,
  domSrebro: 0,
  domBronza: 0,
  izvozPreko50: false,
  horeca: false,
  retail: false,
  brojZaposlenih: 0,
  profMenadzment: false,
  tehnolog: false,
  standardi: false,
  porodicnaPrica: false,
  lokalnaSorta: false,
  tradicionalnaProizvodnja: false,
  posebnost: false,
};

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-mastilo/20 bg-lan-svetli px-4 py-3 text-sm hover:border-plava">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-crvena"
      />
      <span className="text-mastilo-meko">{label}</span>
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="text-mastilo-meko">{label}</span>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
        className="mt-1 w-full rounded-lg border border-mastilo/20 px-3 py-2 outline-none focus:border-plava"
      />
    </label>
  );
}

const KAT_BOJA: Record<string, string> = {
  veliki_majstori: "bg-crvena",
  cuvari_kvaliteta: "bg-crvena",
  mladi_majstori: "bg-plava",
};

export function PrijavaForm() {
  const [naziv, setNaziv] = useState("");
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [grad, setGrad] = useState("");
  const [u, setU] = useState<PrijavaUlaz>(PRAZAN_ULAZ);
  const [rezultat, setRezultat] = useState<PrijavaRezultat | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof PrijavaUlaz>(k: K, v: PrijavaUlaz[K]) =>
    setU((prev) => ({ ...prev, [k]: v }));

  const bodovi = useMemo(() => izracunajBodove(u), [u]);
  const kat = kategorija(bodovi.ukupno);
  const katInfo = KATEGORIJE_INFO[kat];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const r = await posaljiPrijavu({
        nazivDestilerije: naziv,
        kontaktIme: ime,
        email,
        telefon,
        grad,
        ulaz: u,
      });
      setRezultat(r);
      if (r.ok) window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-10">
        {rezultat && (
          <div
            className={`rounded-xl px-5 py-4 text-sm ${
              rezultat.ok
                ? "border border-green-200 bg-green-50 text-green-800"
                : "border border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <p>{rezultat.poruka}</p>
            {rezultat.ok && rezultat.bodovi != null && rezultat.kategorija && (
              <a
                href={`/api/sertifikat?naziv=${encodeURIComponent(naziv)}&bodovi=${rezultat.bodovi}&kategorija=${rezultat.kategorija}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-full bg-crvena px-5 py-2 font-semibold text-white hover:bg-[#a12932]"
              >
                Preuzmi sertifikat →
              </a>
            )}
          </div>
        )}

        {/* Kontakt */}
        <fieldset className="space-y-4">
          <legend className="font-serif text-xl font-bold text-mastilo">
            Podaci o destileriji
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-mastilo-meko">Naziv destilerije *</span>
              <input
                value={naziv}
                onChange={(e) => setNaziv(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-mastilo/20 px-3 py-2 outline-none focus:border-plava"
              />
            </label>
            <label className="block text-sm">
              <span className="text-mastilo-meko">Kontakt osoba *</span>
              <input
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-mastilo/20 px-3 py-2 outline-none focus:border-plava"
              />
            </label>
            <label className="block text-sm">
              <span className="text-mastilo-meko">Email *</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-mastilo/20 px-3 py-2 outline-none focus:border-plava"
              />
            </label>
            <label className="block text-sm">
              <span className="text-mastilo-meko">Telefon</span>
              <input
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                className="mt-1 w-full rounded-lg border border-mastilo/20 px-3 py-2 outline-none focus:border-plava"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="text-mastilo-meko">Grad / mesto</span>
              <input
                value={grad}
                onChange={(e) => setGrad(e.target.value)}
                className="mt-1 w-full rounded-lg border border-mastilo/20 px-3 py-2 outline-none focus:border-plava"
              />
            </label>
          </div>
        </fieldset>

        {/* 1. Tradicija */}
        <fieldset className="space-y-4">
          <legend className="font-serif text-xl font-bold text-mastilo">
            1. Tradicija <span className="text-sm font-normal text-mastilo-meko">(max 20)</span>
          </legend>
          <NumberField
            label="Godina tradicije / postojanja"
            value={u.godineTradicije}
            onChange={(v) => set("godineTradicije", v)}
          />
          <Checkbox
            label="Porodična tradicija (bonus +5)"
            checked={u.porodicnaTradicija}
            onChange={(v) => set("porodicnaTradicija", v)}
          />
        </fieldset>

        {/* 2. Proizvodnja */}
        <fieldset className="space-y-3">
          <legend className="font-serif text-xl font-bold text-mastilo">
            2. Proizvodnja <span className="text-sm font-normal text-mastilo-meko">(max 15)</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                ["mala", "Mala (do 5.000 l)"],
                ["srednja", "Srednja (5.000–50.000 l)"],
                ["velika", "Velika (50.000+ l)"],
              ] as const
            ).map(([val, lab]) => (
              <label
                key={val}
                className={`cursor-pointer rounded-lg border px-4 py-3 text-sm ${
                  u.velicina === val
                    ? "border-crvena bg-lan-svetli font-semibold text-crvena"
                    : "border-mastilo/20 bg-lan-svetli text-mastilo-meko"
                }`}
              >
                <input
                  type="radio"
                  name="velicina"
                  className="sr-only"
                  checked={u.velicina === val}
                  onChange={() => set("velicina", val)}
                />
                {lab}
              </label>
            ))}
          </div>
        </fieldset>

        {/* 3. Nagrade */}
        <fieldset className="space-y-4">
          <legend className="font-serif text-xl font-bold text-mastilo">
            3. Nagrade <span className="text-sm font-normal text-mastilo-meko">(max 25)</span>
          </legend>
          <p className="text-sm text-mastilo-meko">
            Međunarodne: zlato 3 / srebro 2 / bronza 1. Domaće: zlato 1.5 / srebro 1 / bronza 0.5.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <NumberField label="Međ. zlato" value={u.medjZlato} onChange={(v) => set("medjZlato", v)} />
            <NumberField label="Međ. srebro" value={u.medjSrebro} onChange={(v) => set("medjSrebro", v)} />
            <NumberField label="Međ. bronza" value={u.medjBronza} onChange={(v) => set("medjBronza", v)} />
            <NumberField label="Dom. zlato" value={u.domZlato} onChange={(v) => set("domZlato", v)} />
            <NumberField label="Dom. srebro" value={u.domSrebro} onChange={(v) => set("domSrebro", v)} />
            <NumberField label="Dom. bronza" value={u.domBronza} onChange={(v) => set("domBronza", v)} />
          </div>
        </fieldset>

        {/* 4. Brend i tržište */}
        <fieldset className="space-y-3">
          <legend className="font-serif text-xl font-bold text-mastilo">
            4. Brend i tržište <span className="text-sm font-normal text-mastilo-meko">(max 15)</span>
          </legend>
          <Checkbox label="Izvoz preko 50% proizvodnje (+5)" checked={u.izvozPreko50} onChange={(v) => set("izvozPreko50", v)} />
          <Checkbox label="Prisustvo u HoReCa kanalu (+5)" checked={u.horeca} onChange={(v) => set("horeca", v)} />
          <Checkbox label="Retail distribucija (+5)" checked={u.retail} onChange={(v) => set("retail", v)} />
        </fieldset>

        {/* 5. Organizacija */}
        <fieldset className="space-y-4">
          <legend className="font-serif text-xl font-bold text-mastilo">
            5. Organizacija <span className="text-sm font-normal text-mastilo-meko">(max 10)</span>
          </legend>
          <NumberField label="Broj zaposlenih" value={u.brojZaposlenih} onChange={(v) => set("brojZaposlenih", v)} />
          <Checkbox label="Profesionalni menadžment" checked={u.profMenadzment} onChange={(v) => set("profMenadzment", v)} />
          <Checkbox label="Tehnolog zaposlen u firmi" checked={u.tehnolog} onChange={(v) => set("tehnolog", v)} />
          <Checkbox label="Standardi proizvodnje (ISO i dr.)" checked={u.standardi} onChange={(v) => set("standardi", v)} />
        </fieldset>

        {/* 6. Vrednost / priča */}
        <fieldset className="space-y-3">
          <legend className="font-serif text-xl font-bold text-mastilo">
            6. Vrednost brenda / autentičnost / priča{" "}
            <span className="text-sm font-normal text-mastilo-meko">(max 15)</span>
          </legend>
          <p className="text-sm text-mastilo-meko">
            Samoprocena — konačnu ocenu potvrđuje komisija.
          </p>
          <Checkbox label="Porodična priča" checked={u.porodicnaPrica} onChange={(v) => set("porodicnaPrica", v)} />
          <Checkbox label="Lokalna sorta" checked={u.lokalnaSorta} onChange={(v) => set("lokalnaSorta", v)} />
          <Checkbox label="Tradicionalna proizvodnja" checked={u.tradicionalnaProizvodnja} onChange={(v) => set("tradicionalnaProizvodnja", v)} />
          <Checkbox label="Posebnost / autentičnost" checked={u.posebnost} onChange={(v) => set("posebnost", v)} />
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-crvena px-6 py-3 font-semibold text-white transition hover:bg-[#a12932] disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Slanje..." : "Pošalji prijavu"}
        </button>
      </div>

      {/* Živi rezultat */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-md border border-mastilo/20 bg-lan-svetli p-6">
          <p className="text-sm font-medium uppercase tracking-wide text-mastilo-meko">
            Trenutni rezultat
          </p>
          <p className="mt-1 font-serif text-5xl font-bold text-mastilo">
            {bodovi.ukupno}
            <span className="text-2xl text-mastilo-meko">/100</span>
          </p>
          <div className={`mt-4 rounded-lg px-4 py-3 text-white ${KAT_BOJA[kat]}`}>
            <p className="text-xs uppercase tracking-wide opacity-80">Kategorija</p>
            <p className="font-semibold">{katInfo.naziv}</p>
            <p className="text-xs opacity-80">{katInfo.raspon}</p>
          </div>

          <dl className="mt-6 space-y-2 text-sm">
            {[
              ["Tradicija", bodovi.tradicija, 20],
              ["Proizvodnja", bodovi.proizvodnja, 15],
              ["Nagrade", bodovi.nagrade, 25],
              ["Brend i tržište", bodovi.brend, 15],
              ["Organizacija", bodovi.organizacija, 10],
              ["Vrednost / priča", bodovi.vrednost, 15],
            ].map(([lab, val, max]) => (
              <div key={lab as string}>
                <div className="flex justify-between text-mastilo-meko">
                  <span>{lab}</span>
                  <span className="font-medium text-mastilo">
                    {val} / {max}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-lan-svetli">
                  <div
                    className="h-full bg-crvena"
                    style={{ width: `${(Number(val) / Number(max)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-6 border-t border-mastilo/20 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-mastilo-meko">
              Benefiti kategorije
            </p>
            <ul className="mt-2 space-y-1 text-sm text-mastilo-meko">
              {katInfo.benefiti.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-crvena">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </form>
  );
}
