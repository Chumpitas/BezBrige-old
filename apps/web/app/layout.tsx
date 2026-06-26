import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
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
      "Tradicionalna porodična proizvodnja rakije u Srbiji i Bajinoj Bašti.",
    type: "website",
    locale: "sr_RS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
