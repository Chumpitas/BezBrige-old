import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Rakija – kulturno dobro Srbije";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const dir = join(process.cwd(), "public", "fonts");
  const [regular, bold] = await Promise.all([
    readFile(join(dir, "DejaVuSans.ttf")),
    readFile(join(dir, "DejaVuSans-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #3d2443 0%, #48294e 45%, #642f21 100%)",
          color: "white",
          fontFamily: "DejaVu Sans",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e9cdac",
          }}
        >
          Etnografski muzej · Beograd
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
          Rakija
        </div>
        <div style={{ fontSize: 48, fontWeight: 600, color: "#dbac79", marginTop: 4 }}>
          kulturno dobro Srbije
        </div>
        <div style={{ fontSize: 30, marginTop: 32, color: "#dcc6e0", maxWidth: 900 }}>
          Tradicionalna porodična proizvodnja rakije u Srbiji i Bajinoj Bašti
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DejaVu Sans", data: regular, weight: 400, style: "normal" },
        { name: "DejaVu Sans", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
