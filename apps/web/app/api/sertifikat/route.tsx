import { ImageResponse } from "next/og";

export const runtime = "nodejs";

const KAT: Record<string, { naziv: string; boja: string }> = {
  veliki_majstori: { naziv: "Veliki majstor rakije", boja: "#c26f33" },
  cuvari_kvaliteta: { naziv: "Čuvar kvaliteta", boja: "#6a3d73" },
  mladi_majstori: { naziv: "Mladi majstor", boja: "#824f8d" },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const naziv = (searchParams.get("naziv") || "Destilerija").slice(0, 80);
  const bodovi = (searchParams.get("bodovi") || "0").slice(0, 6);
  const katKey = searchParams.get("kategorija") || "mladi_majstori";
  const kat = KAT[katKey] ?? KAT.mladi_majstori;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f7f3f8 0%, #efe5f1 100%)",
          padding: 60,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `4px solid ${kat.boja}`,
            borderRadius: 24,
            padding: 60,
            background: "white",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 8, textTransform: "uppercase", color: "#824f8d" }}>
            Rakija — kulturno dobro Srbije
          </div>
          <div style={{ fontSize: 30, color: "#56315d", marginTop: 40 }}>Sertifikat o kategoriji</div>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#3d2443", marginTop: 12, textAlign: "center" }}>
            {naziv}
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "white",
              background: kat.boja,
              padding: "12px 40px",
              borderRadius: 999,
              marginTop: 36,
            }}
          >
            {kat.naziv}
          </div>
          <div style={{ fontSize: 28, color: "#6a3d73", marginTop: 28 }}>
            Ukupno bodova: {bodovi} / 100
          </div>
          <div style={{ fontSize: 18, color: "#a06fab", marginTop: 40 }}>
            Preliminarna kategorizacija · konačnu potvrđuje komisija
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 850 },
  );
}
