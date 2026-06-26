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
        // paleta inspirisana šljivom, hrastom i bakrenim kazanom
        sljiva: {
          50: "#f7f3f8",
          100: "#efe5f1",
          200: "#dcc6e0",
          300: "#c29ec9",
          400: "#a06fab",
          500: "#824f8d",
          600: "#6a3d73",
          700: "#56315d",
          800: "#48294e",
          900: "#3d2443",
          950: "#241027",
        },
        bakar: {
          50: "#fbf6f0",
          100: "#f5e7d6",
          200: "#e9cdac",
          300: "#dbac79",
          400: "#cd884c",
          500: "#c26f33",
          600: "#b45929",
          700: "#964324",
          800: "#7a3724",
          900: "#642f21",
          950: "#36160f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
