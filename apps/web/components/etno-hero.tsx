import { Slika } from "@/components/slika";

/**
 * Jedinstveni etno hero za stranice: pozadinska slika + plavi preliv,
 * romb-natpis, naslov i podnaslov, sa „zupci" trakom ispod.
 */
export function EtnoHero({
  slika,
  natpis,
  naslov,
  opis,
}: {
  slika: string;
  natpis?: string;
  naslov: string;
  opis?: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-plava text-krem">
        <Slika
          src={slika}
          fallback={slika}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-plava/90 via-plava/85 to-plava/75"
          aria-hidden="true"
        />
        <div className="container-page relative z-10 flex flex-col gap-4 py-16 sm:py-20">
          {natpis && (
            <div className="flex items-center gap-3 font-sc text-sm font-bold tracking-[0.08em] text-bela">
              <span className="romb-marker" aria-hidden="true" />
              {natpis}
            </div>
          )}
          <h1 className="max-w-3xl font-serif text-[clamp(34px,6vw,56px)] font-extrabold leading-[1.02]">
            {naslov}
          </h1>
          {opis && <p className="max-w-2xl text-lg text-lan">{opis}</p>}
        </div>
      </section>
      <div className="zupci-crvena" aria-hidden="true" />
    </>
  );
}
