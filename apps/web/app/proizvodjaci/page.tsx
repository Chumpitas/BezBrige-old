import type { Metadata } from "next";
import { getProizvodjaci } from "@/lib/data";
import { Direktorijum } from "@/components/direktorijum";

export const metadata: Metadata = {
  title: "Proizvođači",
  description:
    "Direktorijum porodičnih destilerija uključenih u projekat „Rakija Srbije“ — pronađite domaćina po kraju i vrsti rakije.",
};

export const revalidate = 60;

export default async function ProizvodjaciPage() {
  const proizvodjaci = await getProizvodjaci();

  return (
    <>
      <section className="bg-plava text-lan">
        <div className="container-page flex flex-col items-center gap-3.5 py-16 text-center">
          <span className="font-sc font-bold tracking-[0.08em] text-bela">direktorijum</span>
          <h1 className="font-serif text-[clamp(44px,6vw,76px)] font-extrabold leading-none">
            Proizvođači rakije
          </h1>
          <p className="max-w-[52ch] text-[19px]">
            Porodične destilerije uključene u projekat — pronađite domaćina po kraju i vrsti rakije.
          </p>
        </div>
      </section>
      <div className="zupci-crvena" aria-hidden="true" />

      <Direktorijum proizvodjaci={proizvodjaci} />
    </>
  );
}
