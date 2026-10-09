import type { Metadata } from "next";
import { KontaktForm } from "./KontaktForm";
import { EtnoHero } from "@/components/etno-hero";
import { SLIKE } from "@/lib/slike";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte tim projekta „Rakija – kulturno dobro Srbije”.",
};

export default function KontaktPage() {
  return (
    <>
      <EtnoHero
        slika={SLIKE.case}
        natpis="pišite nam"
        naslov="Kontakt"
        opis="Za partnerstva, medijske upite i pitanja proizvođača — pišite nam."
      />
      <div className="container-page py-16">
        <div className="max-w-xl">
          <KontaktForm />
        </div>
      </div>
    </>
  );
}
