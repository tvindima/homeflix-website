import type { Metadata } from "next";
import { AccessLeadForm } from "@/components/forms/access-lead-form";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Pedido de Acesso",
  description: "Formulario de candidatura para parceiros imobiliarios com validacao profissional.",
  path: "/acesso",
});

export default function AcessoPage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-20">
          <p className="eyebrow">Candidatura de parceiro</p>
          <h1 className="display-lg max-w-4xl text-balance">Pedido de acesso a plataforma Homeflix</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            O acesso e reservado a profissionais reais do setor imobiliario. A candidatura sera analisada antes de qualquer
            ativacao.
          </p>
        </div>
      </section>

      <section className="section-wrap section-dark">
        <SectionTitle
          title="Submeter candidatura"
          description="Preencha os campos obrigatorios. A sua lead sera criada com estado inicial Em analise."
        />
        <AccessLeadForm variant="full" sourcePage="/acesso" />
      </section>
    </>
  );
}
