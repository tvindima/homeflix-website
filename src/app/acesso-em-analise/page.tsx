import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Acesso em analise",
  description: "Estado de candidatura: em analise.",
  path: "/acesso-em-analise",
});

export default function AcessoEmAnalisePage() {
  return (
    <section className="section-wrap text-center">
      <h1 className="display-md">O seu pedido foi recebido e encontra-se em analise.</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
        A equipa Homeflix ira responder com a maior brevidade apos validacao dos dados submetidos.
      </p>
      <Link className="btn-primary mt-8 inline-flex" href="/contactos">
        Contactar equipa
      </Link>
    </section>
  );
}
