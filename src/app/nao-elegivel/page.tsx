import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Candidatura nao elegivel",
  description: "Estado de candidatura: nao elegivel neste momento.",
  path: "/nao-elegivel",
});

export default function NaoElegivelPage() {
  return (
    <section className="section-wrap text-center">
      <h1 className="display-md">A candidatura nao reune, para ja, os requisitos de acesso definidos.</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
        Pode atualizar os dados profissionais e submeter nova candidatura num momento posterior.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link className="btn-secondary" href="/acesso">
          Nova candidatura
        </Link>
        <Link className="btn-primary" href="/contactos">
          Falar com a equipa
        </Link>
      </div>
    </section>
  );
}
