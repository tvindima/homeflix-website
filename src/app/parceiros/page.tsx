import type { Metadata } from "next";
import Link from "next/link";
import { BenefitGrid } from "@/components/ui/benefit-grid";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Para Parceiros Imobiliarios",
  description: "Acesso profissional validado a empreendimentos estruturados para negocio real.",
  path: "/parceiros",
});

export default function ParceirosPage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-20">
          <p className="eyebrow">Para parceiros imobiliarios</p>
          <h1 className="display-lg max-w-4xl text-balance">Produto organizado, acesso validado e regras claras de partilha.</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            A Homeflix foi desenhada para profissionais ativos que valorizam rastreabilidade, credibilidade e oportunidades
            concretas de negocio.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <SectionTitle title="Quem pode candidatar-se" />
        <BenefitGrid
          items={[
            { title: "Consultores ativos", description: "Profissionais com atividade comprovada no mercado." },
            { title: "Mediadoras crediveis", description: "Enquadramento institucional e comercial validado." },
            { title: "Perfil orientado a processo", description: "Capacidade de operar com regras e qualidade de execucao." },
          ]}
        />
      </section>

      <section className="section-wrap section-dark">
        <SectionTitle title="O que a plataforma oferece" />
        <BenefitGrid
          items={[
            { title: "Empreendimentos organizados", description: "Informacao limpa e objetiva para acelerar apresentacao." },
            { title: "Detalhe por fracao", description: "Leitura comercial pronta para decisao com comprador." },
            { title: "Documentacao centralizada", description: "Menos ruido e menos falhas de comunicacao." },
            { title: "Rastreabilidade", description: "Atribuicao e atividade registadas de forma auditavel." },
            { title: "Partilha estruturada", description: "Regra clara para colaboracao entre profissionais." },
            { title: "Oportunidades reais", description: "Foco em negocio qualificado, nao em volume vazio." },
          ]}
        />
      </section>

      <section className="section-wrap">
        <SectionTitle title="Processo de candidatura" />
        <ProcessTimeline
          steps={[
            "Submissao de dados profissionais.",
            "Validacao de enquadramento e atividade.",
            "Analise de elegibilidade comercial.",
            "Resposta de estado da candidatura.",
            "Ativacao de acesso em caso de aprovacao.",
          ]}
        />
      </section>

      <section className="section-wrap section-dark text-center">
        <SectionTitle
          align="center"
          title="Pedir acesso a plataforma"
          description="Candidatura simples, processo serio e acesso apenas apos validacao."
        />
        <Link href="/acesso" className="btn-primary inline-flex">
          Pedir acesso
        </Link>
      </section>
    </>
  );
}
