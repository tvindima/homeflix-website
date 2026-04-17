import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Obrigado pelo pedido de acesso",
  description: "Confirmacao de rececao da candidatura de acesso Homeflix.",
  path: "/obrigado-acesso",
});

export default function ObrigadoAcessoPage() {
  return (
    <section className="section-wrap text-center">
      <h1 className="display-md">Recebemos o seu pedido de acesso.</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
        A candidatura sera analisada pela equipa Homeflix. O acesso so sera concedido apos validacao.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link className="btn-secondary" href="/acesso-em-analise">
          Ver estado
        </Link>
        <Link className="btn-primary" href="/">
          Voltar a Home
        </Link>
      </div>
    </section>
  );
}
