import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Transliterator } from "@/components/transliterator";
import { getLang, getPismo } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rakija – kulturno dobro Srbije",
    template: "%s · Rakija – kulturno dobro Srbije",
  },
  description:
    "Nacionalni projekat i izložba o tradicionalnoj porodičnoj proizvodnji rakije u Srbiji i Bajinoj Bašti. Program, proizvođači, partneri i prijava za učešće.",
  keywords: [
    "rakija",
    "šljivovica",
    "Bajina Bašta",
    "Etnografski muzej",
    "destilerije",
    "tradicija",
    "Srbija",
  ],
  openGraph: {
    title: "Rakija – kulturno dobro Srbije",
    description:
      "Tradicionalna proizvodnja rakije kao deo kulturnog identiteta Srbije.",
    type: "website",
    locale: "sr_RS",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLang();
  const pismo = await getPismo();
  const htmlLang = lang === "en" ? "en" : pismo === "cir" ? "sr-Cyrl" : "sr-Latn";
  return (
    <html lang={htmlLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,500;0,700;0,800;1,500&family=Alegreya+Sans:wght@400;500;700&family=Alegreya+Sans+SC:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Transliterator active={lang === "sr" && pismo === "cir"} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
