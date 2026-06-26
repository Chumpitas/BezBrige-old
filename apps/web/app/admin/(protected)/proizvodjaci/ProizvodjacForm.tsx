"use client";

import Link from "next/link";
import { obrisiProizvodjaca, sacuvajProizvodjaca } from "./crud";
import { Uploader } from "@/components/uploader";
import type { Proizvodjac } from "@/lib/types";

const inputCls =
  "mt-1 w-full rounded-lg border border-sljiva-200 px-3 py-2 text-sm outline-none focus:border-bakar-500";

function Polje({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-sljiva-600">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={inputCls}
      />
    </label>
  );
}

export function ProizvodjacForm({ p }: { p?: Proizvodjac }) {
  return (
    <form action={sacuvajProizvodjaca} className="space-y-5">
      {p?.id && <input type="hidden" name="id" value={p.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Polje label="Naziv *" name="naziv" defaultValue={p?.naziv} />
        <Polje
          label="Slug (opciono)"
          name="slug"
          defaultValue={p?.slug}
          placeholder="generiše se iz naziva"
        />
        <Polje label="Porodica" name="porodica" defaultValue={p?.porodica} />
        <Polje label="Generacija" name="generacija" type="number" defaultValue={p?.generacija} />
        <Polje label="Godina osnivanja" name="godina_osnivanja" type="number" defaultValue={p?.godina_osnivanja} />
        <Polje label="Selo" name="selo" defaultValue={p?.selo} />
        <Polje label="Grad" name="grad" defaultValue={p?.grad} />
        <Polje label="Region" name="region" defaultValue={p?.region} />
        <label className="block text-sm">
          <span className="text-sljiva-600">Veličina</span>
          <select name="velicina" defaultValue={p?.velicina ?? ""} className={inputCls}>
            <option value="">—</option>
            <option value="mala">Mala</option>
            <option value="srednja">Srednja</option>
            <option value="velika">Velika</option>
          </select>
        </label>
        <Polje label="Sajt" name="sajt" defaultValue={p?.sajt} placeholder="https://" />
        <Polje label="Lat (geo. širina)" name="lat" defaultValue={p?.lat} />
        <Polje label="Lng (geo. dužina)" name="lng" defaultValue={p?.lng} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Uploader name="logo_url" folder="logo" label="Logo" defaultValue={p?.logo_url} />
        <Uploader name="foto_url" folder="proizvodjaci" label="Fotografija" defaultValue={p?.foto_url} />
      </div>

      <label className="block text-sm">
        <span className="text-sljiva-600">Priča / opis</span>
        <textarea name="prica" rows={5} defaultValue={p?.prica ?? ""} className={inputCls} />
      </label>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="objavljen" defaultChecked={p?.objavljen ?? false} className="h-4 w-4 accent-bakar-600" />
          <span className="text-sljiva-700">Objavljen</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="istaknut" defaultChecked={p?.istaknut ?? false} className="h-4 w-4 accent-bakar-600" />
          <span className="text-sljiva-700">Istaknut na naslovnoj</span>
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button className="rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white hover:bg-bakar-700">
          Sačuvaj
        </button>
        <Link
          href="/admin/proizvodjaci"
          className="text-sm font-medium text-sljiva-500 hover:text-sljiva-700"
        >
          Otkaži
        </Link>
        {p?.id && (
          <button
            formAction={obrisiProizvodjaca}
            className="ml-auto text-sm font-medium text-red-600 hover:underline"
          >
            Obriši
          </button>
        )}
      </div>
    </form>
  );
}
