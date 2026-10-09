import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // „Etno" paleta — boje srpske zastave + lan/mastilo
        "zastava-crvena": "#C6363C", // samo ornamenti
        crvena: "#B8303A", // UI crvena (CTA, labele, aktivni filter „Kraj")
        plava: "#0C4076", // header/footer/hero direktorijuma, tamna dugmad
        "plava-ivica": "#3B5680",
        bela: "#FFFFFF",
        lan: "#F1E6D2", // pozadina stranice
        "lan-svetli": "#FAF3E6", // sekcije/kartice/paneli
        "lan-tamni": "#E6D6BA", // placeholder slika, tekst footera
        krem: "#FFF7EA", // tekst na crvenoj / hero
        mastilo: "#2B1D14", // glavni tekst, ivice 2px
        "mastilo-meko": "#4A382B", // sekundarni tekst

        // zadržano radi kompatibilnosti sa postojećim (admin, mapa itd.)
        sljiva: {
          50: "#f7f3f8", 100: "#efe5f1", 200: "#dcc6e0", 300: "#c29ec9",
          400: "#a06fab", 500: "#824f8d", 600: "#6a3d73", 700: "#56315d",
          800: "#48294e", 900: "#3d2443", 950: "#241027",
        },
        bakar: {
          50: "#fbf6f0", 100: "#f5e7d6", 200: "#e9cdac", 300: "#dbac79",
          400: "#cd884c", 500: "#c26f33", 600: "#b45929", 700: "#964324",
          800: "#7a3724", 900: "#642f21", 950: "#36160f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sc: ["var(--font-sc)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
