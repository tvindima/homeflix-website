import type { Metadata } from "next";
import Link from "next/link";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Como Funciona",
  description: "Mecanismo operacional da rede Homeflix: entrada de produto, validacao e partilha rastreavel.",
  path: "/como-funciona",
});

export default function ComoFuncionaPage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-20">
          <p className="eyebrow">Operacao Homeflix</p>
          <h1 className="display-lg max-w-4xl text-balance">Mecanismo de partilha imobiliaria com controlo e rastreabilidade.</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            A Homeflix estrutura produto, valida parceiros e organiza a distribuicao para que a partilha funcione em escala, sem
            improviso.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <SectionTitle title="Fluxo operacional" />
        <ProcessTimeline
          steps={[
            "Entrada de empreendimento com enquadramento comercial.",
            "Estruturacao de informacao por fracao e documentacao.",
            "Acesso restrito para parceiros validados.",
            "Nascimento de oportunidade com atribuicao rastreavel.",
            "Avanco de partilha com monitorizacao de atividade.",
            "Gestao de pipeline comercial em camada operacional.",
          ]}
        />
      </section>

      <section className="section-wrap section-dark">
        <SectionTitle title="Porque este modelo reduz friccao" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Menos informacao dispersa",
            "Menos dependencia de circuitos informais",
            "Mais velocidade de resposta",
            "Mais qualidade na apresentacao",
            "Mais protecao de oportunidade",
            "Mais previsibilidade comercial",
          ].map((item) => (
            <div key={item} className="chip-dark">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap text-center">
        <SectionTitle align="center" title="Quer entrar na rede Homeflix?" />
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/acesso" className="btn-secondary">
            Pedir acesso
          </Link>
          <Link href="/empreendimento" className="btn-primary">
            Apresentar empreendimento
          </Link>
        </div>
      </section>
    </>
  );
}
