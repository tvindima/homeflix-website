import type { Metadata } from "next";
import { EmpreendimentoLeadForm } from "@/components/forms/empreendimento-lead-form";
import { BenefitGrid } from "@/components/ui/benefit-grid";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Para Promotores e Construtores",
  description: "Distribuicao nacional estruturada para empreendimentos com controlo operacional e rastreabilidade.",
  path: "/promotores",
});

export default function PromotoresPage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-20">
          <p className="eyebrow">Para promotores / construtores</p>
          <h1 className="display-lg max-w-4xl text-balance">Exclusividade com distribuicao profissional e escala comercial real.</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            A Homeflix organiza o seu empreendimento para distribuicao em rede validada, com controlo, rastreabilidade e
            capacidade de absorcao comercial nacional.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <SectionTitle
          title="Porque o modelo tradicional perde velocidade"
          description="Circuitos locais curtos e informacao dispersa reduzem tracao comercial e atrasam decisoes."
        />
        <BenefitGrid
          items={[
            { title: "Alcance limitado", description: "Produto preso a poucos canais e baixa capilaridade comercial." },
            { title: "Friccao operacional", description: "Dados dispersos e atualizacoes manuais criam atrasos." },
            { title: "Baixa rastreabilidade", description: "Dificuldade em auditar atividade e proteger oportunidades." },
          ]}
        />
      </section>

      <section className="section-wrap section-dark">
        <SectionTitle title="O que a Homeflix resolve" />
        <BenefitGrid
          items={[
            { title: "Distribuicao nacional estruturada", description: "Rede de parceiros validados com regras claras." },
            { title: "Organizacao por fracao", description: "Detalhe comercial e documental pronto para operacao." },
            { title: "Controlo de atividade", description: "Timeline e registo de interacoes por oportunidade." },
            { title: "Apresentacao premium", description: "Posicionamento de produto de alto valor sem ruido de portal." },
            { title: "Capacidade de escala", description: "Modelo preparado para crescimento multi-empreendimento." },
            { title: "Equipe orientada a resultados", description: "Fluxo comercial focado em negocio real." },
          ]}
        />
      </section>

      <section className="section-wrap">
        <SectionTitle title="Onboarding de empreendimento" description="Entrada operacional em cinco etapas." />
        <ProcessTimeline
          steps={[
            "Diagnostico comercial e enquadramento de exclusividade.",
            "Estruturacao de empreendimento e fracoes.",
            "Preparacao documental e regras de partilha.",
            "Ativacao da distribuicao em rede validada.",
            "Monitorizacao de performance e iteracao comercial.",
          ]}
        />
      </section>

      <section className="section-wrap section-dark">
        <SectionTitle title="Apresentar empreendimento" description="Submeta os dados e a equipa comercial entra em contacto." />
        <EmpreendimentoLeadForm variant="full" sourcePage="/promotores" />
      </section>
    </>
  );
}
