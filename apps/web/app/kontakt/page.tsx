import type { Metadata } from "next";
import { KontaktForm } from "./KontaktForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte tim projekta „Rakija – kulturno dobro Srbije”.",
};

export default function KontaktPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-serif text-4xl font-bold text-sljiva-900">Kontakt</h1>
      <p className="mt-3 max-w-2xl text-sljiva-600">
        Za partnerstva, medijske upite i pitanja proizvođača — pišite nam.
      </p>
      <div className="mt-10 max-w-xl">
        <KontaktForm />
      </div>
    </div>
  );
}
