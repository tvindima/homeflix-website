import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/site-metadata";
import { brand } from "@/content/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre a Homeflix",
  description: "Visao institucional da Homeflix, ligacao a CRMPLUS e enquadramento operacional da Imoveis+.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-20">
          <p className="eyebrow">Sobre a Homeflix</p>
          <h1 className="display-lg max-w-4xl text-balance">Partilha estruturada, controlo operacional e foco em negocio real.</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">{brand.institutionalLine}</p>
        </div>
      </section>

      <section className="section-wrap">
        <SectionTitle
          title="O que a Homeflix resolve"
          description="A Homeflix nao foi criada para ser mais um canal de anuncios. Foi criada para estruturar distribuicao de empreendimentos com exigencia profissional."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Conecta produto e rede comercial com metodo.",
            "Centraliza dados criticos para decisao.",
            "Reduz perda de oportunidade por friccao.",
            "Escala operacao sem degradar qualidade.",
          ].map((item) => (
            <div key={item} className="chip-soft">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap section-dark">
        <SectionTitle title="Compromissos da marca" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Rigor tecnico",
            "Controlo operacional",
            "Rastreabilidade",
            "Profissionalismo comercial",
          ].map((item) => (
            <div key={item} className="chip-dark">
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
