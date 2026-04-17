import type { Metadata } from "next";
import { EmpreendimentoLeadForm } from "@/components/forms/empreendimento-lead-form";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Apresentar Empreendimento",
  description: "Formulario para promotores e construtores apresentarem empreendimentos a distribuicao Homeflix.",
  path: "/empreendimento",
});

export default function EmpreendimentoPage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-20">
          <p className="eyebrow">Entrada de produto</p>
          <h1 className="display-lg max-w-4xl text-balance">Apresentar empreendimento para avaliacao comercial</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            Submeta os dados do projeto. A equipa Homeflix avalia enquadramento, estrutura operacao e responde com os proximos
            passos.
          </p>
        </div>
      </section>

      <section className="section-wrap section-dark">
        <SectionTitle
          title="Formulario de apresentacao"
          description="Lead comercial criada e notificada automaticamente para a equipa interna."
        />
        <EmpreendimentoLeadForm variant="full" sourcePage="/empreendimento" />
      </section>
    </>
  );
}
