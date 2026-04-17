import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Empreendimento recebido",
  description: "Confirmacao de rececao da apresentacao de empreendimento.",
  path: "/obrigado-empreendimento",
});

export default function ObrigadoEmpreendimentoPage() {
  return (
    <section className="section-wrap text-center">
      <h1 className="display-md">Recebemos a sua apresentacao de empreendimento.</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
        A equipa comercial Homeflix ira analisar os dados e contactar com os proximos passos.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link className="btn-primary" href="/">
          Voltar a Home
        </Link>
      </div>
    </section>
  );
}
