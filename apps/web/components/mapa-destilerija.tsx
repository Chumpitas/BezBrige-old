"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Proizvodjac } from "@/lib/types";

export function MapaDestilerija({ proizvodjaci }: { proizvodjaci: Proizvodjac[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const saKoordinatama = proizvodjaci.filter(
    (p) => typeof p.lat === "number" && typeof p.lng === "number",
  );

  useEffect(() => {
    if (!ref.current || saKoordinatama.length === 0) return;
    let map: import("leaflet").Map | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      if (!ref.current) return;
      map = L.map(ref.current, { scrollWheelZoom: false });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);

      const tacke: [number, number][] = [];
      for (const p of saKoordinatama) {
        const lat = p.lat as number;
        const lng = p.lng as number;
        tacke.push([lat, lng]);
        const marker = L.circleMarker([lat, lng], {
          radius: 9,
          color: "#b45929",
          fillColor: "#c26f33",
          fillOpacity: 0.85,
          weight: 2,
        }).addTo(map!);
        const link = p.slug ? `/proizvodjaci/${p.slug}` : "#";
        marker.bindPopup(
          `<strong>${p.naziv}</strong><br/>${[p.selo, p.grad]
            .filter(Boolean)
            .join(", ")}<br/><a href="${link}">Pogledaj profil →</a>`,
        );
      }

      if (tacke.length === 1) {
        map.setView(tacke[0], 11);
      } else {
        map.fitBounds(tacke, { padding: [40, 40] });
      }
    })();

    return () => {
      if (map) map.remove();
    };
  }, [saKoordinatama]);

  if (saKoordinatama.length === 0) {
    return (
      <div className="flex h-[360px] items-center justify-center rounded-2xl border border-dashed border-sljiva-300 bg-white text-sm text-sljiva-500">
        Mapa će prikazati destilerije čim dodamo njihove koordinate.
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="h-[420px] w-full overflow-hidden rounded-2xl border border-sljiva-200 shadow-sm"
      style={{ zIndex: 0 }}
    />
  );
}
